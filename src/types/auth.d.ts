export declare module 'next-auth' {
  interface User {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    group: 'A' | 'B' | 'C' | 'D';
  }
  interface Session {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    group: 'A' | 'B' | 'C' | 'D';
  }
}
export declare module '@auth/core/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    group: 'A' | 'B' | 'C' | 'D';
  }
}
