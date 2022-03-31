<script lang="ts">
    import {Task} from "../types/Task";
    import {QueryDocumentSnapshot} from "firebase/firestore";
    import {getTasksService} from "../services/task.service";
    import TaskItem from "./TaskItem.svelte";
    import {onDestroy} from "svelte";

    let tasks: Task[] = []
    export let setEdit: Function

    const sp = (snapshot) => {
        tasks = []
        snapshot.docs.forEach(doc => {
            const newTask = new Task({
                id: doc.id,
                title: doc.data().title,
                description: doc.data().description,
            });
            tasks = [...tasks, newTask];
        })
    }

    let unsub = getTasksService(sp)

    onDestroy(() => {
        console.log("destroy", unsub)
        unsub()
    })

</script>
<main>
    <div>
        {#each tasks as task}
            <TaskItem task={task} setEdit={setEdit}/>
        {/each}
    </div>
</main>
