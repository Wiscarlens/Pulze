import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import QuizScreen from './src/screens/QuizScreen'

const App = () => {
  
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        {/* <LoginScreen/>
        <WelcomeScreen/> */}
        {/* <QuizScreen/> */}


         <LoginScreen/>

      {/* <WelcomeScreen/> */}

      {/* <QuizScreen/> */}
      


    </NavigationContainer>
      

      {/* <LoginScreen/> */}

      {/* <WelcomeScreen/> */}

      {/* <QuizScreen/> */}
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});



export default App;

