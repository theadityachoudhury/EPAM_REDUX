export enum AuthorsActionTypes {
    SET_AUTHORS = 'SET_AUTHORS',
    ADD_AUTHOR = 'ADD_AUTHOR',
}

export interface Author {
    id: string;
    name: string;
}
