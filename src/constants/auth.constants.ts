export const SIGN_UP_ERROR_MESSAGE: Record<string, string> = {
  'User already registered': '이미 가입된 이메일입니다.',
  'Invalid email': '유효하지 않은 이메일 형식입니다.',
  'Password should be at least 8 characters':
    '비밀번호는 최소 8자 이상이어야 합니다.',
  'Signup requires a valid password': '비밀번호를 입력해주세요.',
  'Signup requires a valid email': '이메일을 입력해주세요.',
  'Network error': '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.',
  Unauthorized: '인증되지 않았습니다. 다시 로그인해주세요.',
  default: '문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
};

export const LOGIN_ERROR_MESSAGE: Record<string, string> = {
  'Invalid login credentials': '이메일 또는 비밀번호가 올바르지 않습니다.',
  'Email not confirmed': '이메일 인증이 완료되지 않았습니다.',
  'User not found': '존재하지 않는 계정입니다.',
  'Invalid token': '유효하지 않은 토큰입니다. 다시 로그인해주세요.',
  'Token has expired or is invalid': '토큰이 만료되었거나 유효하지 않습니다.',
  'Network error': '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.',
  Unauthorized: '인증되지 않았습니다. 다시 로그인해주세요.',
  default: '문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
};
