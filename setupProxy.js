import { createProxyMiddleware } from 'http-proxy-middleware';
export default function (app) {
    app.use(
        '/api/v2',
        createProxyMiddleware({
            target: 'https://57fd-182-71-79-227.ngrok-free.app',
            changeOrigin: true,
        })
    );
};