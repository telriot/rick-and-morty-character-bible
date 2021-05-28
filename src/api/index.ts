//  ======================================== IMPORTS
import axios from 'axios'
import {CharacterAPIResponse, FetchCharactersPayload} from 'types'
//  ======================================== API CALLS
const CHARACTER_URL = 'https://rickandmortyapi.com/api/character'

export const fetchCharacters = async (queryParams: FetchCharactersPayload) => {
    
    try {
        const response = await axios.get(`${CHARACTER_URL}`, {params: queryParams})
        console.log(response)
        const {info, results} = response.data as CharacterAPIResponse
        return {info, results}
    }
    catch(error) {
        console.error(error)
        throw new Error(error)
    }
}