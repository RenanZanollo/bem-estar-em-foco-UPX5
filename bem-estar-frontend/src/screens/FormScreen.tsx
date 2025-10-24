import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { api } from "../services/api";

export default function FormScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [answers, setAnswers] = useState({
    sono: "",
    alimentacao: "",
    humor: "",
    atividade: "",
  });

  const handleChange = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value });
  };

  const handleSend = async () => {
    const response = await api.post("/recommendations", { answers });
    navigation.navigate("Result", { result: response.data.recommendations });
  };

  return (
    <ScrollView className="flex-1 bg-blue-900 p-6">
      <Text className="text-white text-2xl font-bold mb-6">Autoavaliação de Bem-Estar</Text>

      <TextInput
        className="bg-white rounded-lg p-3 mb-4"
        placeholder="Como está seu sono?"
        onChangeText={(v) => handleChange("sono", v)}
      />
      <TextInput
        className="bg-white rounded-lg p-3 mb-4"
        placeholder="Como estão seus hábitos alimentares?"
        onChangeText={(v) => handleChange("alimentacao", v)}
      />
      <TextInput
        className="bg-white rounded-lg p-3 mb-4"
        placeholder="Como tem se sentido emocionalmente?"
        onChangeText={(v) => handleChange("humor", v)}
      />
      <TextInput
        className="bg-white rounded-lg p-3 mb-4"
        placeholder="Com que frequência pratica atividades físicas?"
        onChangeText={(v) => handleChange("atividade", v)}
      />

      <TouchableOpacity
        onPress={handleSend}
        className="bg-green-500 py-3 rounded-lg mt-4"
      >
        <Text className="text-center text-white font-semibold">Gerar Recomendações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
