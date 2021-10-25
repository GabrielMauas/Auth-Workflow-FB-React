import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase/firebaseConfg';
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword 
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
    const logOut = () => {
        return signOut(auth);
    }
    const resetPass = (email) => {
        return sendPasswordResetEmail(auth, email);
    }
    const updateEm = (email) => {
        return updateEmail(currentUser, email);
    }
    const updatePass = (pass) => {
        return updatePassword(currentUser, pass);
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
        logIn,
        logOut,
        resetPass,
        updateEm,
        updatePass
    }


    return (
        <AuthContext.Provider value={value} >
            { !loading && children }
        </AuthContext.Provider>
    )
}
