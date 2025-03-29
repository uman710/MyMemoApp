import { ScrollView, StyleSheet, Text, View } from 'react-native'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { router, useLocalSearchParams, useFocusEffect } from 'expo-router'
import { useState, useCallback } from 'react'
import { Memo, GetMemoResponse } from '../../models/memos'
import { getMemos } from '../../clients/memo-client'

const Detail = () => {
    const [memo, setMemo] = useState<Memo | null>(null)
    const { id } = useLocalSearchParams()

    useFocusEffect(
        useCallback(() => {
            ;(async () => {
                const token = ''
                const getMemoResponse: GetMemoResponse = await getMemos(token)
                const filteredMemo = getMemoResponse.memos.filter((memo) => memo.id === Number(id))
                setMemo(filteredMemo[0])
            })()
        }, [])
    )

    const handlePressDetail = () => {
        router.push({ pathname: '/memo/edit', params: { id: id } })
    }

    return (
        <View style={styles.container}>
            <View style={styles.memoHeader}>
                <Text style={styles.memoTitle}>{memo?.title}</Text>
                <Text style={styles.memoDate}>{memo?.createdAt}</Text>
            </View>

            <ScrollView style={styles.memoBody}>
                <Text style={styles.memoBodyText}>{memo?.content}</Text>
            </ScrollView>

            <CircleButton style={{ top: 60, bottom: 'auto' }} onPress={handlePressDetail}>
                <Icon name="pencil" size={40} color="#FFFFFF" />
            </CircleButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    memoHeader: {
        backgroundColor: '#467FD3',
        height: 96,
        justifyContent: 'center',
        paddingVertical: 24,
        paddingHorizontal: 19,
    },
    memoTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        lineHeight: 32,
        fontWeight: 'bold',
    },
    memoDate: {
        color: '#FFFFFF',
        fontSize: 12,
        lineHeight: 16,
    },
    memoBody: {
        paddingVertical: 32,
        paddingHorizontal: 27,
    },
    memoBodyText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#000000',
    },
})

export default Detail
