import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Form");
    } catch (error) {
      alert("Erro ao fazer login. Verifique as credenciais.");
    }
  };

  return (
    <View className="flex-1 bg-blue-900 items-center justify-center px-6">
      <Text className="text-white text-3xl font-bold mb-10">Bem-Estar em Foco</Text>

      <TextInput
        className="w-full bg-white rounded-lg p-3 mb-4"
        placeholder="E-mail"
        onChangeText={setEmail}
      />
      <TextInput
        className="w-full bg-white rounded-lg p-3 mb-6"
        placeholder="Senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity
        onPress={handleLogin}
        className="w-full bg-green-500 py-3 rounded-lg"
      >
        <Text className="text-center text-white font-semibold">Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text className="text-gray-200 mt-4">Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}
