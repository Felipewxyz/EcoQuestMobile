import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function InitialScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/images/fundo1.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>BEM-VINDO AO ECOQUEST</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('sobre')}
        >
          <Text style={styles.buttonText}>SOBRE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('cadastro')}
        >
          <Text style={styles.buttonText}>CADASTRO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('login')}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 30,
    width: 320,
    alignItems: 'center',
  },
  logo: {
    width: 240,
    height: 140,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 22,
    color: '#156499',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#019314',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
