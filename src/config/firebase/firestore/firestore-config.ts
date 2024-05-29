import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBnGhlx1zINH-ppk-C55Tk42smCvazN_nc',
  authDomain: 'terranovasrv.firebaseapp.com',
  projectId: 'terranovasrv',
  storageBucket: 'terranovasrv.appspot.com',
  messagingSenderId: '110390763779',
  appId: '1:110390763779:web:faf970424215cb14298936',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
