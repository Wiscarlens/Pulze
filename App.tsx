import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform authentication logic here
    console.log('Username:', username);
    console.log('Password:', password);
    // You can add your authentication logic here (e.g., API call, validation, etc.)
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <Text style={styles.noAccount}>Don't have an account? Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
       <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.forgotPassword}>Forgot Password?</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    color: 'black',
    marginBottom: 5,
  },
  noAccount: {
    marginBottom: 20,
    fontSize: 12,

  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  button: {
    backgroundColor: '#D94B3A',
    width: '80%',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginRight: 40, 
  }
});

export default LoginScreen;

