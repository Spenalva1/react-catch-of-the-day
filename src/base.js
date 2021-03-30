import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC68oyaxrtDWERd1vO2i-dPeBfbRMrlQ_0",
    authDomain: "react-catch-of-the-day-d6735.firebaseapp.com",
    databaseURL: "https://react-catch-of-the-day-d6735-default-rtdb.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;