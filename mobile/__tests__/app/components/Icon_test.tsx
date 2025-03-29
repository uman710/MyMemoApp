import { useFonts } from 'expo-font'
import Icon from '../../../src/components/Icon'
import { render } from '@testing-library/react-native'

describe('Icon', () => {
  it('フォントがロードされない場合、nullを返す', () => {
    ;(useFonts as jest.Mock).mockReturnValue([false])
    const { queryByTestId } = render(<Icon name="testName" size={24} color="black" />)

    expect(queryByTestId('custom-icon')).toBeNull()
  })

  it('フォントがロードされた場合、Customアイコンがレンダリングされる', () => {
    ;(useFonts as jest.Mock).mockReturnValue([true])
    const { queryByTestId } = render(<Icon name="plus" size={24} color="black" />)

    expect(queryByTestId('custom-icon')).toBeTruthy()
  })

  it('props が CustomIcon に適用される', () => {
    ;(useFonts as jest.Mock).mockReturnValue([true])
    const { getByTestId } = render(<Icon name="plus" size={32} color="blue" />)
    const customIcon = getByTestId('custom-icon')
    expect(customIcon).toHaveProp('name', 'plus')
    expect(customIcon).toHaveProp('size', 32)
    expect(customIcon).toHaveProp('color', 'blue')
  })
})
