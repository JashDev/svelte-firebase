import {writable} from 'svelte/store'
import type {Player} from "../types/Player";
import type {FreeStop} from "../types/FreeStop";

export const session = writable({
    userID: null,
})

export const playersStore = writable<Player[]>([])

export const freeStopInstance = writable<FreeStop>(null)

export const myPlayerStore = writable<Player>(null)

export const setSession = (userID) => {
    localStorage.setItem('userID', JSON.stringify(userID))
    session.set({userID})
}

export const destroySession = () => {
    localStorage.clear()
    session.set({userID: null})
}

export const setPlayers = (p: Player[]) => {
    playersStore.set(p)
}

export const setFreeStopInstance = (freeStop) => {
    freeStopInstance.set(freeStop)
}

export const setMyPlayer = (player) => {
    myPlayerStore.set(player)
}
