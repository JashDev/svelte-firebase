<script lang="ts">
    import {Task} from "./types/Task";
    import {createTaskService, updateTaskService} from "./services/task.service";
    import TaskItems from "./components/TaskItems.svelte";


    let task = new Task()
    let isEdit = false;

    const handleSubmit = async (e) => {
        console.log(task)
        if (!isEdit) {
            await createTaskService(task)
        } else {
            await updateTaskService(task)
        }
        isEdit = false;
        task = new Task()
        console.log('submitted')
    }

    let showItems = true

    const setEdit = (taskEdit: Task) => {
        console.log('set edit', )
        task = taskEdit
        isEdit = true
    }
</script>

<main>
    <form on:submit|preventDefault={handleSubmit}>
        <label for="title">Title</label>
        <input bind:value={task.title} type="text" id="title">

        <label for="description">Description</label>
        <textarea bind:value={task.description} id="description"></textarea>

        <button type="submit">Save</button>
    </form>

    {#if showItems}
        <TaskItems  setEdit={setEdit}/>
    {/if}

    <button on:click={() => showItems = !showItems}>Ocultar items</button>
</main>

<style>
</style>
