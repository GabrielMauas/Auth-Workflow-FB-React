import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase/firebaseConfg';
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword 
} from 'firebase/auth';


const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signUp = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass);
    }
    const logIn = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signUp,
        logIn
    }


    return (
        <AuthContext.Provider value={value} >
            { !loading && children }
        </AuthContext.Provider>
    )
}
