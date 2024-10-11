import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, TextInput, View, Button, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';

// Tela de cálculo
function HomeScreen({ navigation }) {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('');

  // Função para navegar para a tela de resultados
  const handleCalculate = () => {
    if (num1 === '' || num2 === '') {
      Alert.alert('Erro', 'Por favor, insira os dois números.');
      return;
    }
    if (operation === '') {
      Alert.alert('Erro', 'Por favor, selecione uma operação.');
      return;
    }

    navigation.navigate('Resultado', {
      num1: parseFloat(num1),
      num2: parseFloat(num2),
      operation: operation
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Calculadora </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Digite o primeiro número"
          value={num1}
          onChangeText={setNum1}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Digite o segundo número"
          value={num2}
          onChangeText={setNum2}
        />
        <View style={styles.buttonContainer}>
          <Button title="Somar" onPress={() => setOperation('Somar')} />
          <Button title="Subtrair" onPress={() => setOperation('Subtração')} />
          <Button title="Multiplicar" onPress={() => setOperation('Multiplicar')} />
          <Button title="Dividir" onPress={() => setOperation('Dividir')} />
        </View>
        <Button title="CACULAR" onPress={handleCalculate} />
      </View>
    </TouchableWithoutFeedback>
  );
}

// Tela de resultado
function ResultScreen({ route, navigation }) {
  const { num1, num2, operation } = route.params;

  let result;
  switch (operation) {
    case 'Somar':
      result = num1 + num2;
      break;
    case 'Subtração':
      result = num1 - num2;
      break;
    case 'Multiplicar':
      result = num1 * num2;
      break;
    case 'Dividir':
      if (num2 === 0) {
        Alert.alert('Erro', 'Divisão por zero não permitida.');
        return;
      }
      result = num1 / num2;
      break;
    default:
      result = 'Operação inválida';
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado</Text>
      <Text>Valor 1: {num1}</Text>
      <Text>Valor 2: {num2}</Text>
      <Text>Operação: {operation}</Text>
      <Text>Resultado: {result}</Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

// Configuração de navegação
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculadora" component={HomeScreen} />
        <Stack.Screen name="Resultado" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
});
