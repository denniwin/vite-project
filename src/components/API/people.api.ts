import axios from "axios";
import { ApiResponse } from "../models/api-response";
import { People } from "../models/People";

export const GetPeople = async ():Promise<People[]> => {
    const response = await axios.get<ApiResponse<People>>("https://swapi.dev/api/people/");
    return response.data.results;
}