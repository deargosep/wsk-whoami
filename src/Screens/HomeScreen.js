
import React from 'react'

import { View, FlatList } from 'react-native'
import { Title, Subtitle, Card, ActivityIndicator, useTheme, Paragraph } from 'react-native-paper'
import { useRecoilState } from 'recoil'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { name_state } from '../../core'
import { app } from '../../firebase'

export default function HomeScreen() {
    const isFocused = useIsFocused()
    const [posts, setPosts] = React.useState([])
    const [trainings, setTrainings] = React.useState([])
    const [name, setName] = useRecoilState(name_state)
    const theme = useTheme()
    let getPosts = () => {
        app.firestore().collection('posts').get().then((docs) => {
            let newArr = []
            docs.forEach(el => {
                newArr.push({ id: el.id, ...el.data() })
            })
            setPosts(newArr)
        })
    }
    let getTrainings = () => {
        app.firestore().collection('trainings').get().then((docs) => {
            let newArr = []
            docs.forEach(el => {
                newArr.push({ id: el.id, ...el.data() })
            })
            setTrainings(newArr)
        })
    }
    let getGreetings = () => {
        let now = new Date()
        let nowHours = now.getHours()
            if (4 > nowHours < 11) return 'Доброе утро'
            if (11 >  nowHours <  16) return 'Добрый день'
            if (16 >  nowHours <  23) return 'Добрый вечер'
            if (0  > nowHours <  4) return 'Доброй ночи'
    }
    React.useEffect(() => {
        getPosts()
        getTrainings()
    }, [isFocused])
    return <View style={{ backgroundColor: theme.colors.primary, flex: 1, paddingTop: 40 }}>
        <Title style={{ marginBottom: 19, fontSize: 24, padding: 16, fontWeight:'bold' }}>{getGreetings()}, {name}!</Title>
        <Title style={{ marginBottom: 20, paddingHorizontal: 16, }}>Статьи</Title>
        <FlatList style={{ maxHeight: 180,}} showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginLeft: 20, paddingRight: 20,  }} horizontal ListEmptyComponent={<ActivityIndicator />} data={posts} renderItem={({ item }) => <Post item={item} />} />
        <Title style={{ marginBottom: 19, marginTop:10, paddingHorizontal: 16, }}>Упражнения</Title>
        <FlatList style={{ maxHeight: 180,}} showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginLeft: 20, paddingRight: 20,  }} horizontal ListEmptyComponent={<ActivityIndicator />} data={trainings} renderItem={({ item }) => <Post item={item} />} />
    </View>
}

function Post({ item }) {
    const theme = useTheme()
    const navigation = useNavigation()
    return (
        <Card style={{ minWidth: 200, maxWidth:300, marginRight: 20, marginVertical:5, backgroundColor:theme.colors.cardColor }} onPress={() => navigation.navigate('Post', { id: item.id, title: item.title, description: item.description, posted_at: item.posted_at })}>
            <Card.Title title={item.title} />
            <Card.Content >
<Paragraph>{item.description}</Paragraph>
            </Card.Content>
        </Card>
    )
}