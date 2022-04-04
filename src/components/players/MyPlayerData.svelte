<script lang="ts">
    import {destroySession, session} from "../../store";
    import {Player} from "../../types/Player";

    export let myPlayer: Player
    export let players: Player[]

    $: gameStarted = players?.length > 1

    let userID: string | null
    const unsubscribeSession = session.subscribe(value => {
        userID = value.userID
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

<button on:click={logout}>Finalizar</button>
