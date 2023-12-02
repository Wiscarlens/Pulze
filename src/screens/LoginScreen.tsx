import React, { useState } from 'react';
import { Text, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity, View } from 'react-native';
import EmailIcons from 'react-native-vector-icons/Zocial';
import PasswordIcons from 'react-native-vector-icons/Entypo';
import SocialMediaIcons from 'react-native-vector-icons/Ionicons';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform authentication logic here
    console.log('Email:', email);
    console.log('Password:', password);
    // add authentication logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <Text style={styles.noAccount}>Don't have an account? Signup</Text>

      <View style={styles.inputContainer}>
        <EmailIcons
          style={styles.icon}
          name='email'
          size={20}
          color={'black'}/>

        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>

      <View style={styles.inputContainer}>
          <PasswordIcons
            style={styles.icon}
            name='eye-with-line'
            size={20}
            color={'black'}
          />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      
  
       <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <Text style={styles.forgotPassword}>Forgot Password?</Text>

    <View style={styles.lineContainer}>
      <View style={styles.line}></View>
      <View style={styles.square}>
        <Text style={styles.lineText}>OR</Text>
      </View>
      <View style={styles.line}></View>
    </View>

      <View style={styles.socialMediaContainer}>
        <SocialMediaIcons
            style={styles.socialMediaIcon}
            name='logo-google'
            size={30}
            color={'black'}/>
        <SocialMediaIcons
            style={styles.socialMediaIcon}
            name='logo-facebook'
            size={30}
            color={'black'}/>
        <SocialMediaIcons
            style={styles.socialMediaIcon}
            name='logo-apple'
            size={30}
            color={'black'}/>
      </View>

    </View>
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
  inputContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  input: {
    flex: 1, 
    height: 40,
  },
  icon: {
    marginLeft: 10
  },
  button: {
    backgroundColor: '#D94B3A',
    width: '80%',
    height: 50,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center', 
  
  },
  buttonText: {
    color: 'white',
   fontWeight: 'bold' 
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginRight: 40, 
  },
  socialMediaContainer: {
    marginTop: 5,
    flexDirection: 'row'
  },
  socialMediaIcon: {
    margin: 15
  },
  lineContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: 'gray',
  },
  square: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lineText: {
    fontWeight: 'bold'
  }
});

export default LoginScreen;

