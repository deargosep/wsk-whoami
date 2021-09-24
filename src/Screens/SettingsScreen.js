import React from 'react'
import {View, Text, FlatList} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTheme, Title, Paragraph, TouchableRipple } from 'react-native-paper'
import { useRecoilState, useRecoilValue } from 'recoil'
import { themes_state, theme_state } from '../../settings'

export default function SettingsScreen() {
    const theme = useTheme()
    const themes = useRecoilValue(themes_state)
    const currtheme = useRecoilValue(theme_state)
    return (
        <View style={{backgroundColor:theme.colors.primary, flex:1, paddingTop:40}}>
        <View style={{padding: 16}}>
        <Title style={{ marginBottom: 35, fontSize: 24, fontWeight:'bold' }}>Настройки</Title>
        <Title style={{ }}></Title>
        <Title style={{ }}>Тема оформления</Title>
        <View style={{marginVertical:10}}>
        <Paragraph style={{fontSize:16}}>Активная тема</Paragraph>
        <Color active theme={theme} />
        </View>
        <Paragraph style={{fontSize:16}}>Доступные темы</Paragraph>
            <View>
                <FlatList horizontal data={themes} renderItem={({item})=> {
                    return <Color style={{marginRight:15}} active={currtheme === item.name ? true:false} theme={item}/>
                }
            } />
            </View>
        </View>
        </View>
    )
}


export function Color ({style, active, theme}) {
    const [currtheme, setTheme] = useRecoilState(theme_state)
    return (
        <TouchableOpacity disabled={active} onPress={()=>{
            if (active) {

            } else {
                setTheme(theme.name)
            }
        }} style={[{
            backgroundColor: theme.colors?.accent ?? theme.colors?.accentColor ?? theme.style?.accentColor,
            elevation:3,
            borderRadius: 100 / 2,
            borderWidth:0.5,
            width:43,
            height:43
        }, style]}>
        </TouchableOpacity>
    )
}