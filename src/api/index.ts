//  ======================================== IMPORTS
import axios from 'axios'
import {CharacterAPIResponse, FetchCharactersPayload, CharacterData, EpisodeData} from 'types'
//  ======================================== API CALLS
const CHARACTER_API_URL = 'https://rickandmortyapi.com/api/character'

/**
 * 
 * @param queryParams the parameters to feed to the query
 * @returns information about the database and the character objects
 */
export const fetchCharacters = async (queryParams: FetchCharactersPayload) => {
        const response = await axios.get(`${CHARACTER_API_URL}`, {params: queryParams})
        const {info, results} = response.data as CharacterAPIResponse
        return {info, results}
}

/**
 * 
 * @param id the id of the character
 * @returns the character object and the objects of the first 5 episodes they starred in
 */
export const fetchCharacterById = async (id:string) => {
    
        const {data:character} : {data: CharacterData} = await axios.get(`${CHARACTER_API_URL}/${id}`)
        const {episode: episodeURLs} = character
        const episodeReq = episodeURLs.slice(0,5).map(URL => axios.get(URL).catch(err=> null))
        const episodeRes = await axios.all(episodeReq)
        const episodes = episodeRes.map(res => res?.data) as EpisodeData[]
        return {character, episodes}
}