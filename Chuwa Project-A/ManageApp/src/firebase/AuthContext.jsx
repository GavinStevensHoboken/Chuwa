import React, {useContext, useState, useEffect} from 'react';
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
    signOut
} from "firebase/auth";
import {auth} from "./Firebase";

const AuthContext = React.createContext();

export const useAuthentication = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    },[]);

    async function doCreateUserWithEmailAndPassword(email, password, displayName){
        await createUserWithEmailAndPassword(auth, email, password);
        updateProfile(auth.currentUser,{displayName:displayName});
    }

    async function doSignInWithEmailAndPassword(email,password){
        await signInWithEmailAndPassword(auth, email, password);
    }

    async function doChangePassword(email, oldPassword, newPassword){
        let authCredential = EmailAuthProvider.credential(email, oldPassword);
        await reauthenticateWithCredential(auth.currentUser, authCredential);
        await updatePassword(auth.currentUser, newPassword);
        await signOut(auth);
    }

    async function doSignOut(){
        await signOut();
    }

    const value = {
        currentUser,
        doCreateUserWithEmailAndPassword,
        doSignInWithEmailAndPassword,
        doSignOut,
        doChangePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );


}
