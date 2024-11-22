import { Author } from "../store/authors/types"

export const getAuthorsname = (authors: string[], allAuthors: Author[]) => {
    //return a comma separated string of authors names
    return authors.map(authorId => allAuthors.find(author => author.id === authorId)?.name).join(', ')
}