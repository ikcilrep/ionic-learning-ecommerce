import { createAction, props } from '@ngrx/store';

export const logInIfRemembered = createAction(
  '[Login] Log In If Remembered'
);


export const logIn = createAction(
  '[Login] Log In', props<{ email: string }>()
);

export const saveLoginData = createAction(
  '[Login] Save Data'
);
