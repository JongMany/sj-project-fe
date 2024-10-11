import NextAuth from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';

import Credentials from 'next-auth/providers/credentials';
import { signOut as authSignOut } from 'next-auth/react';
// https://geuni620.github.io/blog/2024/1/17/authorization/
// https://velog.io/@dosomething/Next-Auth-%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%ED%86%A0%ED%81%B0-%EA%B0%B1%EC%8B%A0-%EB%B0%8F-%EC%9E%90%EB%8F%99-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84-feat.-iron-session
//https://cdragon.tistory.com/entry/Develog-%EA%B3%A8%EC%B9%98%EC%95%84%ED%94%88-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EB%B0%8F-%EC%9D%B8%EC%A6%9D-2-%EC%A0%81%EC%9A%A9-Next-authv5Authjs

const decodeJwt = (token: string) => {
  const base64Payload = token.split('.')[1];
  const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
  const decodedJWT = JSON.parse(
    decodeURIComponent(
      Buffer.from(base64, 'base64')
        .toString('binary')
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    ),
  );

  return decodedJWT;
};

const refreshAccessToken = async (token: JWT) => {
  try {
    const response = await fetch('http://localhost:8080/api/auth/refresh', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.refreshToken}`,
        'Content-Type': 'application/json',
      },
    });
    const data: { accessToken: string } = await response.json();

    return data.accessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null; // 갱신 실패 시 null 반환
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          });
          const data = await response.json();

          if (data.success) {
            const decodedJwt = decodeJwt(data.token.accessToken);
            // user 정보를 반환 (jwt callback으로 전달)
            return {
              accessToken: data.token.accessToken,
              refreshToken: data.token.refreshToken,
              accessTokenExpires: decodedJwt.exp,
              group: data.group,
              name: data.name,
              email: data.email,
            };
          } else {
            throw new Error('로그인이 실패했습니다.');
          }
        } catch (error) {
          console.error('Error authorizing credentials:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
  pages: {
    signIn: '/login',
    newUser: '/join',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      // jwt 생성과 검증을 커스터마이징 + 조작 (useSession, getSession 등을 호출할 때마다 실행된다.)
      if (user) {
        console.log('user', user);
        // user가 있다는 것은 -> 첫 로그인일 경우다
        token.accessToken = user.accessToken;
        token.accessTokenExpires = user.accessTokenExpires;
        token.refreshToken = user.refreshToken;
        token.group = user.group;
        token.email = user.email;
        token.name = user.name;
      }

      // user가 없다는 것은 -> 이미 로그인한 사용자다
      const isStaleToken =
        token.accessTokenExpires <= Math.floor(new Date().getTime() / 1000);

      if (isStaleToken) {
        const newAccessToken = await refreshAccessToken(token);
        if (!newAccessToken) {
          authSignOut();
          return null;
        }
        const decodedJwt = decodeJwt(newAccessToken);
        token.accessToken = newAccessToken;
        token.accessTokenExpires = decodedJwt.exp;
        // return {
        //   ...token,
        //   accessToken: newAccessToken,
        //   accessTokenExpires: decodedJwt.exp,
        // };
      }
      // if (trigger === 'update' && session) {
      //   // updateSession 서버액션 호출시 발동
      //   Object.assign(token, session.user);
      //   token.picture = session.user.picture; // 사진 변경 시 반영
      // }
      // 수정된 토큰 객체 반환 (반환값은 쿠키에 저장)
      return token;
    },
    session: async ({ session, token }) => {
      // 사용자 세션 객체를 커스터마이징 + 조작 (session 관련 action 시 호출되는 callback)
      // if (token?.accessToken) {
      //   session.accessToken = token.accessToken;
      // }
      session.user = token as unknown as AdapterUser;
      console.log('session', session, 'token', token);
      // console.log('session', session, 'token', token);
      return session; // 수정된 세션 객체 반환 (useSession으로 접근)
    },
  },
});
