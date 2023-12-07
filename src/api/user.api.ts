import axios from 'axios';

const port = 8000;
const userUrl = `http://localhost:${port}/user`;

export const userSignIn = axios.create({
	baseURL: `${userUrl}/signIn`,
});

export const userSignUp = axios.create({
	baseURL: `${userUrl}/signUp`,
});

export const userSignOut = axios.create({
	baseURL: `${userUrl}/signOut`,
});

export const userSignInConfirmRole = axios.create({
	baseURL: `${userUrl}/confirmRole`,
});
