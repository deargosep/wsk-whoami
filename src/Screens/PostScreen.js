import React from 'react'
import { View, Text } from 'react-native'
import { Appbar, Card, useTheme } from 'react-native-paper'
import { app } from '../../firebase'
export default function PostScreen({ navigation, route }) {
    const { id, title, description, posted_at } = route.params
    const [data, setData] = React.useState({title:title, description:description, posted_at:posted_at})
    const theme = useTheme()
    // React.useEffect(()=>{
    //     app.firestore().collection('posts').doc(id).get().then((res)=>{
    //         setData(res.data())
    //     })
    // }, [])
    return (
        <View>
            <Appbar.Header style={{backgroundColor:theme.colors.accent}}>
                <Appbar.Action onPress={()=>navigation.goBack()} icon="arrow-left" />
                <Appbar.Content title={data.title} />
                </Appbar.Header>
                <View style={{padding:16}}>
            <Text selectable>{data.description}</Text>
                </View>
        </View>
    )
}