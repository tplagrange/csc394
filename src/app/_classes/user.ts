import { UserDetails } from "../_services/"


export class User {
  _id: number;
  name: string;

  constructor(ud:UserDetails) {
      this._id = ud._id;
      this.name = ud.name;
  }
}
