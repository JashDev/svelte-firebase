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
    const playersFirebaseInstance = new FirebaseService("players");

    const sp = (snapshot) => {
        let p = []
        snapshot.docs.forEach(doc => {
            const newPlayer = new Player({
                id: doc.id,
                name: doc.data().name,
                balance: doc.data().balance,
                isActive: true
            });
            p = [...p, newPlayer];
            setPlayers(p)
        })
    }

    let myPlayer = new Player()
    const unsubscribe = playersStore.subscribe((value) => {
        myPlayer = value.find(player => player.id === userID)
        players = value.filter(player => player.id !== userID)
    })

    let unsub = playersFirebaseInstance.getFromFirebaseService(sp)

    onDestroy(() => {
        unsub()
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
