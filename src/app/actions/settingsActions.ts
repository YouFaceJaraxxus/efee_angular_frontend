import { createAction, props } from '@ngrx/store';

export const toggleLanguage = createAction('[Counter Component] Language', props<{ language: string }>());
export const toggleColor = createAction('[Counter Component] Color', props<{ color: string }>());
