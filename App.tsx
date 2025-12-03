import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import QuizScreen from './src/screens/QuizScreen';
import SplashScreen from './src/screens/SplashScreen';

const { Navigator, Screen } = createStackNavigator();

export type RootStackParamList = {
  Welcome: undefined;
  Quiz: undefined;
  Login: undefined;
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Navigator>
          <Screen name="Welcome" component={WelcomeScreen} />
          <Screen name="Quiz" component={QuizScreen} />
          <Screen name="Login" component={LoginScreen} />
        </Navigator>
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

