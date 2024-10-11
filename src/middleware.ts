import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { match } from 'path-to-regexp';

// 경로 일치 확인!
function isMatch(pathname: string, urls: string[]) {
  return urls.some((url) => !!match(url)(pathname));
}

// 인증이 필요한 경로
const matchersForAuth: string[] = [];

const matchersForSignIn = ['/login', '/join'];

// 미들웨어로 인증 상태 확인
export async function middleware(request: NextRequest) {
  // const token = request.cookies.get('auth-token'); // 예시로 토큰을 쿠키에서 가져오는 방식
  // console.log('request', token);

  // // 토큰이 없으면 로그인 페이지로 리다이렉트
  // if (!token) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // 인증이 필요한 페이지 접근 제어
  if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
    return (await getSession()) // 세션 정보 확인
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/login', request.url));
  }

  // 인증 후 회원가입, 로그인 페이지 접근 제어
  if (isMatch(request.nextUrl.pathname, matchersForSignIn)) {
    return (await getSession()) // 세션 정보 확인
      ? NextResponse.redirect(new URL('/', request.url))
      : NextResponse.next();
  }

  return NextResponse.next();
}

// 미들웨어 적용 경로
export const config = {
  matcher: ['/'],
};
