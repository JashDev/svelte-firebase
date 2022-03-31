import {addDoc, collection, deleteDoc, onSnapshot, doc, updateDoc} from "firebase/firestore";
import {db} from "../FirebaseLib";
import type {Task} from "../types/Task";

export const createTaskService = async (task: Task) => {
    delete task.id
    await addDoc(collection(db, 'tasks'), {...task})
}

export const getTasksService = (cb: Function) => {
    return onSnapshot(collection(db, 'tasks'), (snapshot) => {
            cb(snapshot)
        },
        (error) => {
            console.log(error)
        })
}

export const getTaskService = (id: number) => {
    console.log('get task')
}

export const deleteTaskService = async (id: string) => {
    console.log('delete task', id)
    return new Promise((resolve, reject) => {
        deleteDoc(doc(db, 'tasks', id)).then(() => {
            console.log('deleted')
            resolve(true)
        }).catch(error => {
            reject(error)
        })

    })
}

export const updateTaskService = async (task: Task) => {
 await updateDoc(doc(db, 'tasks', task.id), {...task})
}
