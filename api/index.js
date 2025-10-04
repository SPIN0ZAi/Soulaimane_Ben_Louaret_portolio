const serverless = require('serverless-http');
// Require the built server (CommonJS build produced by esbuild)
const app = require('../dist/app').default || require('../dist/app');

module.exports = serverless(app);
