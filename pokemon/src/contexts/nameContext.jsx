import {createContext, useContext, useReducer} from 'react'

const NameContext = createContext()

export const types = Object.freeze({
    SET_NAME: 'SET_NAME',
    CLEAR_NAME: 'CLEAR_NAME',
})

const initialState = {
    name: localStorage.getItem('name') || ''
}
const nameReducer = (state, action) => {
    switch (action.type) {
        case types.SET_NAME:
            return { 
                ...state,
                name: action.payload
            }
        case types.CLEAR_NAME:
            return {
                ...state,
                name: ''
            }
        default:
            return state
    }
}

export const NameProvider = ({children}) => {
    const [state, dispatch] = useReducer(nameReducer, initialState)
    return (
        <NameContext.Provider value={{state, dispatch}}>
            {children}
        </NameContext.Provider>
    )
}   

export const useName = () => useContext(NameContext)