/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DATABASE_URL: "postgres://default:Uzhw3lDK1OtM@ep-muddy-grass-a7uwclke.ap-southeast-2.aws.neon.tech:5432/verceldb?sslmode=require"
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
