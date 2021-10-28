
import {useState} from "react"

export default function useLocalStorage() {


    const getLocalLocation = () => {
        const locationString = localStorage.getItem('location');
        const locationValue = JSON.parse(locationString);
        return locationValue
    }

    const [ localLocation, setLocalLocation ] = useState(getLocalLocation());

    const saveLocation = (locationValue) => {
        localStorage.setItem('location', JSON.stringify(locationValue));
        setLocalLocation(locationValue)
    }
    return {
        setLocalLocation: saveLocation,
        localLocation
    }

}












// import { useState, useEffect } from "react"

// // Custom Hook for storing and retrieving location data 
// // Allows application to function on user refresh

// export default function getLocationValue(key, defaultValue) {
//     // getting value
//     const saved = localStorage.getItem(key);
//     const initial = JSON.parse(saved);
//     return initial || defaultValue;
// }

// export const useLocalStorage = (key, defaultValue) => {
//     const [value, setValue] = useState(() => {
//         return getLocationValue(key, defaultValue);
//     });

//     useEffect(() => {
//         // storing input
//         localStorage.setItem(key, JSON.stringify(value));
//     }, [key, value]);

//     return [value, setValue];
// }