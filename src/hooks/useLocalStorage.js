import {useState} from 'react'

export default function useLocalStorage() {

    const getUser = () => {
        const userString = localStorage.getItem('_id');
        try{
            const userValue = JSON.parse(userString);
            return userValue
        }
        catch{
            const userValue = ""
            return userValue
        }
    }

    const [ user, setUser ] = useState(getUser());

    const saveUser = (userValue) => {
        localStorage.setItem('_id', JSON.stringify(userValue));
        setUser(userValue)
    }

    return {
        setUser: saveUser,
        user
    }
}