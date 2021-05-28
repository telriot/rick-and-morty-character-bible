//  ======================================== IMPORTS
import { combineReducers } from "@reduxjs/toolkit"
import main from 'features/main/mainSlice'
//  ========================================

const Reducers = combineReducers
({
    main
});

//  ======================================== EXPORTS
export type RootState = ReturnType<typeof Reducers>
export default Reducers;
//  ========================================
