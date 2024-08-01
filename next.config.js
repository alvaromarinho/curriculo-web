/** @type {import('next').NextConfig} */

module.exports = {
    reactStrictMode: true,
    env: {
        // API_URL: 'https://api.alvaromarinho.com.br/curriculo',
        API_URL: 'http://localhost:3001/curriculo',
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
}
