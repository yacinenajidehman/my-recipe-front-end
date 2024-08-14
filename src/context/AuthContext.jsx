import { createContext, useState, useEffect } from "react";
import { Loading } from "../components";
import { Preferences } from "@capacitor/preferences";

export const AuthContext = createContext();


const AuthContextProvider = (props) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const [jwt, setJwt] = useState(null);

    useEffect(() => {
        getAuthenticated()
    }, [])



    const getAuthenticated = async () => {
        const { value } = await Preferences.get({ key: 'accessToken' });
        const accessToken = value;
        if (accessToken) {
            setJwt(accessToken);
            setLoggedIn(true);
            setShowLoading(false);
        } else {
            setLoggedIn(false);
            setShowLoading(false);
        }

    }

    return (
        <>
        {showLoading 
        ? 
        <Loading isOpen={showLoading} /> 
        : 
        <AuthContext.Provider value={{loggedIn, setLoggedIn, jwt, setJwt}}>
            {props.children}
        </AuthContext.Provider>
        }
        </>
    )
}

export default AuthContextProvider;