import * as clients from '../../../src/clients/memo-client'
import { renderRouter, screen, fireEvent } from 'expo-router/testing-library'
import Detail from '../../../src/app/memo/detail'
import { waitFor } from '@testing-library/react-native'
import Edit from '../../../src/app/memo/edit'

describe('detail', () => {
    it('要素を正しく表示する', async () => {
        const spyStubGetMemos = jest.spyOn(clients, 'getMemos').mockResolvedValueOnce({
            memos: [
                {
                    id: 1,
                    title: 'testTitle1',
                    createdAt: 'testCreateAt1',
                    content: 'testContent1',
                },
                {
                    id: 2,
                    title: 'testTitle2',
                    createdAt: 'testCreateAt2',
                    content: 'testContent2',
                },
            ],
        })

        renderRouter(
            {
                'memo/detail': Detail,
            },
            {
                initialUrl: '/memo/detail?id=1',
            }
        )
        expect(screen).toHavePathnameWithParams('/memo/detail?id=1')

        await waitFor(() => {
            expect(screen.getByTestId('custom-icon')).toBeTruthy()
            expect(spyStubGetMemos).toHaveBeenCalledWith('')
            expect(screen.getByText('testTitle1')).toBeTruthy()
            expect(screen.getByText('testCreateAt1')).toBeTruthy()
            expect(screen.getByText('testContent1')).toBeTruthy()
        })
    })

    it('pencilButtonを押すとeditページに遷移する', () => {
        jest.spyOn(clients, 'getMemos').mockResolvedValueOnce({
            memos: [{id:1, title:'testTitle', content:'testContent', createdAt:'testAT'}]
        })
        renderRouter(
            {
                'memo/detail': Detail,
                'memo/edit': Edit,
            },
            {
                initialUrl: '/memo/detail?id=1',
            }
        )

        const pencilButton = screen.getByTestId('CircleButton')
        fireEvent.press(pencilButton)

        expect(screen).toHavePathnameWithParams('/memo/edit?id=1')
    })
})
