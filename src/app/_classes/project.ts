import { ProjectDetails } from "../_services/"

export class Project {
    _id: string;
    name: string;

    constructor(pd:ProjectDetails) {
        this._id = pd._id;
        this.name = pd.name;
    }
}
