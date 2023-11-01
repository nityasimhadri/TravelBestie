// users-dao.js

import axios from 'axios';

const SERVER_API_URL = 'http://localhost:4000/api';
const USER_DB_API = `${SERVER_API_URL}/users`;

export const setUserInterests = async (uid, interests) => {
    const response = await axios.put(`${USER_DB_API}/intrests/${uid}`, interests);
    return response.data;
}

export const sendFriendRequest = async (uid, fid) => {
    const response = await axios.put(`${USER_DB_API}/sendRequest/${uid}/${fid}`);
    return response.data;
}

export const acceptFriendRequest = async (uid, fid) => {
    const response = await axios.put(`${USER_DB_API}/acceptRequest/${uid}/${fid}`);
    return response.data;
}

export const declineFriendRequest = async (uid, fid) => {
    const response = await axios.put(`${USER_DB_API}/declineRequest/${uid}/${fid}`);
    return response.data;
}

export const removeFriend = async (uid, fid) => {
    const response = await axios.delete(`${USER_DB_API}/removeFriend/${uid}/${fid}`);
    return response.data;
}

export const findUser = async () => {
    const response = await axios.get(USER_DB_API);
    return response.data;
}

export const findUserById = async (uid) => {
    const response = await axios.get(`${USER_DB_API}/${uid}`);
    return response.data;
}

export const findUserByUsername = async (username) => {
    const response = await axios.get(`${USER_DB_API}/name/${username}`);
    return response.data;
}

export const createUser = async (user) => {
    try {
        const response = await axios.post(USER_DB_API, user);
        console.log("createUser");
        console.log(user);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error in createUser:", error);
    }
}

export const deleteUsers = async (uid) => {
    const response = await axios.delete(`${USER_DB_API}/${uid}`);
    return response.data;
}

export const updateUser = async (uid, userUpdates) => {
    const response = await axios.put(`${USER_DB_API}/${uid}`, userUpdates);
    return response.data;
}

export const getQuizAnswers = async (uid) => {
    const response = await axios.get(`${USER_DB_API}/${uid}/quiz`);
    return response.data;
}

export const setQuizAnswers = async (uid, quizAnswers) => {
        console.log(`${USER_DB_API}/${uid}/quiz`)
    const response = await axios.put(`${USER_DB_API}/${uid}/quiz`, quizAnswers);

    return response.data;
}
