import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Cadastro() {
  const navigation = useNavigation();
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  return (
    <ImageBackground
      source={require('../assets/images/fundo2.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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

            <Text style={styles.title}>CADASTRE-SE AQUI</Text>

            <TextInput
              style={styles.input}
              placeholder="adicione seu nome"
              placeholderTextColor="#666"
            />
            <TextInput
              style={styles.input}
              placeholder="crie seu nome de usuário"
              placeholderTextColor="#666"
            />
            <TextInput
              style={styles.input}
              placeholder="adicione seu email"
              keyboardType="email-address"
              placeholderTextColor="#666"
            />
            <View style={styles.ContainerPassword}>
              <TextInput
                style={styles.inputSenha}
                placeholder="crie sua senha"
                secureTextEntry={!senhaVisivel}
                placeholderTextColor="#666"
              />
              <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
                <Ionicons
                  name={senhaVisivel ? 'eye-off' : 'eye'}
                  size={22}
                  color="#666"
                  style={styles.EyeIcon}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.ButtonCadastro}>
              <Text style={styles.ButtonText}>CONCLUIR CADASTRO</Text>
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
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 60,
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
  container: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 30,
    marginHorizontal: 30,
    alignItems: 'center',
  },
  logo: {
    width: 260,
    height: 160,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    color: '#156499',
    fontWeight: 'bold',
    marginBottom: 30,
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
  inputSenha: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 15,
  },
  ContainerPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 260,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 0,
    marginBottom: 30,
  },
  ButtonCadastro: {
    backgroundColor: '#019314',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  ButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  EyeIcon: {
  marginLeft: 10,
  marginRight: 10,
},
});
