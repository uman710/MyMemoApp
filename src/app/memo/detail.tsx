import {ScrollView, StyleSheet, Text, View} from "react-native"
import CircleButton from "../../components/CircleButton"
import Icon from "../../components/icon";
import {router} from "expo-router";

const handlePress = () => {
  router.push("/memo/edit")
}

const Detail = () => {
  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle}>買い物リスト</Text>
        <Text style={styles.memoDate}>2025/01/26 10:10</Text>
      </View>

      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoBodyText}>
          買い物リスト
          書体やレイアウトなどを確認するために用います。
          本文用なので使い方を間違えると不自然に見えることもありますので要注意。
        </Text>
      </ScrollView>

      <CircleButton style={{ top: 60, bottom: 'auto' }} onPress={handlePress}>
        <Icon name="pencil" size={40} color='#ffffff' />
      </CircleButton>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  memoHeader: {
    backgroundColor: '#467FD3',
    height: 96,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  memoTitle: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  memoDate: {
    color: '#ffffff',
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
  }
})

export default Detail