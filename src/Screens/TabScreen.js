import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import HomeScreen from './HomeScreen'
import SettingsScreen from './SettingsScreen'
import { IconButton, useTheme } from 'react-native-paper'
import { useRecoilValue } from 'recoil'
import { themes_state, theme_state } from '../../settings'

const Tab = createMaterialBottomTabNavigator()

export default function TabScreen() {
    const theme = useTheme()
    const currtheme = useRecoilValue(theme_state)
    const themes = useRecoilValue(themes_state)
    const defaultOptions = {
        contentStyle: {
          backgroundColor: theme.colors.accent,
        }, headerShown: false
      }
    return (
        <Tab.Navigator barStyle={{backgroundColor:theme.colors.accent}} screenOptions={{headerShown:false}}>
            <Tab.Screen options={{ tabBarIcon: ()=> <IconButton color={theme.colors.iconColor} style={{marginTop:-8}} icon="home" />, screenOptions:{...defaultOptions.contentStyle, paddingTop:20}, tabBarLabel:'Главная'}} name="Home" component={HomeScreen} />
            <Tab.Screen options={{ tabBarIcon: ()=> <IconButton color={theme.colors.iconColor} style={{marginTop:-8}} icon="cog" />, screenOptions:{...defaultOptions.contentStyle, paddingTop:20}, tabBarLabel:'Настройки'}} name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    )
}
