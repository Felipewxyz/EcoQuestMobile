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
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Cadastro() {
  const navigation = useNavigation();
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const escolherImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos da sua permissão para acessar as fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFotoPerfil(result.assets[0].uri);
    }
  };

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

          {/* Logo no topo */}
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Foto de Perfil maior/larga */}
          <TouchableOpacity style={styles.fotoContainer} onPress={escolherImagem}>
            {fotoPerfil ? (
              <Image source={{ uri: fotoPerfil }} style={styles.fotoPerfil} />
            ) : (
              <View style={styles.fotoPlaceholder}>
                <Ionicons name="person-outline" size={60} color="#156499" />
                <Text style={styles.textoFoto}>Adicionar foto de perfil</Text>
              </View>
            )}
          </TouchableOpacity>

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

          <TouchableOpacity
            style={styles.ButtonCadastro}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.ButtonText}>CONCLUIR CADASTRO</Text>
          </TouchableOpacity>
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
    paddingVertical: 40,
    paddingHorizontal: 20,
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
  logo: {
    width: 260,
    height: 160,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    color: '#156499',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 16,
    width: 260, // largura fixa menor
    fontSize: 15,
    alignSelf: 'center',
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
    width: 260, // mesma largura dos inputs
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 0,
    marginBottom: 30,
    alignSelf: 'center',
  },
  ButtonCadastro: {
    backgroundColor: '#019314',
    paddingVertical: 16,
    borderRadius: 8,
    width: 260, // mesma largura dos inputs
    alignItems: 'center',
    alignSelf: 'center',
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
  // Quadrado da foto levemente mais largo e menor de altura
  fotoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    width: 200, // um pouco mais largo
    height: 180, // menor de altura
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.5)',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  fotoPerfil: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  fotoPlaceholder: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoFoto: {
    color: '#156499',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
});
