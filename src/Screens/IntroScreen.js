import React from 'react'
import { View, Text } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import Swiper from 'react-native-swiper'
import { useRecoilState } from 'recoil'
import { firstTime_state, name_state } from '../../core'
export default function IntroScreen({ navigation }) {
    const swiper = React.useRef()
    const [error, setError] = React.useState(false)
    const [name, setName] = useRecoilState(name_state)
    const [firstTime, setFirstTime] = useRecoilState(firstTime_state)
    return <View style={{ flex: 1 }}>
        <Swiper ref={swiper} style={{ marginTop: 30, }} loop={false}>
            <View style={{ padding: 16, position: 'absolute', bottom: '30%' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 32 }}>Привет. {'\n'}</Text>
                <View style={{ alignSelf: 'flex-end' }}>
                    <Text style={{ fontSize: 24 }}>WhoAmI - это приложение, цель которого - помощь в поиске себя самого.</Text>
                    <Text style={{ marginTop: 20, fontSize: 20 }}>Важная часть нас, нашей жизни - наша идентичность. Иногда бывает так, что мы просто не знаем, кто мы.</Text>
                </View>
                <Button onPress={() => swiper.current.scrollBy(1)} style={{ marginTop: 20 }}>Дальше</Button>
            </View>
            <View style={{ padding: 16, position: 'absolute', bottom: '30%' }}>
                <Text style={{ fontSize: 24 }}>Мы пытаемся заменить пустоту внутри себя другими людьми, развлечениями или работой.{'\n'}Но что, если...</Text>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 20 }}><Text style={{ fontWeight: 'bold' }}>..можно</Text> не бояться остаться одному?</Text>
                    <Text style={{ fontSize: 20 }}><Text style={{ fontWeight: 'bold' }}>..можно</Text> чувствовать себя полноценно?</Text>
                    <Text style={{ fontSize: 20 }}><Text style={{ fontWeight: 'bold' }}>..можно</Text> жить спокойно?</Text>
                </View>
                <Button onPress={() => swiper.current.scrollBy(1)} style={{ marginTop: 20 }}>Попробовать</Button>
            </View>
            <View style={{ padding: 16, position: 'absolute', bottom: '30%', right: 0, left: 0 }}>
                <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Так давай начнём с твоего имени.</Text>
                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 34, fontWeight: 'bold' }}>Привет, </Text>
                    <TextInput onSubmitEditing={()=>{if (name === '') setError(true); else setError(false)}} value={name} onChangeText={setName} mode={'flat'} error={error} style={{
                        fontSize: 32,
                        backgroundColor: 'transparent'
                    }} placeholder='имя' />
                    <Text style={{ fontSize: 34 }}> !</Text>
                </View>
                <Button onPress={() => {
                    if (name === '') {
                        setError(true)
                    } else {
                        setFirstTime(false)
                        navigation.replace('Tab')
                    }
                }
                } style={{ marginTop: '20%' }}>Привет</Button>
            </View>
            <View>
            <Paragraph style={{fontSize:16}}>Выбери подходящую тебе тему</Paragraph>
            <View>
                <FlatList horizontal data={themes} renderItem={({item})=> {
                    return <Color style={{marginRight:15}} active={currtheme === item.name ? true:false} theme={item}/>
                }
            } />
            </View>
            </View>
        </Swiper>
    </View>
}

{/* 
    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
        </View>
    <Text style={{ fontSize: 34, fontWeight: 'bold' }}>Привет, </Text>
            <TextInput mode={'flat'} style={{
                fontSize: 32,
                backgroundColor: 'transparent'
            }} placeholder='имя' /> 
            <Text style={{ fontSize: 34 }}> !</Text>
        */}