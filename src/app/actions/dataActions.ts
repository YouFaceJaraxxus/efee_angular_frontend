import { createAction, props } from '@ngrx/store';

export const setData = createAction('[Counter Component] Data', props<{ newData: any[] }>());
export const setFetched = createAction('[Counter Component] Fetched', props<{ newFetched: boolean }>());

