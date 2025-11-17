import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { api } from "../services/api";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "../services/firebase";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // Controle da notificação animada
  const notificationOpacity = useRef(new Animated.Value(0)).current;

  const showNotification = () => {
    Animated.sequence([
      Animated.timing(notificationOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(notificationOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => navigation.navigate("Login"));
  };

  const handleRegister = async () => {
    if (!email || !password || !name) {
      alert("Preencha todos os campos!");
      return;
    }
    if (password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/register", {
        email,
        password,
        displayName: name,
      });

      const { customToken } = res.data;
      if (!customToken) throw new Error("Token inválido do servidor.");

      await signInWithCustomToken(auth, customToken);

      // Mostra o balão de sucesso
      showNotification();
    } catch (err: any) {
      console.error(err);
      alert("Erro ao cadastrar: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Notificação animada */}
      <Animated.View style={[styles.notification, { opacity: notificationOpacity }]}>
        <Text style={styles.notificationText}>🎉 Cadastro feito com sucesso!</Text>
      </Animated.View>

      {/* Imagem ilustrativa */}
      <View style={styles.imageContainer}>
        <Image source={require("../assets/your-icon.png")} style={styles.image} resizeMode="contain" /> 
      </View>

      <Text style={styles.title}>Registro</Text>
      <Text style={styles.subtitle}>
        Por favor, preencha seus dados para criar sua conta.
      </Text>

      <Text style={styles.label}>Name*</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira seu nome"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Email*</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira seu email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Senha*</Text>
      <TextInput
        style={styles.input}
        placeholder="Crie uma senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.passwordHint}>Deve ter ao menos 6 caracteres.</Text>

      {/* Botão principal */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.primaryButtonText}>Criar conta</Text>
        )}
      </TouchableOpacity>

      {/* Botão Google (não funcional ainda, apenas visual) */}
      <TouchableOpacity style={styles.googleButton}>
        <Image
          source={require("../assets/google-icon.png")}
          style={styles.googleIcon}
        />
        <Text style={styles.googleText}>Registre com Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginLink}>
          Já possui uma conta? <Text style={styles.loginLinkBold}>Entrar</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fbff",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  notification: {
    position: "absolute",
    top: 40,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#4b2bd6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 99,
  },
  notificationText: {
    color: "#000",
    fontWeight: "600",
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: 90,
    height: 90,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2b2b6a",
    marginBottom: 6,
    textAlign: "left",
  },
  subtitle: {
    color: "#666",
    marginBottom: 18,
  },
  label: {
    marginTop: 8,
    color: "#444",
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#e6e6ee",
  },
  passwordHint: {
    color: "#666",
    marginTop: 6,
    fontSize: 13,
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: "#4b2bd6",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e6e6ee",
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 10,
    backgroundColor: "#fff",
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    fontWeight: "600",
    color: "#333",
  },
  loginLink: {
    textAlign: "center",
    color: "#666",
    marginTop: 16,
  },
  loginLinkBold: {
    color: "#4b2bd6",
    fontWeight: "700",
  },
});
