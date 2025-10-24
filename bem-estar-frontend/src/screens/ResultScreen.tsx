import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export default function ResultScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { result } = route.params;

  return (
    <ScrollView style={{flex:1, backgroundColor:'#f8fafc', padding:20}}>
      <Text style={{fontSize:22, fontWeight:'700', marginBottom:12}}>Recomendações Personalizadas</Text>

      <View style={{backgroundColor:'#fff', borderRadius:8, padding:12, marginBottom:12}}>
        <Text style={{color:'#111'}}>{result}</Text>
      </View>

      <TouchableOpacity onPress={()=>navigation.navigate('Form')} style={{backgroundColor:'#0ea5a4', padding:14, borderRadius:8}}>
        <Text style={{textAlign:'center', color:'#fff', fontWeight:'700'}}>Fazer Nova Avaliação</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
