import instance from './helpers/axios';


export const getCourses = async () => {
    try {
        const response = await instance.get(`/courses/all`);
        return response.data.result;
    } catch (error) {
        return [];
    }
};

export const getAuthors = async () => {
    try {
        const response = await instance.get(`/authors/all`);
        return response.data.result;
    } catch (error) {
        return [];
    }
};

export const loginUser = async (credentials: { email: string; password: string }) => {
    const response = await instance.post(`/login`, credentials);
    return response.data;
};
