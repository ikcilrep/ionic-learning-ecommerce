import { autoLogInFailure, autoLogInSuccess, logInSuccess } from '../actions/login.actions';
import { reducer, initialState } from './login.reducer';

describe('Login Reducer', () => {
  const email = 'email@example.com';
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('autoLogInFailure', () => {
    it('should return not logged in status', () => {
      const result = reducer(initialState, autoLogInFailure());
      expect(result.isLoggedIn).toBeFalse();
    });

    it('should return loaded status', () => {
      const result = reducer(initialState, autoLogInFailure());
      expect(result.isLoaded).toBeTrue();
    });

    it('should return null email', () => {
      const result = reducer(initialState, autoLogInFailure());
      expect(result.email).toBeNull();
    });
  });

  describe('autoLogInSuccess', () => {
    it('should return logged in status', () => {
      const result = reducer(initialState, autoLogInSuccess({ email }));
      expect(result.isLoggedIn).toBeTrue();
    });

    it('should return loaded status', () => {
      const result = reducer(initialState, autoLogInSuccess({ email }));
      expect(result.isLoaded).toBeTrue();
    });

    it('should return the provided email', () => {
      const result = reducer(initialState, autoLogInSuccess({ email }));
      expect(result.email).toBe(email);
    });
  });

  describe('logInSuccess', () => {
    it('should return logged in status', () => {
      const result = reducer(initialState, logInSuccess({ email }));
      expect(result.isLoggedIn).toBeTrue();
    });

    it('should return loaded status', () => {
      const result = reducer(initialState, logInSuccess({ email }));
      expect(result.isLoaded).toBeTrue();
    });

    it('should return the provided email', () => {
      const result = reducer(initialState, autoLogInSuccess({ email }));
      expect(result.email).toBe(email);
    });
  });
});
