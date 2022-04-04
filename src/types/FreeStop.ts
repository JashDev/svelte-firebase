import {FirebaseService} from "../FirebaseLib/firebase.service";

export interface IFreeStop {
    amount: number
}

export class FreeStop implements IFreeStop {
    public amount: number
    public id: string
    private firebaseService: FirebaseService;

    constructor(id = '', amount: number = 0) {
        this.firebaseService = new FirebaseService("freeStop");
        this.id = id
        this.amount = amount
    }

    async createFreeStop() {
        await this.firebaseService.createInFirebaseService({
            amount: 0
        });
    }

    async updateFreeStop(amount) {
        await this.firebaseService.updateFromFirebaseService({
            id: this.id,
            instance: {
                amount: this.amount + amount
            }
        });
    }
}
