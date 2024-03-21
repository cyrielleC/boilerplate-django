import { createAction, props } from '@ngrx/store';

export const navigateAction = createAction('[Routing] Navigate', props<{route: string[]}>());