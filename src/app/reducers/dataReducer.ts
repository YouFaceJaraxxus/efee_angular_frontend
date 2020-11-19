import { createReducer, on } from '@ngrx/store';
import { setData,setFetched } from '../actions/dataActions';


export const initialState = {
    data: [
        {yearId: 1, data: []},
        {yearId: 2, data: []},
        {yearId: 3, data: []},
        {yearId: 4, data: []},
        {yearId: 20, data: []},
        {yearId: 30, data: []},
        {yearId: 21, data: []},
        {yearId: 102, data: []}
    ],
    fetched: false
};

const _dataReducer = createReducer(
  initialState,
  on(setData, (state, {newData}) => ({...state, data: newData})),
  on(setFetched, (state, {newFetched}) => ({...state, fetched: newFetched}))
);

export function dataReducer(state, action) {
  return _dataReducer(state, action);
}
