<script lang="ts">
    import {Task} from "../types/Task";
    import {deleteTaskService} from "../services/task.service";

    export let task: Task
    export let setEdit: Function

    const handleDelete =async () => {
        try {
            await deleteTaskService(task.id)
        } catch (error) {
            console.error(error)
        }
    }

</script>
<main>
    <div>
        <h3>{task.id} - {task.title}</h3>
        <p>{task.description}</p>

        <div>
            <button on:click={handleDelete}>Delete</button>
            <button on:click={setEdit(task)}>Edit</button>
        </div>
    </div>
</main>
