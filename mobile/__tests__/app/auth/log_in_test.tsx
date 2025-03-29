import Login from '../../../src/app/auth/log_in'
import { render, waitFor } from '@testing-library/react-native'
import { fireEvent, renderRouter, screen } from 'expo-router/testing-library'
import List from "../../../src/app/memo/list";
import * as clients from "../../../src/clients/memo-client";
import SignUp from "../../../src/app/auth/sign_up";

describe('Login Page', () => {
    it('要素を正しく表示する', () => {
        const { getByText, getByPlaceholderText } = render(<Login />)

        expect(getByText('Log In')).toBeTruthy()
        expect(getByPlaceholderText('email')).toBeTruthy()
        expect(getByPlaceholderText('password')).toBeTruthy()
        expect(getByText('Submit')).toBeTruthy()
    })

    it('Submitボタンを押すと、list画面に遷移する', async () => {
        jest.spyOn(clients, 'getMemos').mockResolvedValue({memos: []})
        renderRouter(
            {
                'auth/log_in': Login,
                'memo/list': List,
            },
            {
                initialUrl: '/auth/log_in',
            }
        )

        expect(screen).toHavePathname('/auth/log_in')

        await waitFor(() => {
            const submitButton = screen.getByText('Submit')
            fireEvent.press(submitButton)
        })

        expect(screen).toHavePathname('/memo/list')
    })

    it('ユーザーが入力した通りにEmailとPasswordが入力される', () => {
        const { getByPlaceholderText } = render(<Login />)

        const emailInput = getByPlaceholderText('email')
        const passwordInput = getByPlaceholderText('password')
        fireEvent.changeText(emailInput, 'hoge@gmail.com')
        fireEvent.changeText(passwordInput, 'hogehoge')

        expect(emailInput).toHaveProp('value', 'hoge@gmail.com')
        expect(passwordInput).toHaveProp('value', 'hogehoge')
    })

    it('Sign up here!を押すとSignUp画面に遷移する', async () => {
        renderRouter(
            {
                'auth/log_in': Login,
                'auth/sign_up': SignUp,
            },
            {
                initialUrl: '/auth/log_in',
            }
        )

        const signUpText = screen.getByText('Sign up here!')
        fireEvent.press(signUpText)

        expect(screen).toHavePathname('/auth/sign_up')
    })
})
