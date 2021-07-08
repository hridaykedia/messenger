import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: '<API_KEY>',
  authDomain: '<PROJECT_ID>.firebaseapp.com',
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
  projectId: '<PROJECT_ID>',
  storageBucket: '<BUCKET>.appspot.com',
  messagingSenderId: '<SENDER_ID>',
  appId: '<APP_ID>',
  measurementId: '<MEASURMENT_ID>',
});

const db = firebaseApp.firestore();
export default db;
