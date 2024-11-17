import { auth } from '@/auth';
import { userType } from '@/constants/user/user-type';
// import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { match } from 'path-to-regexp';

// 경로 일치 확인!
function isMatch(pathname: string, urls: string[]) {
  return urls.some((url) => !!match(url)(pathname));
}

// 인증이 필요한 경로
const matchersForAuth: string[] = ['/', '/chat', '/chat/general'];

const matchersForSignIn = ['/login', '/join'];

const matchersForCheckUserType = ['/chat/create'];

// 미들웨어로 인증 상태 확인
export async function middleware(request: NextRequest) {
  const session = await auth();

  const isAdmin = request.cookies.get('isAdmin')?.value === 'true';
  console.log('isAdmin', isAdmin);
  if (!isAdmin && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', request.url));
  } else if (isAdmin && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // 사용자 타입 확인
  if (isMatch(request.nextUrl.pathname, matchersForCheckUserType)) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    const group = session.user?.group as keyof typeof userType;

    if (userType[group].canSelect) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/chat/general', request.url));
    }
  }

  // 인증이 필요한 페이지 접근 제어
  if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
    return session // 세션 정보 확인
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/login', request.url));
  }

  // 인증 후 회원가입, 로그인 페이지 접근 제어
  if (isMatch(request.nextUrl.pathname, matchersForSignIn)) {
    return session // 세션 정보 확인
      ? NextResponse.redirect(new URL('/', request.url))
      : NextResponse.next();
  }

  return NextResponse.next();
}

// 미들웨어 적용 경로
export const config = {
  // matcher: [...matchersForAuth, ...matchersForSignIn],
  '/': true,
  '/login': true,
  '/join': true,
  '/chat': true,
  '/chat/create': true,
  '/chat/*': true,
};
