// frontend/src/screens/ResultScreen.tsx
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { LinearGradient } from "expo-linear-gradient";

export default function ResultScreen() {
  const route = useRoute<any>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const resultText: string =
    route.params?.result || "Nenhuma recomendação disponível.";

  // efeito de digitação
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const speed = 18; // velocidade da digitação
    const interval = setInterval(() => {
      i++;
      setDisplayed(resultText.slice(0, i));
      if (i >= resultText.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [resultText]);

  // animação de aparição
  const appear = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(appear, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.container}>
      <LinearGradient
        colors={["#ede9ff", "#f6f4ff", "#ffffff"]}
        style={styles.background}
      />

      <Animated.View
        style={[
          styles.header,
          { opacity: appear, transform: [{ translateY: appear.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 0],
          }) }] },
        ]}
      >
        <Text style={styles.title}>Recomendações Personalizadas</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.card,
          {
            opacity: appear,
            transform: [
              {
                scale: appear.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.95, 1],
                }),
              },
            ],
          },
        ]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
        >
          <Text style={styles.resultText}>{displayed}</Text>
        </ScrollView>
      </Animated.View>

      <TouchableOpacity
        style={styles.action}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.actionText}>Voltar ao Início</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.action, styles.secondaryAction]}
        onPress={() => navigation.navigate("FormsFisico")}
      >
        <Text style={[styles.actionText, { color: "#4b2bd6" }]}>
          Fazer nova avaliação
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#f9fbff" },
  container: {
    flexGrow: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
  },
  header: {
    marginBottom: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2b2b6a",
    textAlign: "center",
  },
  card: {
    width: "100%",
    minHeight: 280, // 🔹 garante que o card fique grande e visível
    backgroundColor: "#4b2bd6",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 30,
  },
  resultText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
  },
  action: {
    width: "100%",
    backgroundColor: "#4b2bd6",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  secondaryAction: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#4b2bd6",
    marginTop: 14,
  },
});
