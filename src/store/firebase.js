import firebase from 'firebase';
import props from '../../props';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: props.fbApiKey,
    authDomain: 'red-parry-276101.firebaseapp.com',
    databaseURL: 'https://red-parry-276101.firebaseio.com',
    projectId: 'red-parry-276101',
    storageBucket: 'red-parry-276101.appspot.com',
    messagingSenderId: '729058817416',
    appId: props.fbClientId,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line import/prefer-default-export
export const db = firebase.firestore();
