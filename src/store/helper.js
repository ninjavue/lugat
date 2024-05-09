import { db } from "@/firebase";
import { getDocs, getDoc, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";


const helper = {
    actions: {
        async getData(_, payload) {
            let dataArr = []
            let tasksCollection = await getDocs(collection(db, payload))
            tasksCollection.forEach(task => {
                dataArr.push({ ...task.data(), id: task.id })
            })
            return dataArr
        },
        async postData(_, payload) {
            let newTask = await addDoc(collection(db, payload.url), payload.data)
            return { ...payload.data, id: newTask.id }
        },
        async deleteData(_, payload) {
            const deleteTask = doc(db, payload.url, payload.id);
            await deleteDoc(deleteTask);
            return payload
        },
        async getDataById(_, payload) {
            const taskRef = doc(db, payload.url, payload.id);
            const task = await getDoc(taskRef);
            return { ...task.data(), id: task.id }
        },
        async updateData(_, payload) {
            const taskRef = doc(db, payload.url, payload.data.id);
            await updateDoc(taskRef, payload.data);
            return payload.data
        }

    }
}


export default helper