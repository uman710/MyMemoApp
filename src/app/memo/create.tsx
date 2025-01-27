import {KeyboardAvoidingView, StyleSheet, TextInput, View} from "react-native";
import CircleButton from "../../components/CircleButton";
import Icon from "../../components/icon";
import {router} from "expo-router";

const handlePressCancel = () => {
  router.back()
}

const Create = () => {
  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput multiline={true} style={styles.input} value={''} />
      </View>
      <CircleButton onPress={handlePressCancel} >
        <Icon name='check' size={40} color='#ffffff' />
      </CircleButton>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  inputContainer: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
  input: {
    flex: 1,
    // テキストを上に上げる
    // androidは下記でOKだが、iosではタグにmultilineを設定しないとだめ
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  }
})

export default Create