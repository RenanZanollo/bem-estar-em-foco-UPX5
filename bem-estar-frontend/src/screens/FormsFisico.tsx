// frontend/src/screens/FormsFisico.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { api } from "../services/api";

type AnswersFisico = {
  step1: {
    idade?: string;
    horasSono?: string;
    qualidadeSono?: string;
  };
  step2: {
    frequenciaExercicio?: string;
    tipoExercicio?: string;
    duracao?: string;
  };
  step3: {
    alimentacaoTipo?: string;
    consumoFrutas?: string;
    consumoAgua?: string;
  };
  step4: {
    dorOuLesao?: string;
    mobilidade?: string;
    objetivo?: string;
  };
};

export default function FormsFisico() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const [answers, setAnswers] = useState<AnswersFisico>({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
  });

  const update = (s: number, k: string, v: string) => {
    setAnswers((prev) => ({ ...prev, [`step${s}`]: { ...(prev as any)[`step${s}`], [k]: v } }));
  };

  const buildPrompt = (data: AnswersFisico) => {
    // Template claro e estruturado (fácil de ajustar)
    return `
Você é um assistente de saúde. Recebe respostas de um questionário físico divididas em 4 etapas.
Retorne recomendações práticas, seguras e simples, focadas em bem-estar físico.
Dados (formato: Etapa - Pergunta: Resposta):

ETAPA 1 - INFORMAÇÕES BÁSICAS:
- Idade: ${data.step1.idade || "não informado"}
- Horas de sono por noite: ${data.step1.horasSono || "não informado"}
- Qualidade do sono: ${data.step1.qualidadeSono || "não informado"}

ETAPA 2 - ATIVIDADE FÍSICA:
- Frequência de exercícios: ${data.step2.frequenciaExercicio || "não informado"}
- Tipo de exercício: ${data.step2.tipoExercicio || "não informado"}
- Duração média da sessão: ${data.step2.duracao || "não informado"}

ETAPA 3 - ALIMENTAÇÃO:
- Tipo de alimentação predominante: ${data.step3.alimentacaoTipo || "não informado"}
- Consome frutas diariamente?: ${data.step3.consumoFrutas || "não informado"}
- Consumo diário de água: ${data.step3.consumoAgua || "não informado"}

ETAPA 4 - SAÚDE ATUAL:
- Tem dor ou lesão?: ${data.step4.dorOuLesao || "não informado"}
- Como avalia sua mobilidade?: ${data.step4.mobilidade || "não informado"}
- Objetivo principal (ex: ganhar força, perder peso): ${data.step4.objetivo || "não informado"}

Por favor, retorne em formato de texto corrido com bullet points e sugestões práticas.
`;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const prompt = buildPrompt(answers);
      const res = await api.post("/gerarResultado", { section: "fisico", answers, prompt });
      const recommendations = res.data.recommendations || res.data; // tolerância a formatos
      // navegar para tela de resultado (assumindo que exista ResultScreen que aceita param 'text')
      navigation.navigate("Result", { result: recommendations });
    } catch (err: any) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível gerar recomendações. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const StepNav = (
    <View style={styles.buttonRow}>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => (step > 1 ? setStep(step - 1) : navigation.goBack())}
      >
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
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 48, marginTop: 20 }}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Bem-Estar em Foco</Text>
        <Text style={styles.progressText}>Etapa {step} de 4</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(step / 4) * 100}%` }]} />
      </View>

      <View style={styles.card}>
        {step === 1 && (
          <>
            <Text style={styles.cardTitle}>Informações básicas</Text>
            <Text style={styles.cardSubtitle}>Conte-nos um pouco sobre você</Text>

            <Text style={styles.label}>Idade</Text>
            <TextInput style={styles.input} placeholder="Ex. 25" keyboardType="number-pad"
              value={answers.step1.idade || ""} onChangeText={(t) => update(1, "idade", t)} />

            <Text style={styles.label}>Quantas horas dorme por noite?</Text>
            <TextInput style={styles.input} placeholder="Ex. 7" keyboardType="number-pad"
              value={answers.step1.horasSono || ""} onChangeText={(t) => update(1, "horasSono", t)} />

            <Text style={styles.label}>Como avalia a qualidade do sono?</Text>
            <TextInput style={styles.input} placeholder="Péssimo / Ruim / Bom / Ótimo"
              value={answers.step1.qualidadeSono || ""} onChangeText={(t) => update(1, "qualidadeSono", t)} />
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.cardTitle}>Atividade física</Text>
            <Text style={styles.cardSubtitle}>Fale sobre seus exercícios</Text>

            <Text style={styles.label}>Frequência</Text>
            <TextInput style={styles.input} placeholder="Nunca / 1-2x / 3-4x / 5+"
              value={answers.step2.frequenciaExercicio || ""} onChangeText={(t) => update(2, "frequenciaExercicio", t)} />

            <Text style={styles.label}>Tipo de exercício</Text>
            <TextInput style={styles.input} placeholder="Caminhada, Musculação, Corrida..."
              value={answers.step2.tipoExercicio || ""} onChangeText={(t) => update(2, "tipoExercicio", t)} />

            <Text style={styles.label}>Duração média (min)</Text>
            <TextInput style={styles.input} placeholder="Ex. 45" keyboardType="number-pad"
              value={answers.step2.duracao || ""} onChangeText={(t) => update(2, "duracao", t)} />
          </>
        )}

        {step === 3 && (
          <>
            <Text style={styles.cardTitle}>Alimentação</Text>
            <Text style={styles.cardSubtitle}>Seus hábitos alimentares</Text>

            <Text style={styles.label}>Tipo de alimentação</Text>
            <TextInput style={styles.input} placeholder="Ex. Balanceada, ultraprocessados..."
              value={answers.step3.alimentacaoTipo || ""} onChangeText={(t) => update(3, "alimentacaoTipo", t)} />

            <Text style={styles.label}>Consome frutas diariamente?</Text>
            <TextInput style={styles.input} placeholder="Sim / Não / Às vezes"
              value={answers.step3.consumoFrutas || ""} onChangeText={(t) => update(3, "consumoFrutas", t)} />

            <Text style={styles.label}>Consumo diário de água</Text>
            <TextInput style={styles.input} placeholder="Ex. 2L"
              value={answers.step3.consumoAgua || ""} onChangeText={(t) => update(3, "consumoAgua", t)} />
          </>
        )}

        {step === 4 && (
          <>
            <Text style={styles.cardTitle}>Condição atual</Text>
            <Text style={styles.cardSubtitle}>Condições e objetivos</Text>

            <Text style={styles.label}>Tem dor ou lesão?</Text>
            <TextInput style={styles.input} placeholder="Descreva se sim"
              value={answers.step4.dorOuLesao || ""} onChangeText={(t) => update(4, "dorOuLesao", t)} />

            <Text style={styles.label}>Como avalia sua mobilidade?</Text>
            <TextInput style={styles.input} placeholder="Boa / Regular / Ruim"
              value={answers.step4.mobilidade || ""} onChangeText={(t) => update(4, "mobilidade", t)} />

            <Text style={styles.label}>Objetivo principal</Text>
            <TextInput style={styles.input} placeholder="Ex. perder peso, ganhar força..."
              value={answers.step4.objetivo || ""} onChangeText={(t) => update(4, "objetivo", t)} />
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
