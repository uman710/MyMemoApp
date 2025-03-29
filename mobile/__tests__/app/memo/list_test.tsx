import * as clients from '../../../src/clients/memo-client'
import { renderRouter, screen, fireEvent } from 'expo-router/testing-library'
import List from '../../../src/app/memo/list'
import { waitFor } from '@testing-library/react-native'
import Detail from "../../../src/app/memo/detail"

describe('List', () => {
    it('初期表示状態で、getMemosで取得したタイトルと日付、plus,deleteアイコンを表示している', async () => {
        jest.spyOn(clients, 'getMemos').mockResolvedValueOnce(
            {
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
                    }
                ]
            }
        )

        renderRouter(
            { 'memo/list': List },
            { initialUrl: '/memo/list'}
        )

        await waitFor(() => {
            const icons = screen.getAllByTestId('custom-icon')
            expect(screen.getByText('testTitle1')).toBeTruthy()
            expect(screen.getByText('testDate1')).toBeTruthy()
            expect(screen.getByText('testTitle2')).toBeTruthy()
            expect(screen.getByText('testDate2')).toBeTruthy()
            expect(icons.filter((icon) => icon.props.name === "delete")).toHaveLength(2)
            expect(icons.filter((icon) => icon.props.name === "plus")).toHaveLength(1)
        })
    })

    it('メモリストを押すとそのメモの詳細ページに遷移する', async () => {
        jest.spyOn(clients, 'getMemos').mockResolvedValue(
            {
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
                    }
                ]
            }
        )

        renderRouter(
            {
                'memo/list': List,
                'memo/detail': Detail
            },
            {
                initialUrl: '/memo/list'
            }
        )

        await waitFor(() => {
            const memo1 = screen.getByText('testTitle1')
            fireEvent.press(memo1)
        })

        expect(screen).toHavePathnameWithParams('/memo/detail?id=1')
    })

    it('deleteアイコンを押すと、そのメモが消去される', async () => {
        const spyGetMemos = jest.spyOn(clients, 'getMemos').mockResolvedValueOnce(
            {
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
                    }
                ]
            }
        )
        const spyDeleteMemo = jest.spyOn(clients, 'deleteMemo')

        renderRouter({
            'memo/list': List
        },{
            initialUrl: '/memo/list'
        })

        await waitFor(() => {
            expect(spyGetMemos).toHaveBeenCalledTimes(1)
            expect(screen.getByText("testTitle1"))
        })
        fireEvent.press(screen.getAllByTestId("custom-icon")[0])

        await waitFor(() => {
            expect(spyDeleteMemo).toHaveBeenCalled()
            expect(spyGetMemos).toHaveBeenCalledTimes(2)
        })
    })
})


