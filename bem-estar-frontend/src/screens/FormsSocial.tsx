// frontend/src/screens/FormsSocial.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";

type AnswersSocial = {
  step1: { contatos?: string; frequencia?: string; isolado?: string };
  step2: { satisfacao?: string; suporta?: string; tempoRede?: string };
  step3: { senteApoio?: string; participaAtividades?: string; procuraNovas?: string };
  step4: { objetivoSocial?: string; desejoMudanca?: string; barreiras?: string };
};

export default function FormsSocial() {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [answers, setAnswers] = useState<AnswersSocial>({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
  });

  const update = (s: number, k: string, v: string) => {
    setAnswers((p) => ({ ...p, [`step${s}`]: { ...(p as any)[`step${s}`], [k]: v } }));
  };

  const buildPrompt = (d: AnswersSocial) => {
    return `
Saúde social - coletar dados (4 etapas)
ETAPA 1:
- Contatos próximos: ${d.step1.contatos || "não informado"}
- Frequência de interação: ${d.step1.frequencia || "não informado"}
- Sente-se isolado?: ${d.step1.isolado || "não informado"}

ETAPA 2:
- Nível de satisfação com vida social: ${d.step2.satisfacao || "não informado"}
- Recebe suporte quando precisa?: ${d.step2.suporta || "não informado"}
- Tempo disponível para rede: ${d.step2.tempoRede || "não informado"}

ETAPA 3:
- Sente que tem apoio?: ${d.step3.senteApoio || "não informado"}
- Participa de atividades sociais?: ${d.step3.participaAtividades || "não informado"}
- Procura novas conexões?: ${d.step3.procuraNovas || "não informado"}

ETAPA 4:
- Objetivo social: ${d.step4.objetivoSocial || "não informado"}
- Deseja mudar algo?: ${d.step4.desejoMudanca || "não informado"}
- Principais barreiras: ${d.step4.barreiras || "não informado"}

Retorne recomendações práticas e sugestões simples de ações para melhorar conexões sociais.
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
            <Text style={styles.cardTitle}>Contatos e frequência</Text>
            <Text style={styles.cardSubtitle}>Como são suas conexões?</Text>
            <Text style={styles.label}>Quantos contatos próximos você tem?</Text>
            <TextInput style={styles.input} placeholder="Ex. 3" value={answers.step1.contatos || ""} onChangeText={(t)=>update(1,"contatos",t)} />
            <Text style={styles.label}>Frequência de interação</Text>
            <TextInput style={styles.input} placeholder="Diária / Semanal / Mensal" value={answers.step1.frequencia || ""} onChangeText={(t)=>update(1,"frequencia",t)} />
            <Text style={styles.label}>Sente-se isolado?</Text>
            <TextInput style={styles.input} placeholder="Sim / Não / Às vezes" value={answers.step1.isolado || ""} onChangeText={(t)=>update(1,"isolado",t)} />
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.cardTitle}>Satisfação</Text>
            <Text style={styles.label}>Satisfação com vida social</Text>
            <TextInput style={styles.input} placeholder="Baixa / Média / Alta" value={answers.step2.satisfacao || ""} onChangeText={(t)=>update(2,"satisfacao",t)} />
            <Text style={styles.label}>Recebe suporte?</Text>
            <TextInput style={styles.input} placeholder="Sim / Não" value={answers.step2.suporta || ""} onChangeText={(t)=>update(2,"suporta",t)} />
            <Text style={styles.label}>Tempo disponível</Text>
            <TextInput style={styles.input} placeholder="Ex. algumas horas por semana" value={answers.step2.tempoRede || ""} onChangeText={(t)=>update(2,"tempoRede",t)} />
          </>
        )}

        {step === 3 && (
          <>
            <Text style={styles.cardTitle}>Participação</Text>
            <Text style={styles.label}>Sente que tem apoio?</Text>
            <TextInput style={styles.input} placeholder="Sim / Não" value={answers.step3.senteApoio || ""} onChangeText={(t)=>update(3,"senteApoio",t)} />
            <Text style={styles.label}>Participa de atividades?</Text>
            <TextInput style={styles.input} placeholder="Ex. clubes, grupos" value={answers.step3.participaAtividades || ""} onChangeText={(t)=>update(3,"participaAtividades",t)} />
            <Text style={styles.label}>Procura novas conexões?</Text>
            <TextInput style={styles.input} placeholder="Sim / Não" value={answers.step3.procuraNovas || ""} onChangeText={(t)=>update(3,"procuraNovas",t)} />
          </>
        )}

        {step === 4 && (
          <>
            <Text style={styles.cardTitle}>Objetivos</Text>
            <Text style={styles.label}>Objetivo social</Text>
            <TextInput style={styles.input} placeholder="Ex. conhecer mais pessoas" value={answers.step4.objetivoSocial || ""} onChangeText={(t)=>update(4,"objetivoSocial",t)} />
            <Text style={styles.label}>Deseja mudar algo?</Text>
            <TextInput style={styles.input} placeholder="Descreva" value={answers.step4.desejoMudanca || ""} onChangeText={(t)=>update(4,"desejoMudanca",t)} />
            <Text style={styles.label}>Principais barreiras</Text>
            <TextInput style={styles.input} placeholder="Ex. timidez, falta de tempo" value={answers.step4.barreiras || ""} onChangeText={(t)=>update(4,"barreiras",t)} />
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
