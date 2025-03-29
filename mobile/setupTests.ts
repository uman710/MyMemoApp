import '@testing-library/jest-native/extend-expect'
import { jest } from '@jest/globals'

// expo-font のモック
jest.mock('expo-font', () => ({
    useFonts: jest.fn(() => [true]), // デフォルトでフォントがロードされた状態
}))

// @expo/vector-icons のモック
jest.mock('@expo/vector-icons', () => {
    const React = require('react') // Reactを遅延ロード
    const { View } = require('react-native') // Viewを遅延ロード
    return {
        createIconSetFromIcoMoon: jest.fn(
            () => (props: any) => React.createElement(View, { testID: 'custom-icon', ...props }) // createElementを使用
        ),
    }
})

// モックの実装を元に戻す
// beforeEach(() => {
//     jest.restoreAllMocks()
// })

// モックの呼び出し履歴をクリアする
beforeEach(() => {
    jest.clearAllMocks()
})

// // モジュールのキャッシュごとリセットする => ✖️
// beforeEach(() => {
//     jest.resetModules()
// })

// モックの実装と履歴をリセットする　=> ❌
// beforeEach(() => {
//     jest.resetAllMocks()
// })

jest.mock('./src/clients/memo-client', () => ({
    getMemos: jest.fn(),
    postMemo: jest.fn(),
    patchMemo: jest.fn(),
    deleteMemo: jest.fn()
}))