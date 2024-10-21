import dotenv from "dotenv";
import path from 'path';

/** @type {import('next').NextConfig} */
const env = process.env.NODE_ENV || 'development';
// 해당하는 .env 파일 경로를 설정합니다.
const envFilePath = path.resolve(`./.env.${env}`);

dotenv.config({ path: envFilePath });

const nextConfig = {};
console.log(
    'env',
    process.env.NEXT_AUTH_URL,
    process.env.NEXTAUTH_URL,
    process.env.NEXT_PUBLIC_API_URL
);

export default nextConfig;
