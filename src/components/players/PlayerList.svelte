<script lang="ts">
    import {Player} from "../../types/Player";
    import {onDestroy} from "svelte";
    import {FirebaseService} from "../../FirebaseLib/firebase.service";
    import PlayerCard from "./PlayerCard.svelte";
    import {playersStore, session, setPlayers} from "../../store"

    let userID: string | null
    const unsubscribeSession = session.subscribe(value => {
        userID = value.userID
    })

    let players: Player[] = []

    let myPlayer = new Player()
    const unsubscribe = playersStore.subscribe((value) => {
        myPlayer = value.find(player => player.id === userID)
        players = value.filter(player => player.id !== userID)
    })

    onDestroy(() => {
        unsubscribe()
    })
</script>

<main>
    <div>
        {#each players as player}
            <PlayerCard player={player}/>
        {/each}
    </div>
</main>
