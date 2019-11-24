import { ProjectDetails, LightUser } from "../_services/"

export class Project {
    _id: string;
    name: string;
    users: LightUser[];

    constructor(pd:ProjectDetails) {
        this._id = pd._id;
        this.name = pd.name;
        this.users = pd.users;
    }
}
