import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import IntroScreen from './src/Screens/IntroScreen'
import TabScreen from './src/Screens/TabScreen'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { firstTime_state } from './core';
import PostScreen from './src/Screens/PostScreen';
import { themes_state, theme_state } from './settings'
import { withTheme } from 'react-native-paper';
const Stack = createNativeStackNavigator()
export default function Wrapper() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}

function App() {
  const currtheme = useRecoilValue(theme_state)
  const themes = useRecoilValue(themes_state)
  let getColors = themes.find((el)=>{
      if (el.name === currtheme) return true
    })['style']
  let theme = {
    ...DefaultTheme, colors: {
      ...DefaultTheme.colors,
      primary: getColors.backgroundColor,
      accent: getColors.accentColor,
      cardColor: getColors.backgroundColor === '#C2CFF2' ? 'white': getColors.accentColor,
      iconColor: getColors.backgroundColor === '#C2CFF2' ? 'white': 'black',
      button: getColors.backgroundColor === '#C2CFF2' ? getColors.accentColor:'black'
    }
  }
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Navigation theme={theme} />
      </NavigationContainer>
    </PaperProvider>
  )
}

function Navigation(props) {
  const { colors } = props.theme;

  const defaultOptions = {
    contentStyle: {
      backgroundColor: colors.primary,
    }, headerShown: false
  }
  const [firstTime, setFirstTime] = useRecoilState(firstTime_state)
  return (
    <View style={{flex:1}}>
      <StatusBar translucent backgroundColor='transparent' barStyle={colors.primary === 'black' ? 'light-content':'dark-content'} />
    <Stack.Navigator screenOptions={defaultOptions}>
      {/* Intro screens */}
      {
        firstTime ?
          <Stack.Group>
            <Stack.Screen name="Intro" component={IntroScreen} />
            {/* <Stack.Screen name="Intro" component={IntroScreen} /> */}
          </Stack.Group>
          :
          <></>
      }
      {/* Menu */}
      <Stack.Group>
        <Stack.Screen name="Tab" component={TabScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
      </Stack.Group>
    </Stack.Navigator>
    </View>
  )
}