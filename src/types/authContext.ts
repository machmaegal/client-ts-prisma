import { IUser } from './user';

export interface AuthContextType {
    isLoggedIn: boolean;
    isLoading: boolean;
    user: IUser;
    storeToken: (token: string) => void;
    authenticateUser: () => void;
    removeToken: () => void;
    logOutUser: () => void;
}