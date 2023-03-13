/** @type {import('next').NextConfig} */
const SPCDE_KEY = process.env.NEXT_PUBLIC_SPCDE_KEY;

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/spcdeInfoService/:path', //api request path
        destination:
          // `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getAnniversaryInfo?serviceKey=${SPCDE_KEY}&solYear=$1&pageNo=$2&numOfRows=3`, //목적 path
          `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=$1&solYear=$2`, //목적 path
      },
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
