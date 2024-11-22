import { loginSuccess, logout, UserState } from './reducer';

export const loginSuccessAction = (user: UserState) => loginSuccess(user);

export const logoutAction = () => logout();
