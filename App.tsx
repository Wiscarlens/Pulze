import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import QuizScreen from './src/screens/QuizScreen'

const App = () => {
  
  return (
    <SafeAreaView style={styles.container}>
      {/* <LoginScreen/> */}

      {/* <WelcomeScreen/> */}

      <QuizScreen/>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});



export default App;

