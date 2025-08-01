import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [senha, setSenha] = useState('');

  return (
    <ImageBackground
      source={require('../assets/images/fundo2.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <View style={styles.circle}>
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </View>
      </TouchableOpacity>


      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.welcomeText}>
              É BOM TE VER{'\n'}DE NOVO!!
            </Text>

            <TextInput
              placeholder="adicione seu email"
              placeholderTextColor="#666"
              style={styles.input}
              keyboardType="email-address"
            />

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="adicione sua senha"
                placeholderTextColor="#666"
                style={styles.inputSenha}
                secureTextEntry={!senhaVisivel}
                value={senha}
                onChangeText={setSenha}
              />
              <TouchableOpacity
                style={styles.iconeOlho}
                onPress={() => setSenhaVisivel(!senhaVisivel)}
              >
                <Ionicons name={senhaVisivel ? 'eye-off' : 'eye'} size={22} color="#666" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
            style={styles.botaoEntrar}
            onPress={() => router.push('/Home')}>
              <Text style={styles.textoBotao}>ENTRAR</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 2,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  container: {
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 260,
    height: 160,
    marginBottom: 30,
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 24,
    color: '#156499',
    fontWeight: 'bold',
    marginBottom: 30,
    lineHeight: 30,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 16,
    width: 260,
    fontSize: 15,
  },
  inputContainer: {
    width: 260,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 16,
  },
  inputSenha: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 15,
  },
  iconeOlho: {
    paddingHorizontal: 10,
  },
  botaoEntrar: {
    backgroundColor: '#019314',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
    width: 260
  },
  textoBotao: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
