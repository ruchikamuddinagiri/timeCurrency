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

  export interface ApiResponse {
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
