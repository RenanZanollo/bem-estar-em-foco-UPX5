import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

export default function ResultScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { result } = route.params;

  return (
    <ScrollView className="flex-1 bg-blue-900 p-6">
      <Text className="text-white text-2xl font-bold mb-4">
        Recomendações Personalizadas
      </Text>

      <View className="bg-white rounded-lg p-4 mb-6">
        <Text className="text-gray-800">{result}</Text>
      </View>

      <TouchableOpacity
        className="bg-green-500 py-3 rounded-lg"
        onPress={() => navigation.navigate("Form")}
      >
        <Text className="text-center text-white font-semibold">
          Fazer Nova Avaliação
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
