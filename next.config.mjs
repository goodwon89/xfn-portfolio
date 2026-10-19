/** GitHub Pages 프로젝트 사이트는 /<repo> 하위 경로에서 서비스되므로 basePath를 환경변수로 받는다. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
