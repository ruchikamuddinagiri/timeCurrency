export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  photoUrl: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}
export interface TodoProps {
  todo?: ITodo;
}
export type ApiDataType = {
  message: string;
  status: string;
  todos: string[];
  todo?: string;
};
export interface ApiResponse {
  data: any;
  status: string;
  message: string;
}

export interface LoginResponse {
  status: string;
  accessToken: string;
}
export interface UserResponse {
  status: string;
  data: {
    user: User;
  };
}
export interface TasksResponse {
  status: string;
  accessToken: string;
}
export interface ITodo extends Document {
  name: string;
  description: string;
  status: boolean;
}
