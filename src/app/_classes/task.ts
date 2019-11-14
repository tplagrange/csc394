import { TaskDetails } from "../_services/"
import { User } from "./user";

export class Task {
    _id: number;
    assignedTo: User;
    description: string;
    status: string;
    reviewedBy: User;
    dueDate: string;
    rating: string;

    constructor(td:TaskDetails) {
        this._id = td._id;
        this.assignedTo = td.assignedTo;
        this.description = td.description;
        this.status = td.status;
        this.reviewedBy = td.reviewedBy;
        this.dueDate = td.dueDate.toString();
        this.rating = td.rating;
    }
}
