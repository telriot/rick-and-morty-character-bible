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
export interface MainState {
	asyncStatus: AsyncStatus
	asyncError: string | null
	currentPage: number
	filters: CharactersSearchFilters
	pages: number
}

export type CharacterData = {
    id: number
    name: string
    status: CharacterStatus
	species: string
	type: string
	gender: CharacterGender
	origin: object
	location: object
	image: string
	episode: string[]
	url: string
	created: string
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