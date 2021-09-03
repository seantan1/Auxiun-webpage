import {useState} from 'react'

export const useForm = (initialState) => {
    const[fields, setFields] = useState(initialState)

    const handleInputChange = (event) => {
        setFields(fields => ({...fields, [event.target.name]: event.target.value}))
    }

    return{fields, setFields, handleInputChange}
}
