import {initializeApp} from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'
// ------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyBWsUjZOHSdNOe7Dijr6Shfmc6syS8KEZY",
    authDomain: "crwn-clothing-db-d2aa4.firebaseapp.com",
    projectId: "crwn-clothing-db-d2aa4",
    storageBucket: "crwn-clothing-db-d2aa4.appspot.com",
    messagingSenderId: "871219159192",
    appId: "1:871219159192:web:ab0b625e2d42ba6be7b0ed"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot)
    console.log(userSnapshot.exists())

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, email, createdAt
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }
    return userDocRef;
}



// if user data exists
//
//return userDocRef