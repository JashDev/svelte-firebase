import {FirebaseService} from "../FirebaseLib/firebase.service";

export interface IPlayer {
    id: string;
    name: string;
    balance: number;
    isActive: boolean;
}

export class Player implements IPlayer {
    id: string;
    name: string;
    balance: number;
    isActive: boolean;
    firebaseService: FirebaseService;

    constructor({id = '', name = '', balance = 0, isActive = true}: IPlayer = {
        id: "",
        name: "",
        balance: 0,
        isActive: true
    }) {
        this.firebaseService = new FirebaseService('players');

        this.id = id;
        this.name = name;
        this.balance = balance;
        this.isActive = isActive;

    }

    async createPlayer() {
        // this.id = newPlayer.id;
        return await this.firebaseService.createInFirebaseService({
            name: this.name,
            balance: this.balance,
            isActive: this.isActive
        });
    }

    loadPlayers() {
        return this.firebaseService.getFromFirebaseService((snapshot) => {
            console.log('loadPlayers', snapshot);
        });
    }

    async chargeLap() {
        this.balance += 200;
        await this.firebaseService.updateFromFirebaseService({
            id: this.id, instance: {
                balance: this.balance
            }
        })
        return this;
    }

    async chargeFromBank({amount}: { amount: number }) {
        this.balance += amount;
        await this.firebaseService.updateFromFirebaseService({
            id: this.id, instance: {
                balance: this.balance
            }
        })
        return this;
    }

    async payToBank({amount}: { amount: number }) {
        this.balance -= amount;
        await this.firebaseService.updateFromFirebaseService({
            id: this.id, instance: {
                balance: this.balance
            }
        })
        return this;
    }

    async payToPlayer({idWhoReceive, amount, players}: { idWhoReceive: string, amount: number, players: Player[] }) {
        const playerWhoReceive = players.find(player => player.id === idWhoReceive);
        this.balance -= amount;
        playerWhoReceive.balance += amount;
        await this.firebaseService.updateFromFirebaseService({
            id: this.id, instance: {
                name: this.name,
                balance: this.balance,
                isActive: this.isActive
            }
        })
        await this.firebaseService.updateFromFirebaseService({
            id: playerWhoReceive.id, instance: {
                name: playerWhoReceive.name,
                balance: playerWhoReceive.balance,
                isActive: playerWhoReceive.isActive
            }
        })
    }

    deletePlayer() {
        return new Promise((resolve, reject) => {
            this.firebaseService.deleteFromFirebaseService(this.id).then(() => {
                resolve(true);
            }).catch(() => {
                reject();
            })
        })
    }
}
