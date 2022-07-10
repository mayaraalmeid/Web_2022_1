import { collection, documentId, doc, addDoc, deleteDoc, updateDoc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";

export default class FirebaseStudentService {

    static list = (firestore, callback) => {
        const coll = collection(firestore, 'students')
        getDocs(coll)
            .then(
                (querySnapshot) => {
                    let students = []
                    querySnapshot.forEach(
                        (document) => {
                            students.push(
                                {
                                    _id: document.id,
                                    name: document.data().name,
                                    course: document.data().course,
                                    ira: document.data().ira
                                }
                            )
                        }
                    )
                    callback(students)
                }
            )
            .catch(error => console.log(error))
    }

    static list_onSnapshot = (firestore, callback) => {
        const coll = collection(firestore, 'students')
        const q = query(coll)
        onSnapshot(
            q,
            (querySnapshot) => {
                let students = []
                querySnapshot.forEach(
                    (document) => {
                        students.push(
                            {
                                _id: document.id,
                                name: document.data().name,
                                course: document.data().course,
                                ira: document.data().ira
                            }
                        )
                    }
                )
                callback(students)
            }
        )
    }

    static update = (firestore,callback,_id,student)=>{
        const docRef = doc(firestore,'students',_id)
        updateDoc(docRef,student)
        .then(
            ()=>{
                callback(true)
            }
        )
        .catch(error=>console.log(error))

    }

    static create = (firestore, callback, student) => {
        const coll = collection(firestore, 'students')
        addDoc(coll, student)
            .then(
                (docRef) => {
                    callback(docRef.id)
                })
            .catch(error => console.log(error))

    }

    static delete = (firestore,callback,_id) => {
        const docRef = doc(firestore,'students',_id)
        deleteDoc(docRef)
        .then(
            ()=>{
                callback(true)
            })
        .catch(error=>console.log(error))

    }

    static retrieve = (firestore, callback, _id) => {
        const docRef = doc(firestore, 'students', _id)
        getDoc(docRef)
            .then(
                (docSnapshot) => {
                    if (docSnapshot.exists()) callback(docSnapshot.data())
                })
            .catch(error => console.log(error))

    }
}