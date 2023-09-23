import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getMessaging, getToken, onMessage } from "firebase/messaging"


export const firebaseConfig = {
    apiKey: "AIzaSyDy_nlZgZiN377Tp_N1tG2cG934GWbDELU",
    authDomain: "wallow-db-82977.firebaseapp.com",
    projectId: "wallow-db-82977",
    storageBucket: "wallow-db-82977.appspot.com",
    messagingSenderId: "555656316566",
    appId: "1:555656316566:web:4abcfad1e825a10bab64b7",
}

const app = initializeApp(firebaseConfig)

export const messaging = getMessaging(app);


export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload)
        })
    })

export const db = getFirestore(app)

export const sendRequest = () => {
    console.log("Requesting User Permission......")
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("Notification User Permission Granted.")

            return getToken(messaging, {
                vapidKey: `BIzB157FHKtJEWn5REl9tCa8h1QVIeclr4fGUqLNESFH9HbVri7Pzlhx8zY9YYTOk99rEL6ylp7TjiVfYjIAv7k`,
            })
                .then((currentToken) => {
                    if (currentToken) {
                        console.log("Client Token: ", currentToken)
                    } else {
                        console.log(
                            "Failed to generate the registration token."
                        )
                    }
                })
                .catch((err) => {
                    console.log(
                        "An error occurred when requesting to receive the token.",
                        err
                    )
                })
        } else {
            console.log("User Permission Denied.")
        }
    })

}


