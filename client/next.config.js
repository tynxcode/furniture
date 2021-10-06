module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    apiUrl: process.env.SERVERSIDE_API_URL, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiUrl: process.env.CLIENTSIDE_API_URL,
  },
}
