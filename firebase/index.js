import firebase from 'firebase'
import 'firebase/firestore'
//import { registerForPushNotificationsAsync } from '../notification'

const config = {
  apiKey: 'AIzaSyCS0rYI20l9vEa1UhjJpbgnGBfIFoKT15g',
  authDomain: 'nicohouse-6db15.firebaseapp.com',
  databaseURL: 'https://nicohouse-6db15.firebaseio.com',
  projectId: 'nicohouse-6db15',
  storageBucket: 'nicohouse-6db15.appspot.com',
  messagingSenderId: '63047098483',
}

firebase.initializeApp(config)

// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore()
export const auth = firebase.auth()

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true,
})

export const getCurrentUser = () => {
  if (auth.currentUser) {
    return Promise.resolve(auth.currentUser)
  }

  return auth
    .signInAnonymously()
    .then(() => auth.currentUser)
    .catch(error => console.error(error))
}

export default firebase
