// frontend/src/screens/FormsMental.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";

type AnswersMental = {
  step1: { humor?: string; stress?: string; energia?: string };
  step2: { ansiedade?: string; sono?: string; concentracao?: string };
  step3: { apoioSocial?: string; praticaRelaxamento?: string; terapia?: string };
  step4: { maioresDesafios?: string; rotinaRelax?: string; objetivoMental?: string };
};

export default function FormsMental() {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [answers, setAnswers] = useState<AnswersMental>({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
  });

  const update = (s: number, k: string, v: string) => {
    setAnswers((p) => ({ ...p, [`step${s}`]: { ...(p as any)[`step${s}`], [k]: v } }));
  };

  const buildPrompt = (d: AnswersMental) => {
    return `
Seção: Saúde Mental — questionário em 4 etapas.
Responda com recomendações práticas e estratégias (breves bullet points).

ETAPA 1 - Estado atual:
- Humor: ${d.step1.humor || "não informado"}
- Nível de estresse: ${d.step1.stress || "não informado"}
- Energia diária: ${d.step1.energia || "não informado"}

ETAPA 2 - Sintomas:
- Ansiedade: ${d.step2.ansiedade || "não informado"}
- Qualidade do sono: ${d.step2.sono || "não informado"}
- Concentração: ${d.step2.concentracao || "não informado"}

ETAPA 3 - Suporte e hábitos:
- Rede de apoio: ${d.step3.apoioSocial || "não informado"}
- Técnicas de relaxamento: ${d.step3.praticaRelaxamento || "não informado"}
- Faz terapia?: ${d.step3.terapia || "não informado"}

ETAPA 4 - Objetivos:
- Maiores desafios: ${d.step4.maioresDesafios || "não informado"}
- Rotina de relaxamento: ${d.step4.rotinaRelax || "não informado"}
- Objetivo mental: ${d.step4.objetivoMental || "não informado"}
`;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const prompt = buildPrompt(answers);
      const res = await api.post("/gerarResultado", { section: "fisico", answers, prompt });
      const recommendations = res.data.recommendations || res.data;
      navigation.navigate("Result", { result: recommendations });
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível gerar recomendações.");
    } finally {
      setLoading(false);
    }
  };

  const StepNav = (
    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.secondaryButton} onPress={() => (step > 1 ? setStep(step - 1) : navigation.goBack())}>
        <Text style={styles.secondaryButtonText}>Anterior</Text>
      </TouchableOpacity>

      {step < 4 ? (
        <TouchableOpacity style={styles.primaryButton} onPress={() => setStep(step + 1)}>
          <Text style={styles.primaryButtonText}>Próximo</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>Enviar</Text>}
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 48, marginTop: 20  }}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Bem-Estar em Foco</Text>
        <Text style={styles.progressText}>Etapa {step} de 4</Text>
      </View>
      <View style={styles.progressBar}><View style={[styles.progressFill, { width: `${(step / 4) * 100}%` }]} /></View>

      <View style={styles.card}>
        {step === 1 && (
          <>
            <Text style={styles.cardTitle}>Estado atual</Text>
            <Text style={styles.cardSubtitle}>Como você tem se sentido?</Text>
            <Text style={styles.label}>Humor</Text>
            <TextInput style={styles.input} placeholder="Ex. Triste / Feliz / Neutro" value={answers.step1.humor || ""} onChangeText={(t)=>update(1,"humor",t)} />
            <Text style={styles.label}>Nível de estresse</Text>
            <TextInput style={styles.input} placeholder="Baixo / Médio / Alto" value={answers.step1.stress || ""} onChangeText={(t)=>update(1,"stress",t)} />
            <Text style={styles.label}>Energia diária</Text>
            <TextInput style={styles.input} placeholder="Ex. Baixa / Normal / Alta" value={answers.step1.energia || ""} onChangeText={(t)=>update(1,"energia",t)} />
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.cardTitle}>Sintomas</Text>
            <Text style={styles.label}>Anda se sentindo ansioso(a)?</Text>
            <TextInput style={styles.input} placeholder="Sim / Não / Às vezes" value={answers.step2.ansiedade || ""} onChangeText={(t)=>update(2,"ansiedade",t)} />
            <Text style={styles.label}>Qualidade do sono</Text>
            <TextInput style={styles.input} placeholder="Boa / Ruim" value={answers.step2.sono || ""} onChangeText={(t)=>update(2,"sono",t)} />
            <Text style={styles.label}>Concentração</Text>
            <TextInput style={styles.input} placeholder="Ex. Fácil / Difícil" value={answers.step2.concentracao || ""} onChangeText={(t)=>update(2,"concentracao",t)} />
          </>
        )}

        {step === 3 && (
          <>
            <Text style={styles.cardTitle}>Suporte e hábitos</Text>
            <Text style={styles.label}>Tem rede de apoio?</Text>
            <TextInput style={styles.input} placeholder="Ex. Família, amigos" value={answers.step3.apoioSocial || ""} onChangeText={(t)=>update(3,"apoioSocial",t)} />
            <Text style={styles.label}>Pratica técnicas de relaxamento?</Text>
            <TextInput style={styles.input} placeholder="Ex. Meditação, respiração" value={answers.step3.praticaRelaxamento || ""} onChangeText={(t)=>update(3,"praticaRelaxamento",t)} />
            <Text style={styles.label}>Faz terapia?</Text>
            <TextInput style={styles.input} placeholder="Sim / Não" value={answers.step3.terapia || ""} onChangeText={(t)=>update(3,"terapia",t)} />
          </>
        )}

        {step === 4 && (
          <>
            <Text style={styles.cardTitle}>Objetivos</Text>
            <Text style={styles.label}>Maiores desafios</Text>
            <TextInput style={styles.input} placeholder="Descreva" value={answers.step4.maioresDesafios || ""} onChangeText={(t)=>update(4,"maioresDesafios",t)} />
            <Text style={styles.label}>Rotina de relaxamento</Text>
            <TextInput style={styles.input} placeholder="Ex. Ler, caminhar" value={answers.step4.rotinaRelax || ""} onChangeText={(t)=>update(4,"rotinaRelax",t)} />
            <Text style={styles.label}>Objetivo mental</Text>
            <TextInput style={styles.input} placeholder="Ex. reduzir ansiedade" value={answers.step4.objetivoMental || ""} onChangeText={(t)=>update(4,"objetivoMental",t)} />
          </>
        )}
      </View>

      {StepNav}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fbff", padding: 20 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#2b2b6a" },
  progressText: { color: "#666", fontSize: 13 },
  progressBar: { height: 4, backgroundColor: "#eee", borderRadius: 10, marginBottom: 14 },
  progressFill: { height: 4, backgroundColor: "#4b2bd6", borderRadius: 10 },
  card: { backgroundColor: "#f3edff", padding: 16, borderRadius: 14, marginBottom: 20 },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#4b2bd6", marginBottom: 8 },
  cardSubtitle: { color: "#666", marginBottom: 12 },
  label: { marginTop: 8, fontWeight: "600", color: "#333" },
  input: { backgroundColor: "#fff", borderRadius: 10, padding: 12, borderWidth: 1, borderColor: "#e6e6ee", marginTop: 6 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  primaryButton: { flex: 1, backgroundColor: "#4b2bd6", paddingVertical: 12, borderRadius: 10, alignItems: "center", marginLeft: 8 },
  primaryButtonText: { color: "#fff", fontWeight: "700" },
  secondaryButton: { flex: 1, borderWidth: 1, borderColor: "#4b2bd6", paddingVertical: 12, borderRadius: 10, alignItems: "center", marginRight: 8 },
  secondaryButtonText: { color: "#4b2bd6", fontWeight: "700" },
});
