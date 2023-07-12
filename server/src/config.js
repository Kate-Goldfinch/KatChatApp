const dotenv = require('dotenv')

if (process.env.NODE_ENV != 'production') {
    dotenv.config();
}

const corsClientDomain =  process.env.CORS_CLIENT_DOMAIN
const mongoDBUrl = 'mongodb+srv://kategold:2b2RA2qq21uzg6rQ@cluster0.e10zsiu.mongodb.net/chatapp?retryWrites=true&w=majority'
const sessionSecret =  process.env.SESSION_DB_SECRET || 'notVerySecretSecret'

const port = process.env.PORT || '8000'

module.exports = { corsClientDomain, sessionSecret, port, mongoDBUrl }