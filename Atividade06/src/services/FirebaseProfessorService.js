import { collection, documentId, doc, addDoc, deleteDoc, updateDoc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";

export default class FirebaseStudentService {

    static list = (firestore, callback) => {
        const coll = collection(firestore, 'professors')
        getDocs(coll)
            .then(
                (querySnapshot) => {
                    let professors = []
                    querySnapshot.forEach(
                        (document) => {
                            professors.push(
                                {
                                    _id: document.id,
                                    name: document.data().name,
                                    university: document.data().university,
                                    degree: document.data().degree
                                }
                            )
                        }
                    )
                    callback(professors)
                }
            )
            .catch(error => console.log(error))
    }

    static list_onSnapshot = (firestore, callback) => {
        const coll = collection(firestore, 'professors')
        const q = query(coll)
        onSnapshot(
            q,
            (querySnapshot) => {
                let professors = []
                querySnapshot.forEach(
                    (document) => {
                        professors.push(
                            {
                                _id: document.id,
                                name: document.data().name,
                                university: document.data().university,
                                degree: document.data().degree
                            }
                        )
                    }
                )
                callback(professors)
            }
        )
    }

    static update = (firestore,callback,_id,professors)=>{
        const docRef = doc(firestore,'professors',_id)
        updateDoc(docRef,professors)
        .then(
            ()=>{
                callback(true)
            }
        )
        .catch(error=>console.log(error))

    }

    static create = (firestore, callback, professors) => {
        const coll = collection(firestore, 'professors')
        addDoc(coll, professors)
            .then(
                (docRef) => {
                    callback(docRef.id)
                })
            .catch(error => console.log(error))

    }

    static delete = (firestore,callback,_id) => {
        const docRef = doc(firestore,'professors',_id)
        deleteDoc(docRef)
        .then(
            ()=>{
                callback(true)
            })
        .catch(error=>console.log(error))

    }

    static retrieve = (firestore, callback, _id) => {
        const docRef = doc(firestore, 'professors', _id)
        getDoc(docRef)
            .then(
                (docSnapshot) => {
                    if (docSnapshot.exists()) callback(docSnapshot.data())
                })
            .catch(error => console.log(error))

    }
}