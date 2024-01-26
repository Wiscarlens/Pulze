import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import QuizScreen from './src/screens/QuizScreen';

const { Navigator, Screen } = createStackNavigator();

const App = () => {
  
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Navigator>
          <Screen name="Login" component={LoginScreen} />
          <Screen name="Welcome" component={WelcomeScreen} />
          <Screen name="Quiz" component={QuizScreen} />

        </Navigator>


        {/* <LoginScreen/>} */}
        {/* <WelcomeScreen/>  */}
        {/* <QuizScreen/> */}


      </NavigationContainer>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});



export default App;

