import {writable} from 'svelte/store'
import type {Player} from "../types/Player";

export const session = writable({
    userID: null,
})

export const playersStore = writable<Player[]>([])

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
