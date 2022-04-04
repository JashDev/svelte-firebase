<script lang="ts">
    import {Player} from "../../types/Player";
    import {playersStore, session} from "../../store"
    import {onDestroy} from "svelte";

    export let player: Player

    let userID: string | null
    const unsuscribe = session.subscribe((value) => {
        userID = value.userID
    })

    let players: Player[] = []
    const unsubscribePlayers = playersStore.subscribe((value) => {
        players = value
    })

    const chargePlayerLap = async () => {
        try {
            await player.chargeLap()
        } catch (error) {
            console.error(error)
        }
    }

    let amountToPay = 0
    const payToPlayer = async () => {
        const myPlayer = players.find((p) => p.id === userID)
        await myPlayer.payToPlayer({
            players,
            idWhoReceive: player.id,
            amount: amountToPay
        })
        amountToPay = 0
    }

    let amountFromBank = 0
    const depositFromBank = async () => {
        await player.chargeFromBank({amount: amountFromBank})
        amountFromBank = 0
    }

    onDestroy(() => {
        unsuscribe()
        unsubscribePlayers()
    })


</script>

<div class="CardMain">
    {#if player.id === userID}
        <div>Este eres tú xD</div>
    {/if}
    <div>
        {player.id}
    </div>
    <div>
        {player.name}
    </div>
    <div>
        {player.balance}
    </div>

    {#if player.id !== userID}
        <div>
            <button on:click={chargePlayerLap}>Cargar vuelta</button>
        </div>

        <div>
            <input type="number" bind:value={amountToPay}>
            <button on:click={payToPlayer}>Pagar</button>
        </div>

        <div>
            <input type="number" bind:value={amountFromBank}>
            <button on:click={depositFromBank}>Depositar de banco</button>
        </div>
    {/if}
</div>

<style>
    .CardMain {
        border: 1px solid black;
        padding: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
