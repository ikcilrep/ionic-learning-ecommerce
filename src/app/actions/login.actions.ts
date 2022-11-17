import { createAction, props } from '@ngrx/store';

export const logInIfRemembered = createAction(
  '[App Component] Log In If Remembered'
);


export const autoLogInSuccess = createAction(
  '[Storage Service] Auto Log In Success', props<{ email: string }>()
);

export const autoLogInFailure = createAction(
  '[Storage Service] Auto Log In Failure'
);

export const logInSuccess = createAction(
  '[Auth API] Log In Success', props<{ email: string }>()
);

export const saveLoginData = createAction(
  '[Login Page] Save Data'
);
