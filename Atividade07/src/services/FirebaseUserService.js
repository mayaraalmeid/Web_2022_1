import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

export default class FirebaseUserService {
    
    static login = (auth, login, password, callback) => {
        signInWithEmailAndPassword(auth,login,password)
            .then(
                (userCredential) => {
                    callback(userCredential.user)}
            )
            .catch(error => { callback(null); console.log(error) })
    }


    static logout = (auth,callback) => {
        signOut(auth)
        .then(()=>callback(true))
        .catch(
            error => {console.log(error);callback(false)}
        )
    }
    static signUp = (auth,login,password,callback) => {
        createUserWithEmailAndPassword(auth,login,password)
        .then( (userCredential) => {
            callback(true,userCredential.user)
        }
    )
    .catch(
        (error) => {
            callback(false,error.code);console.log(error.code)}
    )
}
    static sendEmail = (auth,callback) => {
        sendEmailVerification(auth.currentUser)
        .then(
            ()=>{callback(true)}
        )
        .catch(
            (error)=>{ console.log(error);callback(false,error.code)
            }
        )

    }
}
