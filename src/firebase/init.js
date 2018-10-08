import firebase from 'firebase';
// import firestore from 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyAvElMkVP-LIUsgzzESDMlIDL0y76uicq4',
  authDomain: 'realtime-chat-5d06a.firebaseapp.com',
  databaseURL: 'https://realtime-chat-5d06a.firebaseio.com',
  projectId: 'realtime-chat-5d06a',
  storageBucket: 'realtime-chat-5d06a.appspot.com',
  messagingSenderId: '79678431023',
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

// export firestore database
export default firebaseApp.firestore();
