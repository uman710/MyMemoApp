import { Alert, KeyboardAvoidingView, StyleSheet, TextInput, View, Text } from 'react-native'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { router } from 'expo-router'
import { useState } from 'react'
import { postMemo } from '../../clients/memo-client'

const handlePressCreate = async (title: string, content: string) => {
    try {
        const token = ''
        const data = await postMemo(title, content, token)
        Alert.alert(data.id.toString())
        router.back()
    } catch (e) {
        Alert.alert('Error', e instanceof Error ? e.message : 'An unknown error occurred')
    }
}

const Create = () => {
    const [draftTitle, setDraftTitle] = useState<string>('')
    const [draftMemo, setDraftMemo] = useState<string>('')

    return (
        <KeyboardAvoidingView behavior="height" style={styles.container}>
            <View style={styles.inputContainer}>
                <Text>Title</Text>
                <TextInput style={styles.inputTitle} autoCapitalize="none" value={draftTitle} onChangeText={(text) => setDraftTitle(text)} testID="Title" />
                <Text>Memo</Text>
                <TextInput multiline={true} style={styles.inputMemo} value={draftMemo} autoCapitalize="none" onChangeText={(text) => setDraftMemo(text)} testID="Memo" />
            </View>
            <CircleButton onPress={() => handlePressCreate(draftTitle, draftMemo)}>
                <Icon name="check" size={40} color="#ffffff" />
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
    inputTitle: {
        height: 30,
        borderWidth: 1,
        borderColor: '#a8a8a8',
    },
    inputMemo: {
        height: '70%',
        textAlignVertical: 'top',
        fontSize: 16,
        lineHeight: 24,
        borderWidth: 1,
        borderColor: '#a8a8a8',
    },
})

export default Create
