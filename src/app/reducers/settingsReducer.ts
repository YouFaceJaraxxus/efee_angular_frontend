import { createReducer, on } from '@ngrx/store';
import { toggleLanguage, toggleColor } from '../actions/settingsActions';


export const initialState = {
    color: 'green',
    language: 'latin'
};

const _settingsReducer = createReducer(
  initialState,
  on(toggleLanguage, (state, {language}) => ({...state,  language})),
  on(toggleColor, (state, {color}) => ({...state,  color}))
);

export function settingsReducer(state, action) {
  return _settingsReducer(state, action);
}
