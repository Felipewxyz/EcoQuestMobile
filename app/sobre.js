import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Sobre() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o EcoQuest</Text>
      <Text style={styles.text}>Esse é um app para ajudar o planeta 🌱</Text>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6F5EA',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 40,
    backgroundColor: '#00B140',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 6,
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
