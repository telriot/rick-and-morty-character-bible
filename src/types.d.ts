import { RootState } from 'reducers';

//DATASET TYPES
export type CharacterGender = 'Female' | 'Male' | 'Genderless' |'unknown'
export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'
//PAYLOAD TYPES
export type FetchCharactersPayload = {
    page:number
} & CharactersSearchFilters
//REDUX STORE TYPES
export type AsyncStatus = 'idle' | 'fulfilled' | 'rejected' | 'pending';
export type ReducerPayload<T> = { payload: T };
export type ThunkAPIReturnValue = { state: RootState };
export type ThunkReturnValue<T = null> = {
	error: string | null;
	success: boolean;
	data?: T | null;
};

export type CharactersSearchFilters = {
	name: string
	status: CharacterStatus | null
	gender: CharacterGender | null
}
export interface SliceState {
	asyncStatus: AsyncStatus
	asyncError: string | null
}
export interface MainState extends SliceState {

	cache:Record<string, CharacterAPIResponse | null>
	currentPage: number
	filters: CharactersSearchFilters
	pages: number
}
export interface DetailState extends SliceState {
	character: CharacterData | null
	episodes: EpisodeData[] | null
}
export type GeographicalData =  {name:string, url:string}
export type CharacterData = {
    id: number
    name: string
    status: CharacterStatus
	species: string
	type: string
	gender: CharacterGender
	origin: GeographicalData
	location: GeographicalData
	image: string
	episode: string[]
	url: string
	created: string
}
export type EpisodeData = {
	air_date: string
	characters: string[]
	created: Date
	episode: string
	id: number
	name: string
	url: string
}
export type CharacterAPIResponse = {
    info:{
        count: number
        next: string | null
        pages: number
        prev: string | null
    },
    results: CharacterData[]
}

// OTHERS
type FilterOptions<T> = Array<T | null>;
