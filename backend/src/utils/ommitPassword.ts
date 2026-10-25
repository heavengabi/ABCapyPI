import { User } from "../models/User";

export function ommitPassword(user: User){
    const {password, ...rest} = user
    return rest
}