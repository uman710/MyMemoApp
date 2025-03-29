import { StyleSheet, View } from 'react-native'
import MemoListItem from '../../components/MemoListItem'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { router, useNavigation, useFocusEffect } from 'expo-router'
import { useEffect, useState, useCallback } from 'react'
import LogOutButton from '../../components/LogOutButton'
import { getMemos } from '../../clients/memo-client'
import { Memo } from '../../models/memos'

const handlePress = () => {
    router.push('/memo/create')
}

const List = () => {
    const navigation = useNavigation()
    const [memos, setMemos] = useState<Memo[]>([])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <LogOutButton />,
        })
    }, [])

    useFocusEffect(
        useCallback(() => {
            ;(async () => {
                const token = ''
                const getMemoResponse = await getMemos(token)
                setMemos(getMemoResponse.memos)
            })()
        }, [])
    )

    return (
        <View style={styles.container}>
            {memos && memos.map((memo, index) => <MemoListItem key={index} memo={memo} setMemos={setMemos} />)}
            <CircleButton onPress={handlePress}>
                <Icon name="plus" size={40} color="#FFFFFF" />
            </CircleButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
})

export default List
