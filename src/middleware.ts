import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 미들웨어로 인증 상태 확인
export function middleware(request: NextRequest) {
  // const token = request.cookies.get('auth-token'); // 예시로 토큰을 쿠키에서 가져오는 방식
  // console.log('request', token);

  // // 토큰이 없으면 로그인 페이지로 리다이렉트
  // if (!token) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // 인증된 사용자는 인덱스 페이지로 이동
  return NextResponse.next();
}

// 미들웨어 적용 경로
export const config = {
  matcher: ['/'],
};
