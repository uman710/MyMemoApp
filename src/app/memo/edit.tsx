import {KeyboardAvoidingView, StyleSheet, TextInput, View} from "react-native";
import Header from "../../components/Header";
import CircleButton from "../../components/CircleButton";
import Icon from "../../components/icon";
import {router} from "expo-router";

const handlePress = () => {
  router.back()
}

const Edit = () => {
  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      <Header />
      <View style={styles.inputContainer}>
        <TextInput multiline={true} style={styles.input} value={'買い物リスト\nリスト'} />
      </View>
      <CircleButton onPress={handlePress} >
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

export default Edit