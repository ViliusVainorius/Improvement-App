import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword } from "firebase/auth";
import { auth } from "./firebase";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // console.log("User signed in:", userCredential.user);
            return userCredential;
        })
        .catch((error) => {
            console.error("Sign-in error:", error);
            throw error;
        });
}

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // result.user saving user info to firebase!!!!
    // const user = result.user;

    return result;
}

export const doSignOut = () => {
    return auth.signOut();
}

export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
}

export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
}

export const doSendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
    });
}