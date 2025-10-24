import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Form');
    } catch (error) {
      alert('Erro ao fazer login. Verifique as credenciais.');
    }
  };

  return (
    <View style={{flex:1, backgroundColor:'#f8fafc', alignItems:'center', justifyContent:'center', padding:20}}>
      <Text style={{fontSize:28, fontWeight:'700', marginBottom:20}}>Bem-Estar em Foco</Text>
      <TextInput placeholder='E-mail' value={email} onChangeText={setEmail} style={{width:'100%', backgroundColor:'#fff', padding:12, borderRadius:8, marginBottom:12}} />
      <TextInput placeholder='Senha' value={password} onChangeText={setPassword} secureTextEntry style={{width:'100%', backgroundColor:'#fff', padding:12, borderRadius:8, marginBottom:18}} />
      <TouchableOpacity onPress={handleLogin} style={{width:'100%', backgroundColor:'#0ea5a4', padding:14, borderRadius:8}}>
        <Text style={{textAlign:'center', color:'#fff', fontWeight:'700'}}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Register')} style={{marginTop:12}}>
        <Text>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}
