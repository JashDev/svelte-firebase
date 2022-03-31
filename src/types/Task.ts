export interface ITask {
    id: string;
    title: string;
    description: string;
}

export class Task implements ITask {
    id: string;
    title: string;
    description: string;

    constructor({
                    id ,
                    title ,
                    description
                }: ITask = {
                    id: '',
                    title: '',
                    description: ''
                }) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
}
