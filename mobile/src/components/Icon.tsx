import { createIconSetFromIcoMoon } from '@expo/vector-icons'
import { useFonts } from 'expo-font'
import fontData from '../../assets/fonts/icomoon.ttf'
import fontSelection from '../../assets/fonts/selection.json'
import { View } from 'react-native'

const CustomIcon = createIconSetFromIcoMoon(fontSelection, 'IcoMoon', 'icomoon.ttf')

const Icon = (props: Props) => {
    const { name, size, color } = props
    const [fontLoaded] = useFonts({
        IcoMoon: fontData,
    })
    if (!fontLoaded) {
        return null
    }
    return (
        <View>
            <CustomIcon name={name} size={size} color={color} />
        </View>
    )
}

interface Props {
    name: string
    size: number
    color: string
}
export default Icon
