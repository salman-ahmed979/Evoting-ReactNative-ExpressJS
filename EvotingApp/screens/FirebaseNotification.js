import { PermissionsAndroid } from "react-native/types";

const mapFirebaseEvents = () => {

    messaging().getToken().then(token => {
        db.save(token)
    })

    messaging().onTokenRefresh(token => {
        db.save(token)
    })

    messaging().onNotificationOpenedApp(message => {
        processNotification(message, true)
    })

    messaging().getInitialNotification()
    .then(message => processNotification(message))

    messaging().onMessage(async message => {
        processNotification(message)
    })

    messaging().setBackgroundMessageHandler(async message => {
        processNotification(message)
    })
}

const processNotification = (message, gotoNavigationScreen = false) => {
    let dataId = message.data.DataId;
    let Type = message.data.Type;

    if (Type == 1) { 
        // do something 
    }
}




const FirebaseNotification = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
    mapFirebaseEvents();
}

export default FirebaseNotification; // define the component in App.js