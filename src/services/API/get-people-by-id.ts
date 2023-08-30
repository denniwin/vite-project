import axios from "axios"
import { People } from "../models/People"

export const getPeopleById = async (id: string):Promise<People> => {
    
    const res = await axios.get<People>(`https://swapi.dev/api/people/${id}/`)
    return res.data
}