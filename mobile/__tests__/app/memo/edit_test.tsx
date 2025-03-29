import * as clients from '../../../src/clients/memo-client'
import {fireEvent, renderRouter, screen} from 'expo-router/testing-library'
import Edit from '../../../src/app/memo/edit'
import { waitFor } from '@testing-library/react-native'
import {Alert} from "react-native";
import {router} from "expo-router";

describe('Edit', () => {
    it('初期表示状態で、pathのIDと一致するメモとcheckアイコンを表示している', async () => {
        jest.spyOn(clients, 'getMemos').mockResolvedValueOnce({
            memos: [
                {
                    id: 1,
                    title: 'testTitle1',
                    content: 'testContent1',
                    createdAt: 'testDate1',
                },
                {
                    id: 2,
                    title: 'testTitle2',
                    content: 'testContent2',
                    createdAt: 'testDate2',
                },
            ],
        })

        renderRouter(
            {
                'memo/edit': Edit,
            },
            {
                initialUrl: '/memo/edit?id=1',
            }
        )

        await waitFor(() => {
            const textInput = screen.getByTestId('TextInput')
            expect(textInput).toHaveProp('value', 'testContent1')
            const icon = screen.getByTestId('custom-icon')
            expect(icon).toHaveProp('name', 'check')
        })
    })

    it('ユーザーが本文を入力して、checkボタンを押してpatchMemoが呼ばれ、成功するとrouter.backが呼ばれる', async () => {
        jest.spyOn(clients, 'getMemos').mockResolvedValueOnce({
            memos: [{id:1, title: 'testTitle', content:'testContent', createdAt:'testCreateAt'}]
        })
        const spyStubPatchMemo = jest.spyOn(clients, 'patchMemo').mockResolvedValueOnce({id: 1})
        const spyAlert = jest.spyOn(Alert, 'alert' )
        const spyRouterBack = jest.spyOn(router, 'back')

        renderRouter({ 'memo/edit': Edit }, { initialUrl: '/memo/edit?id=1' })

        await waitFor(() => {
            expect(screen.getByTestId('TextInput')).toHaveProp('value', 'testContent' )
        })

        fireEvent.changeText(screen.getByTestId('TextInput'), 'changedTestContent')
        fireEvent.press(screen.getByTestId('CircleButton'))

        expect(screen.getByTestId('TextInput')).toHaveProp('value', 'changedTestContent')
        await waitFor(() => {
            expect(spyStubPatchMemo).toHaveBeenCalledWith(1, 'changedTestContent', '')
        })
        expect(spyAlert).toHaveBeenCalledWith('patchSuccess:1')
        expect(spyRouterBack).toHaveBeenCalled()
    })

    it('patchMemoが失敗したらAlertにエラーメッセージを表示する', async () => {
        jest.spyOn(clients, 'getMemos').mockResolvedValueOnce(
            {
                memos:[{
                    id: 1,
                    title: 'testTitle',
                    content: 'testContent',
                    createdAt: 'testDate',
                }]
            }
        )
        jest.spyOn(clients, 'patchMemo').mockRejectedValueOnce(new Error('testError'))
        const spyAlert = jest.spyOn(Alert, 'alert')
        const spyRouterBack = jest.spyOn(router, 'back')
        renderRouter(
            {
                'memo/edit': Edit,
            },
            {
                initialUrl: '/memo/edit?id=1'
            }
        )

        fireEvent.press(screen.getByTestId('CircleButton'))

        await waitFor(() => {
            expect(spyAlert).toHaveBeenCalledWith('Error', 'testError')
            expect(spyRouterBack).not.toHaveBeenCalled()
        })
    })

    it('getMemosに失敗すると、データの取得に失敗しましたとアラートが表示される', async () => {
        jest.spyOn(clients, 'getMemos').mockRejectedValueOnce({})
        const spyAlert = jest.spyOn(Alert, 'alert')

        renderRouter(
            {
                'memo/edit': Edit
            },{
                initialUrl: '/memo/edit?id=1'
            }
        )

        await waitFor(() => {
            expect(spyAlert).toHaveBeenCalledWith('データの取得に失敗しました')
        })
    })
})
