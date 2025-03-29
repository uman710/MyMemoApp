import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Link } from 'expo-router'
import Icon from './Icon'
import { Memo } from '../models/memos'
import { deleteMemo, getMemos } from '../clients/memo-client'

interface Props {
    memo: Memo
    setMemos: (newValue: Memo[]) => void
}

const MemoListItem = (props: Props) => {
    const { memo, setMemos } = props
    const { id, title, createdAt } = memo

    const handlePressDelete = async () => {
        try {
            const token = ''
            await deleteMemo(id, token)
            const getMemoResponse = await getMemos(token)
            setMemos(getMemoResponse.memos)
        } catch (e) {
            Alert.alert(`${e}`)
        }
    }

    return (
        <Link
            href={{
                pathname: `/memo/detail`,
                params: { id: id },
            }}
            asChild
        >
            <TouchableOpacity style={styles.memoListItem}>
                <View>
                    <Text style={styles.memoListItemTitle}>{title}</Text>
                    <Text style={styles.memoListItemDate}>{createdAt}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={handlePressDelete}>
                        <Text>
                            <Icon name="delete" size={32} color={'#B0B0B0'} />
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    memoListItem: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 19,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.15)',
    },
    memoListItemTitle: {
        fontSize: 12,
        lineHeight: 32,
    },
    memoListItemDate: {
        fontSize: 12,
        lineHeight: 16,
        color: '#848484',
    },
})

export default MemoListItem
