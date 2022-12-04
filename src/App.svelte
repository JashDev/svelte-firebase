<script lang="ts">
    import Swal from "sweetalert2";
    import PlayerList from "./components/players/PlayerList.svelte";
    import {
        session,
        setSession,
        playersStore,
        setPlayers,
        setFreeStopInstance,
        setMyPlayer,
        myPlayerStore
    } from "./store"
    import {Player} from "./types/Player";
    import {onDestroy} from "svelte";
    import JoinGameForm from "./components/players/JoinGameForm.svelte";
    import MyPlayerData from "./components/players/MyPlayerData.svelte";
    import {FirebaseService} from "./FirebaseLib/firebase.service";
    import {FreeStop} from "./types/FreeStop";

    let userID = localStorage.getItem('userID')
    if (userID) {
        setSession(JSON.parse(userID))
    }
    const unsubscribeSession = session.subscribe(value => {
        userID = value.userID
    })

    const playersFirebaseInstance = new FirebaseService("players");
    const sp = (snapshot) => {
        let p = []

        let playerWhoPay: Player
        let playerWhoReceive: Player
        let amountPay: number
        let amountReceive: number

        snapshot.docs.forEach(doc => {
            const newPlayer = new Player({
                id: doc.id,
                name: doc.data().name,
                balance: doc.data().balance,
                isActive: true
            });
            console.log(newPlayer.name, doc.data().lastAction)
            p = [...p, newPlayer];
            setPlayers(p)

            if (doc.data().lastAction === "pay") {
                playerWhoPay = newPlayer
                amountPay = doc.data().payAmount
            }

            if (doc.data().lastAction === "receive") {
                playerWhoReceive = newPlayer
                amountReceive = doc.data().receiveAmount
            }

        })

        if (playerWhoPay && playerWhoReceive) {
            if (playerWhoPay.id !== userID && playerWhoReceive.id !== userID) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${playerWhoPay.name} transfirió ${amountPay} a ${playerWhoReceive.name}`,
                    showConfirmButton: false,
                    timer: 2500
                });
            }

            if (playerWhoPay.id === userID) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `Transferiste ${amountPay} a ${playerWhoReceive.name}`,
                    showConfirmButton: false,
                    timer: 2500
                });
            }

            if (playerWhoReceive.id === userID) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${playerWhoPay.name} te transfirió ${amountReceive}`,
                    showConfirmButton: false,
                    timer: 2500
                });
            }
            playerWhoPay.remoteLastAction()
            playerWhoReceive.remoteLastAction()
        }
    }
    let unsub = playersFirebaseInstance.getFromFirebaseService(sp)

    const freeStopFirebaseInstance = new FirebaseService("freeStop");
    let freeStop = new FreeStop()
    const spFreeStop = (snapshot) => {
        let freeStopData = snapshot.docs[0]
        if (freeStopData) {
            freeStop.id = freeStopData.id
            freeStop.amount = freeStopData.data().amount
            setFreeStopInstance(freeStop)
        } else {
            freeStop.createFreeStop()
        }
    }
    const unsubFreeStop = freeStopFirebaseInstance.getFromFirebaseService(spFreeStop)

    let players: Player[] = []
    let myPlayer: Player | null = null
    const unsubscribePlayers = playersStore.subscribe((value) => {
        players = value
        myPlayer = value.find(player => player.id === userID)
        setMyPlayer(myPlayer)
    })

    const unsubscribeMyPlayer = myPlayerStore.subscribe((value) => {
        myPlayer = value
    })

    const depositFromFreeStop = async () => {
        console.log(freeStop.amount)
        await myPlayer.chargeFromBank({amount: freeStop.amount})
        await freeStop.updateFreeStop(freeStop.amount * -1)
    }

    onDestroy(async () => {
        unsubscribeSession()
        unsubscribePlayers()
        unsub()
        unsubFreeStop()
        unsubscribeMyPlayer()
    })
</script>

<main>
<!--    <Alertify />-->
    {#if !userID}
        <JoinGameForm/>
    {:else}
        <p>
            Parada libre: {freeStop.amount} - {freeStop.id}
        </p>
        <div>
            <button on:click={depositFromFreeStop}>Cobrar la parada libre 🎉</button>
        </div>

        <MyPlayerData myPlayer={myPlayer} players={players}/>

        <PlayerList/>
    {/if}
</main>

<style>
</style>
