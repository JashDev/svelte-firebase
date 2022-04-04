import {addDoc, collection, deleteDoc, onSnapshot, doc, updateDoc, DocumentReference} from "firebase/firestore";
import {db} from "./index";

export class FirebaseService {
    collectionName:string
    constructor(collectionName:string) {
        this.collectionName = collectionName
    }

    getFromFirebaseService = (cb) => {
        return onSnapshot(collection(db, this.collectionName), (snapshot) => {
                cb(snapshot)
            },
            (error) => {
                console.log(error)
            })
    }

    createInFirebaseService = (instance): Promise<DocumentReference> => {
        delete instance.id
        return new Promise((resolve, reject) => {
            addDoc(collection(db, this.collectionName), {...instance})
                .then((res) => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    deleteFromFirebaseService = (id: string) => {
        return new Promise((resolve, reject) => {
            deleteDoc(doc(db, this.collectionName, id)).then(() => {
                console.log('deleted')
                resolve(true)
            }).catch(error => {
                reject(error)
            })
        })
    }

    updateFromFirebaseService = ({id, instance}) => {
        return new Promise((resolve, reject) => {
            updateDoc(doc(db, this.collectionName, id), {...instance})
                .then(() => {
                    resolve(true)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

