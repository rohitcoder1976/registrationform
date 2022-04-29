 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyC693srzy2UgWZpdjddDq2yyi7baBfRk_o",
    authDomain: "login-auth-firebase-1bdb3.firebaseapp.com",
    databaseURL: "https://login-auth-firebase-1bdb3-default-rtdb.firebaseio.com",
    projectId: "login-auth-firebase-1bdb3",
    storageBucket: "login-auth-firebase-1bdb3.appspot.com",
    messagingSenderId: "945330156383",
    appId: "1:945330156383:web:55ba8c5dc696ea3ce17cea"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();
const database = firebase.database();


function register(){
    
    var email = document.getElementById("mail-field").value;
    var password = document.getElementById("password-field").value;   
    var checkbox = document.getElementById("tandc-checkbox").checked;
    
    if (!validate_email(email)||!validate_password(password)){
        alert("Email or password is invalid");
        return
    }

    if (!checkbox){
        alert("You must agree to terms and conditions to register an account.");
        return
    }

    auth.createUserWithEmailAndPassword(email, password)

    .then(function(){
        var user = auth.currentUser;

        console.log(user);
    
        var database_ref = database.ref();
    
        var user_data = {
            email: email,
            last_login: Date.now()
        }

        console.log(email);
        database_ref.child('users/' + user.uid).set(user_data);
    
        alert("User created");
    })

    .catch(function(error){
        error_message = error.message;

        alert(error_message);
    });
    
}

function login(){

    var email1 = document.getElementById("mail-field").value;
    var password1 = document.getElementById("password-field").value;   

    auth.signInWithEmailAndPassword(email1, password1)



    .then(function(){
        var user1 = auth.currentUser;

        var database_ref = database.ref();

        database_ref.child('users/' + user1.uid).update({
            last_login: Date.now()
        })

        alert("You have logged in to your account.");

    })

    .catch(function(error){
        var error_message1 = error.message;

        alert(error_message1);
    });

}

function validate_email(email){
    var expression = /^[^@]+@\w+(\.\w+)+\w$/

    if (expression.test(email) == true){
        return true;
    } else {
        return false;
    }
}

function validate_password(password){

    if (password.length >= 6){
        return true;
    } else {
        return false;
    }

}

function validate_field(field){
    if (field == null){
        return false;
    } else if (field == ""){
        return false;
    } else if (field.length > 0){

    }
}