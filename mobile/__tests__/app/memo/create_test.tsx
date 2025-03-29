import { render, waitFor } from '@testing-library/react-native'
import Create from '../../../src/app/memo/create'
import { fireEvent } from 'expo-router/testing-library'
import { Alert } from 'react-native'
import { router } from 'expo-router'
import * as clients from '../../../src/clients/memo-client'

describe('Create', () => {
    it('要素を正しく表示する', () => {
        const { getByText, getByTestId } = render(<Create />)

        expect(getByText('Title')).toBeTruthy()
        expect(getByTestId('Title')).toBeTruthy()
        expect(getByText('Memo')).toBeTruthy()
        expect(getByTestId('Memo')).toBeTruthy()
    })

    it('postMemoが成功するとAlertが表示され、router.backが呼ばれる', async () => {
        const spyStubPostMemo = jest.spyOn(clients, 'postMemo').mockResolvedValueOnce({ id: 1 })
        const spyAlert = jest.spyOn(Alert, 'alert')
        const spyRouterBack = jest.spyOn(router, 'back')

        const { getByTestId } = render(<Create />)

        fireEvent.changeText(getByTestId('Title'), 'testTitle')
        fireEvent.changeText(getByTestId('Memo'), 'testMemo')
        fireEvent.press(getByTestId('CircleButton'))

        await waitFor(() => {
            expect(spyStubPostMemo).toHaveBeenCalledWith('testTitle', 'testMemo', '')
            expect(spyAlert).toHaveBeenCalledWith('1')
            expect(spyRouterBack).toHaveBeenCalled()
        })
    })

    it('postMemoが失敗するとAlertにエラーメッセージが表示される', async () => {
        const spyStubPostMemo = jest.spyOn(clients, 'postMemo').mockRejectedValueOnce(new Error('testMessage'))
        const spyAlert = jest.spyOn(Alert, 'alert')
        const spyRouterBack = jest.spyOn(router, 'back')

        const { getByTestId } = render(<Create />)

        fireEvent.press(getByTestId('CircleButton'))

        await waitFor(() => {
            expect(spyStubPostMemo).toHaveBeenCalled()
            expect(spyAlert).toHaveBeenCalledWith('Error', 'testMessage')
            expect(spyRouterBack).not.toHaveBeenCalled()
        })
    })
})
