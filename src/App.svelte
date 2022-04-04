<script lang="ts">
    import PlayerList from "./components/players/PlayerList.svelte";
    import {session, setSession, playersStore} from "./store"
    import {Player} from "./types/Player";
    import {onDestroy} from "svelte";
    import JoinGameForm from "./components/players/JoinGameForm.svelte";
    import MyPlayerData from "./components/players/MyPlayerData.svelte";

    let userID = localStorage.getItem('userID')
    if (userID) {
        setSession(JSON.parse(userID))
    }
    const unsubscribeSession = session.subscribe(value => {
        userID = value.userID
    })

    let players: Player[] = []
    let myPlayer: Player | null = null
    const unsubscribePlayers = playersStore.subscribe((value) => {
        players = value
        myPlayer = value.find(player => player.id === userID)
    })

    onDestroy(async () => {
        unsubscribeSession()
        unsubscribePlayers()
    })
</script>

<main>
    {#if !userID}
        <JoinGameForm/>
    {:else}
        <MyPlayerData myPlayer={myPlayer} players={players}/>

        <PlayerList/>
    {/if}
</main>

<style>
</style>
