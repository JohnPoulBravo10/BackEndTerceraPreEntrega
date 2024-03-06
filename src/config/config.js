import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const MONGO = process.env.MONGO;
const CLIENTID = process.env.CLIENTID;
const CLIENTSECRET = process.env.CLIENTSECRET;
const CALLBACKURL = process.env.CALLBACKURL;

export const options = {
    server: {
        port: PORT
    },
    mongo:{
        url: MONGO
    },
    client:{
        clientID: CLIENTID,
        clientSecret: CLIENTSECRET,
        callbackURL:CALLBACKURL
    }
};