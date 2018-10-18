import firebase from 'firebase';



  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyDsHzE2VO-JKpuWpjnZbbcVoEDWEnZMItg",
    authDomain: "vesalica-caf53.firebaseapp.com",
    databaseURL: "https://vesalica-caf53.firebaseio.com",
    projectId: "vesalica-caf53",
    storageBucket: "vesalica-caf53.appspot.com",
    messagingSenderId: "6109849297"
  };
  firebase.initializeApp(config);


  export default firebase;
