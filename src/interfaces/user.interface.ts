import { ERole } from '@/enum/role.enum.ts';
import { EUserStatus, EUserSubject } from '@/enum/user.enum.ts';

export interface IUser {
	id: number;
    phone: string | null;
    displayName: string;
	email: string | null;
    password: string | null;
	birthday: string | null;
	avatar: string | null;
	role: ERole;
    avgRating: number | null;
    ratingCount: number | null;
    lastPostition: string | null;
    identifyingNumber: number | null;
	status: EUserStatus;
	accessToken?: string | null;
	refreshToken?: string | null;
}

export interface IUserSignUpRequest {
	phone: string;
	displayName: string;
	birthday: string | null;
	password: string;
	role: ERole;
	subject: EUserSubject | null;
	identifyingNumber: number | null;
}

export interface IUserStateForm {
	firstName: string;
	lastName: string;
	phone: string;
	birthday: string | Date | null;
	password: string;
	passwordConfirm: string;
	role: ERole;
	subject: EUserSubject | null;
	identifyingNumber: number | null;
}

export interface IUserSignInRequest {
	phone: string;
	password: string;
	role: ERole | null;
}

export interface IUserState {
	user: IUser | IUser[];
	multiRoleSuccess: boolean;
}

export interface IUserSignInResponseData {
	success: boolean;
	payload: IUser;
}
export interface IUserSignUpResponseData {
	success: boolean;
}
export interface IUserSignUpResponse {
	data: IUserSignUpResponseData;
}
export interface IUserSignInResponse {
	data: IUserSignInResponseData;
}
export interface IStateUserSubject {
	subject: EUserSubject | null;
}
