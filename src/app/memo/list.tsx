import {View, StyleSheet} from "react-native"
import Header from "../../components/Header"
import MemoListItem from "../../components/MemoListItem"
import CircleButton from "../../components/CircleButton"
import Icon from "../../components/icon";
import {router} from "expo-router";

const handlePress = () => {
  router.push(`/memo/create`)
}

const List = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View>
        <MemoListItem />
        <MemoListItem />
        <MemoListItem />
      </View>
      <CircleButton onPress={handlePress}>
        <Icon name='plus' size={40} color='#ffffff' />
      </CircleButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //画面いっぱいに広げる
    backgroundColor: "#ffffff",
  },
})

export default List