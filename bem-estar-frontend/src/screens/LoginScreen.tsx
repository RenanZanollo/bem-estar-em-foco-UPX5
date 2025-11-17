// frontend/src/screens/LoginScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Home");
    } catch (err: any) {
      console.error(err);
      alert("Erro ao fazer login: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ===== LOGO ===== */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/your-icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Entrar</Text>
      <Text style={styles.subtitle}>
        Bem vindo de volta! Por favor, insira suas credenciais.
      </Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="exemplo@seuemail.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="••••••••"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.row}>
        <TouchableOpacity>
          <Text style={styles.remember}>Lembrar-me</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgot}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>

      {/* ===== BOTÃO GRADIENTE ===== */}
      <TouchableOpacity onPress={handleLogin} disabled={loading}>
        <LinearGradient
          colors={["#5b2ab8", "#7b3fe4"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>
            {loading ? "Entrando..." : "Entrar"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* ===== BOTÃO GOOGLE (igual ao da tela de registro) ===== */}
      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => alert("Login com Google: implementar depois")}
      >
        <Image
          source={require("../assets/google-icon.png")}
          style={styles.googleIcon}
        />
        <Text style={styles.googleText}>Entre com Google</Text>
      </TouchableOpacity>

      {/* ===== REGISTRE-SE ===== */}
      <TouchableOpacity
        style={{ marginTop: 12 }}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.registerText}>
          Não possui cadastro?{" "}
          <Text style={styles.registerLink}>Registre</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 90,
    height: 90,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1b1b4d",
    marginBottom: 6,
    textAlign: "left",
  },
  subtitle: {
    color: "#555",
    marginBottom: 22,
    fontSize: 15,
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
    borderColor: "#e2e2ee",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  remember: {
    color: "#444",
    fontSize: 14,
  },
  forgot: {
    color: "#5b2ab8",
    fontWeight: "600",
    fontSize: 14,
  },
  primaryButton: {
    marginTop: 18,
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
  registerText: {
    color: "#333",
    textAlign: "center",
    marginTop: 12,
  },
  registerLink: {
    color: "#5b2ab8",
    fontWeight: "700",
  },
});
