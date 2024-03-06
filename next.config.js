/** @type {import('next').NextConfig} */

const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
}

module.exports = nextConfig

// module.exports = {
//   async headers() {
//     return [
//       {
//         // matching all API routes
//         source: "/api/:path*",
//         headers: [
//           { key: "Access-Control-Allow-Credentials", value: "true" },
//           { key: "Access-Control-Allow-Origin", value: "*" },
//           { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
//           { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
//         ]
//       }
//     ]
//   }
// };

// next.config.js
// module.exports = {
//   async rewrites() {
//       return [
//         {
//           source: '/api/:path*',
//           destination: 'https://www.legion-tracker-api.telkom.design/api/v1/:path*',
//         },
//       ]
//     },
// };
