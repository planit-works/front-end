/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/getPresignedUrl', //api request path
        destination:
          'https://3s3vzk36q5.execute-api.ap-northeast-2.amazonaws.com/s3/presigned-url', //목적 path
      },
      {
        source: '/upload-s3/:path*', //api request path
        destination:
          'https://side-project-fe.s3.ap-northeast-2.amazonaws.com/avatars/:path*', //목적 path
      },
    ];
  },
};

module.exports = nextConfig;
