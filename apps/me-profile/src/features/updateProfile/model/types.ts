export interface User {
  id: number;
  username: string;
  description: string;
  email: string;
  reating: number;
}

export interface UserDto {
  email: string;
  username: string;
  description: string;
}
