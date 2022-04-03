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

    constructor({ id = '', name = '', balance = 0, isActive = true }: IPlayer) {
        this.firebaseService = new FirebaseService('players');

        this.id = id;
        this.name = name;
        this.balance = balance;
        this.isActive = isActive;

    }

    async createPlayer() {
        // this.id = newPlayer.id;
        return await this.firebaseService.createInFirebaseService({...this})
    }

    loadPlayers () {
        return this.firebaseService.getFromFirebaseService((snapshot) => {
            console.log('loadPlayers', snapshot);
        });
    }

   async chargeLap() {
        this.balance += 200;
        await this.firebaseService.updateFromFirebaseService({id: this.id, instance: {...this}})
        return this;
    }

    async chargeFromBank({amount}: {amount: number}) {
        this.balance += amount;
        await this.firebaseService.updateFromFirebaseService({id: this.id, instance: {...this}})
        return this;
    }

    async payToBank({amount}: {amount: number}) {
        this.balance -= amount;
        await this.firebaseService.updateFromFirebaseService({id: this.id, instance: {...this}})
        return this;
    }

    async payToPlayer({idWhoReceive, amount, players}: {idWhoReceive: string, amount: number, players: Player[]}) {
        const playerWhoReceive = players.find(player => player.id === idWhoReceive);
        this.balance -= amount;
        playerWhoReceive.balance += amount;
        await this.firebaseService.updateFromFirebaseService({id: this.id, instance: {...this}})
        await this.firebaseService.updateFromFirebaseService({id: playerWhoReceive.id, instance: {...playerWhoReceive}})
    }
}
