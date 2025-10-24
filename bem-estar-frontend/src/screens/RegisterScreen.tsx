import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export default function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('Form');
    } catch (error) {
      alert('Erro ao cadastrar usuário.');
    }
  };

  return (
    <View style={{flex:1, backgroundColor:'#f8fafc', alignItems:'center', justifyContent:'center', padding:20}}>
      <Text style={{fontSize:26, fontWeight:'700', marginBottom:20}}>Crie sua conta</Text>
      <TextInput placeholder='E-mail' value={email} onChangeText={setEmail} style={{width:'100%', backgroundColor:'#fff', padding:12, borderRadius:8, marginBottom:12}} />
      <TextInput placeholder='Senha' value={password} onChangeText={setPassword} secureTextEntry style={{width:'100%', backgroundColor:'#fff', padding:12, borderRadius:8, marginBottom:18}} />
      <TouchableOpacity onPress={handleRegister} style={{width:'100%', backgroundColor:'#0ea5a4', padding:14, borderRadius:8}}>
        <Text style={{textAlign:'center', color:'#fff', fontWeight:'700'}}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
