import { TaskDetails } from "../_services/"

export class Task {
    _id: number;
    assignedTo: number;
    description: string;
    status: string;
    reviewedBy: number;
    dueDate: string;
    rating: string;

    constructor(td:TaskDetails) {
        this._id = td._id;
        this.assignedTo = td.assignedTo;
        this.description = td.description;
        this.status = td.status;
        this.reviewedBy = td.reviewedBy;
        this.dueDate = td.dueDate;
        this.rating = td.rating;
    }
}
