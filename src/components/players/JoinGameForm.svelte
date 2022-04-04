<script lang="ts">
    import {session, setMyPlayer, setSession} from "../../store";
    import {Player} from "../../types/Player";
    import {onDestroy} from "svelte";

    let userID: string | null
    const unsubscribeSession = session.subscribe(value => {
        userID = value.userID
    })

    let player = new Player()
    const joinGame = async () => {
        if (userID) {
            alert('You are already logged in')
            return
        }

        if (player.name.length < 3) {
            alert('Please enter a valid name')
            return
        }
        try {
            player.balance = 1500
            const res = await player.createPlayer()
            setSession(res.id)
            player.id = res.id
            setMyPlayer(player)

            player = new Player()
        } catch (e) {
            console.error(e)
            alert('No se pudo crear el jugador')
        }
    }

    onDestroy(() => {
        unsubscribeSession()
    })
</script>
<form on:submit|preventDefault={joinGame}>
    <label for="name">Tu nombre</label>
    <input type="text" id="name" bind:value={player.name}/>

    <button type="submit">Jugar</button>
</form>
