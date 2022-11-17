import { createAction, props } from '@ngrx/store';

export const logInIfRemembered = createAction(
  '[Login] Log In If Remembered'
);


export const logInSuccess = createAction(
  '[Login] Logged In Succssfully', props<{ email: string }>()
);

export const logInFailure = createAction(
  '[Login] Log In Failure'
);

export const saveLoginData = createAction(
  '[Login] Save Data'
);
