//  ======================================== IMPORTS
import { combineReducers } from "@reduxjs/toolkit"
import detail from 'features/detail/detailSlice'
import main from 'features/main/mainSlice'
//  ========================================

const Reducers = combineReducers
({
    detail,
    main
});

//  ======================================== EXPORTS
export type RootState = ReturnType<typeof Reducers>
export default Reducers;
//  ========================================
