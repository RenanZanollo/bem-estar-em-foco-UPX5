import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { api } from '../services/api';

export default function FormScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [answers, setAnswers] = useState({
    sono: '',
    alimentacao: '',
    humor: '',
    atividade: '',
  });

  const handleChange = (key: string, value: string) => {
    setAnswers(prev => ({...prev, [key]: value}));
  };

  const handleSend = async () => {
    try {
      const res = await api.post('/recommendations', { answers });
      const rec = res.data.recommendations || res.data.recommendations;
      navigation.navigate('Result', { result: rec });
    } catch (err) {
      alert('Erro ao gerar recomendações.');
    }
  };

  return (
    <ScrollView style={{flex:1, backgroundColor:'#f8fafc', padding:20}}>
      <Text style={{fontSize:22, fontWeight:'700', marginBottom:12}}>Autoavaliação de Bem-Estar</Text>

      <TextInput placeholder='Como está seu sono?' onChangeText={(v)=>handleChange('sono', v)} style={{backgroundColor:'#fff', padding:12, borderRadius:8, marginBottom:10}} />
      <TextInput placeholder='Como estão seus hábitos alimentares?' onChangeText={(v)=>handleChange('alimentacao', v)} style={{backgroundColor:'#fff', padding:12, borderRadius:8, marginBottom:10}} />
      <TextInput placeholder='Como tem se sentido emocionalmente?' onChangeText={(v)=>handleChange('humor', v)} style={{backgroundColor:'#fff', padding:12, borderRadius:8, marginBottom:10}} />
      <TextInput placeholder='Com que frequência pratica atividades físicas?' onChangeText={(v)=>handleChange('atividade', v)} style={{backgroundColor:'#fff', padding:12, borderRadius:8, marginBottom:10}} />

      <TouchableOpacity onPress={handleSend} style={{backgroundColor:'#0ea5a4', padding:14, borderRadius:8, marginTop:12}}>
        <Text style={{textAlign:'center', color:'#fff', fontWeight:'700'}}>Gerar Recomendações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
