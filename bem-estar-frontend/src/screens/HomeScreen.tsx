import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = ({ navigation }) => {
  // Função para formatar a data em português
  const getFormattedDate = () => {
    const date = new Date();
    const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("pt-BR", options)
      .format(date)
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Cabeçalho com data e logo */}
        <View style={styles.header}>
          <View>
            <Text style={styles.weekday}>
              {new Intl.DateTimeFormat("pt-BR", { weekday: "long" })
                .format(new Date())
                .replace(/^\w/, (c) => c.toUpperCase())}
            </Text>
            <Text style={styles.date}>{getFormattedDate().replace(/^[^,]*,\s*/, "")}</Text>
          </View>

          <Image style={styles.image}
            source={require("../assets/your-icon.png")}
            resizeMode="contain"
          />
        </View>

        {/* Texto principal */}
        <Text style={styles.title}>Qual o seu bem-estar em foco hoje?</Text>

        {/* Botões com gradiente */}
        <View style={styles.buttonsContainer}>
          <LinearGradient colors={["#6a11cb", "#b620e0"]} style={styles.gradientButton}>
            <TouchableOpacity onPress={() => navigation.navigate("FormsFisico")} style={styles.button}>
              <Text style={styles.buttonText}>Saúde física</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient colors={["#6a11cb", "#b620e0"]} style={styles.gradientButton}>
            <TouchableOpacity onPress={() => navigation.navigate("FormsMental")} style={styles.button}>
              <Text style={styles.buttonText}>Saúde mental</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient colors={["#6a11cb", "#b620e0"]} style={styles.gradientButton}>
            <TouchableOpacity onPress={() => navigation.navigate("FormsSocial")} style={styles.button}>
              <Text style={styles.buttonText}>Saúde social</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Elementos decorativos no fundo (opcional, para parecer com mockup) */}
        <View style={styles.circleTop} />
        <View style={styles.circleBottom} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F9FF",
    paddingHorizontal: 25,
    paddingTop: 90, // Desce os componentes
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  weekday: {
    fontSize: 16,
    color: "#2C2C2C",
    fontWeight: "600",
  },
  date: {
    fontSize: 15,
    color: "#6C6C6C",
    marginTop: 2,
  },
  logo: {
    width: 70, // Aumentei o tamanho da logo
    height: 70,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000",
    marginBottom: 40,
    lineHeight: 30,
  },
  buttonsContainer: {
    width: "100%",
    gap: 15,
  },
  gradientButton: {
    borderRadius: 10,
    overflow: "hidden",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    paddingVertical: 15,
    fontSize: 16,
    fontWeight: "500",
  },
  // Elementos decorativos (círculos roxos suaves)
  circleTop: {
    position: "absolute",
    top: 40,
    left: -80,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(155, 89, 182, 0.1)",
  },
  circleBottom: {
    position: "absolute",
    bottom: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(155, 89, 182, 0.1)",
  },

  image: {
    width: 100,
    height: 100,
  }
});

export default HomeScreen;
