//  ======================================== IMPORTS
import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter
} from '@reduxjs/toolkit';
import { fetchCharacters } from 'api';
import { RootState } from 'reducers';
import {
	CharacterAPIResponse,
	CharacterGender,
	CharacterStatus,
	MainState,
	ReducerPayload,
	ThunkReturnValue,
	ThunkAPIReturnValue
} from 'types';

//  ======================================== ENTITIES
export const mainAdapter = createEntityAdapter<any>({
	selectId: (character) => character.id,
	sortComparer: (a, b) => a.name.localeCompare(b.name || '')
});
//  ======================================== THUNKS
export const getCharacters = createAsyncThunk<
	ThunkReturnValue<{ response: CharacterAPIResponse | null; query: string }>,
	void,
	ThunkAPIReturnValue
>('main/getCharacters', async (_, thunkAPI) => {
	const { cache, currentPage, filters } = thunkAPI.getState().main;
	const filtersQuery = Object.values(filters)
		.sort()
		.toString()
		.toLowerCase()
		.replace(/[^a-zA-Z0-9]/g, '');
	const query = filtersQuery + currentPage;
	if (cache.hasOwnProperty(query))
		return {
			data: { response: cache[query], query: '' },
			error: null,
			success: true
		};

	try {
		const response = await fetchCharacters({
			page: currentPage,
			...filters
		});
		return { data: { response, query }, error: null, success: true };
	} catch (error) {
		const { status } = error.response;
		return {
			data: { response: null, query },
			error:
				status === 404 ? null : 'Something went wrong with our server',
			success: false
		};
	}
});
//  ======================================== INITIAL STATE

const initialState = mainAdapter.getInitialState({
	asyncError: null,
	asyncStatus: 'idle',
	cache: {},
	currentPage: 1,
	pages: 0,
	filters: {
		name: '',
		status: null,
		gender: null
	}
} as MainState);

//  ======================================== SLICES
const main = createSlice({
	name: 'main',
	initialState,
	reducers: {
		currentPageSet: (state, { payload }: ReducerPayload<number>) => {
			state.currentPage = payload;
		},
		genderFilterSet: (
			state,
			{ payload }: ReducerPayload<CharacterGender | null>
		) => {
			state.filters.gender = payload;
		},
		nameFilterSet: (state, { payload }: ReducerPayload<string>) => {
			state.filters.name = payload;
		},
		pagesSet: (state, { payload }: ReducerPayload<number>) => {
			state.pages = payload;
		},
		statusFilterSet: (
			state,
			{ payload }: ReducerPayload<CharacterStatus | null>
		) => {
			state.filters.status = payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getCharacters.pending, (state) => {
			state.asyncError = null;
			state.asyncStatus = 'pending';
		});
		builder.addCase(
			getCharacters.fulfilled,
			(state, { payload: { data, error, success } }) => {
				if (data?.query) {
					state.cache[data.query] = success ? data.response : null;
				}
				if (success && data && data.response) {
					const { pages } = data.response.info;
					state.asyncStatus = 'fulfilled';
					state.pages = pages;
					mainAdapter.setAll(state, data.response.results);
				} else {
					state.asyncStatus = 'rejected';
					state.asyncError = error;
					state.pages = 0;
					mainAdapter.setAll(state, []);
				}
			}
		);
		builder.addCase(getCharacters.rejected, (state) => {
			state.asyncStatus = 'rejected';
			state.asyncError = 'Something went wrong with our servers';
			state.pages = 0;
		});
	}
});
//  ======================================== ENTITY SELECTORS
const selectors = mainAdapter.getSelectors();

//  ======================================== EXPORTS
export const {
	currentPageSet,
	genderFilterSet,
	nameFilterSet,
	pagesSet,
	statusFilterSet
} = main.actions;

export const selectAsyncError = ({ main }: RootState) => main.asyncError;
export const selectAsyncStatus = ({ main }: RootState) => main.asyncStatus;
export const selectCharacters = ({ main }: RootState) =>
	selectors.selectAll(main);
export const selectCurrentPage = ({ main }: RootState) => main.currentPage;
export const selectFilters = ({ main }: RootState) => main.filters;
export const selectPages = ({ main }: RootState) => main.pages;

//  ======================================== EXPORT DEFAULT
export default main.reducer;
//  ========================================
