import {Alert, KeyboardAvoidingView, StyleSheet, TextInput, View} from 'react-native'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { router, useLocalSearchParams } from 'expo-router'
import { useState, useEffect } from 'react'
import { GetMemoResponse, Memo } from '../../models/memos'
import { getMemos, patchMemo } from '../../clients/memo-client'

const Edit = () => {
    const { id } = useLocalSearchParams()
    const [memo, setMemo] = useState<Memo | null>(null)
    const [editedContent, setEditedContent] = useState<string>('')

    useEffect(() => {
        ;(async () => {
            try {
                const token = ''
                const getMemoResponse: GetMemoResponse = await getMemos(token)
                const filteredMemo = getMemoResponse.memos.filter((memo) => memo.id === Number(id))
                setMemo(filteredMemo[0])
            } catch {
                Alert.alert("データの取得に失敗しました")
            }
        })()
    }, [])

    useEffect(() => {
        if (memo) {
            setEditedContent(memo.content)
        }
    }, [memo])

    const handlePressEdit = async () => {
        try {
            const token = ''
            const patchMemoResponse = await patchMemo(Number(id), editedContent, token)
            Alert.alert(`patchSuccess:${patchMemoResponse.id}`)
            router.back()
        } catch (e) {
            Alert.alert('Error', e instanceof Error ? e.message : 'An unknown error occurred')
        }
    }

    return (
        <KeyboardAvoidingView behavior="height" style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput testID="TextInput" multiline={true} style={styles.input} value={editedContent} onChangeText={(text) => setEditedContent(text)} />
            </View>
            <CircleButton onPress={handlePressEdit}>
                <Icon name="check" size={40} color="#FFFFFF" />
            </CircleButton>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    inputContainer: {
        flex: 1,
        paddingVertical: 32,
        paddingHorizontal: 27,
    },
    input: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 16,
        lineHeight: 24,
    },
})

export default Edit
