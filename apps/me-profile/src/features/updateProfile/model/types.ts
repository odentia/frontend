export interface User {
  id: number;
  name: string;
  description: string;
  email: string;
  avatar_url: File;
  reating: number;
}

export interface UserDto {
  email: string;
  name: string;
  avatar_url: File;
  description: string;
}
