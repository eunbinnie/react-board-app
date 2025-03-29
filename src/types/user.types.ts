// 로그인한 유저 정보
export interface User {
  id: string;
  email: string;
}

// 로그인 상태
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
