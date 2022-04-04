<script lang="ts">
    import {destroySession, freeStopInstance, session} from "../../store";
    import {Player} from "../../types/Player";
    import {FreeStop} from "../../types/FreeStop";

    export let myPlayer: Player
    export let players: Player[]

    $: gameStarted = players?.length > 1

    let userID: string | null
    const unsubscribeSession = session.subscribe(value => {
        userID = value.userID
    })

    let freeStop: FreeStop
    const unsubscribeFreeStop = freeStopInstance.subscribe(value => {
        freeStop = value
    })

    const logout = async () => {
        try {
            const myPlayer = players.find(player => player.id === userID)
            await myPlayer.deletePlayer()
            destroySession()
        } catch (e) {
            console.error(e)
        }
    }

    let amountToBank = 0
    const payToBank = async () => {
        await myPlayer.payToBank({amount: amountToBank})
        amountToBank = 0
    }

    let amountToFreeStop = 0
    const payToFreeStop = async () => {
        await myPlayer.payToBank({amount: amountToFreeStop})
        await freeStop.updateFreeStop(amountToFreeStop)
    }

</script>

<p>
    {userID}
</p>

<div>
    {myPlayer?.name || ''}
</div>
<div>
    Saldo: {myPlayer?.balance || ''}
</div>

<div>
    <input type="number" bind:value={amountToBank}>
    <button on:click={payToBank} disabled={!gameStarted}>Depositar a banco</button>
</div>

<div>
    <input type="number" bind:value={amountToFreeStop}>
    <button on:click={payToFreeStop} disabled={!gameStarted}>Depositar a parada libre</button>
</div>

<button on:click={logout}>Finalizar</button>
