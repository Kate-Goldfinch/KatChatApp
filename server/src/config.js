const dotenv = require('dotenv')
dotenv.config();

const corsClientDomain =  process.env.CORS_CLIENT_DOMAIN
const mongoDBUrl = process.env.MONGODB_URL
const sessionSecret =  process.env.SESSION_DB_SECRET || 'notVerySecretSecret'

const port = process.env.PORT

module.exports = { corsClientDomain, sessionSecret, port, mongoDBUrl }