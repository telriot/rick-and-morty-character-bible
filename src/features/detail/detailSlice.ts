//  ======================================== IMPORTS
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCharacterById } from 'api';
import { RootState } from 'reducers';
import { DetailState, ThunkReturnValue, ThunkAPIReturnValue } from 'types';

//  ======================================== THUNKS
export const getCharacterDetail = createAsyncThunk<
	ThunkReturnValue<any>,
	string,
	ThunkAPIReturnValue
>('detail/getCharacterDetail', async (id, thunkAPI) => {
	try {
		const { character, episodes } = await fetchCharacterById(id);
		return { data: { character, episodes }, error: null, success: true };
	} catch (error) {
		console.error(error);
		return {
			error: 'Something went wrong with our server',
			success: false
		};
	}
});
//  ======================================== INITIAL STATE

const initialState = {
	asyncError: null,
	asyncStatus: 'idle',
	character: null,
	episodes: null
} as DetailState;

//  ======================================== SLICES
const detail = createSlice({
	name: 'detail',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCharacterDetail.pending, (state) => {
			state.asyncStatus = 'pending';
		});
		builder.addCase(
			getCharacterDetail.fulfilled,
			(state, { payload: { data, error, success } }) => {
				if (success && data) {
					state.asyncStatus = 'fulfilled';
					state.character = data.character;
					state.episodes = data.episodes;
				} else {
					state.asyncStatus = 'rejected';
					state.asyncError = error;
				}
			}
		);
		builder.addCase(getCharacterDetail.rejected, (state) => {
			state.asyncStatus = 'rejected';
			state.asyncError = 'Something went wrong with our servers'
		});
	}
});

//  ======================================== EXPORTS
export const {} = detail.actions;

export const selectAsyncError = ({ detail }: RootState) => detail.asyncError;
export const selectAsyncStatus = ({ detail }: RootState) => detail.asyncStatus;
export const selectCharacter = ({ detail }: RootState) => detail.character;
export const selectEpisodes = ({ detail }: RootState) => detail.episodes;

//  ======================================== EXPORT DEFAULT
export default detail.reducer;
//  ========================================
