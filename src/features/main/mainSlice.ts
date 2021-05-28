//  ======================================== IMPORTS
import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter
} from '@reduxjs/toolkit';
import { fetchCharacters } from 'api';
import { RootState } from 'reducers';
import { CharacterAPIResponse, CharacterGender, CharacterStatus, MainState, ReducerPayload } from 'types';
import { ThunkReturnValue, ThunkAPIReturnValue } from 'types';

//  ======================================== ENTITIES
export const mainAdapter = createEntityAdapter<any>({
	selectId: (character) => character.id,
	sortComparer: (a, b) => a.name.localeCompare(b.name || '')
});
//  ======================================== THUNKS
export const getCharacters = createAsyncThunk<
	ThunkReturnValue<CharacterAPIResponse>,
	void,
	ThunkAPIReturnValue
>('main/getCharacters', async (_, thunkAPI) => {
	const { filters, currentPage } = thunkAPI.getState().main;
	try {
		const { info, results } = await fetchCharacters({
			page: currentPage,
			...filters
		});
		return { data: { info, results }, error: null, success: true };
	} catch (error) {
		console.error(error);
		return {
			error: 'Something went wrong with our server',
			success: false
		};
	}
});
//  ======================================== INITIAL STATE

const initialState = mainAdapter.getInitialState({
	asyncError: null,
	asyncStatus: 'idle',
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
        genderFilterSet: (state, { payload }: ReducerPayload<CharacterGender>) => {
            state.filters.gender = payload;
        },
        nameFilterSet: (state, { payload }: ReducerPayload<string>) => {
            state.filters.name = payload;
		},
        pagesSet: (state, { payload }: ReducerPayload<number>) => {
            state.pages = payload;
        },
        statusFilterSet: (state, { payload }: ReducerPayload<CharacterStatus>) => {
			state.filters.status = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getCharacters.pending, (state) => {
			state.asyncStatus = 'pending';
		});
		builder.addCase(
			getCharacters.fulfilled,
			(state, { payload: { data, error, success } }) => {
				if (success && data) {
					state.asyncStatus = 'fulfilled';
					state.pages = data.info.pages;
					mainAdapter.setAll(state, data.results);
				} else if (error) {
					state.asyncStatus = 'rejected';
					state.asyncError = error;
				}
			}
		);
		builder.addCase(getCharacters.rejected, (state) => {
			state.asyncStatus = 'rejected';
		});
	}
});

//  ======================================== EXPORTS
export const {
	currentPageSet,
	genderFilterSet,
	nameFilterSet,
	pagesSet,
	statusFilterSet
} = main.actions;

const selectors = mainAdapter.getSelectors();

export const selectAsyncStatus = ({ main }: RootState) => main.asyncStatus;
export const selectCurrentPage = ({ main }: RootState) => main.currentPage;
export const selectPages = ({ main }: RootState) => main.pages;
export const selectFilters = ({ main }: RootState) => main.filters;

// export const selectCharacterEntities = ({ main }: RootState) =>
// selectors.selectEntities(main);
// export const selectCharacterIds = ({main}: RootState) => selectors.selectIds(main)
export const selectCharacters = ({ main }: RootState) =>
	selectors.selectAll(main);

//  ======================================== EXPORT DEFAULT
export default main.reducer;
//  ========================================
