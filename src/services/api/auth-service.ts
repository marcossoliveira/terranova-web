import { postData } from './api-service';


export interface UserSettings {
    settings: Array<{ value: string; key: string }>;
    version: number;
}

export interface UserPayload {
    ai: number;
    last_name: string;
    unique_id: string;
    mojang_id: string;
    bedrock_id: string | null;
    last_ip: string;
    creation_date: string;
    email: string | null;
    discord: string | null;
    settings: UserSettings;
    rowid: number;
    time: number;
    user: string;
    uuid: string;
}

export interface AuthResponse {
    payload: UserPayload;
    access_token: string;
}


export async function login(
  username: string,
  password: string,
): Promise<AuthResponse> {
  try {
    const response = await postData('/auth/player/login', { username, password });
    return response;
  } catch (error) {
    throw new Error('Login failed');
  }
}
