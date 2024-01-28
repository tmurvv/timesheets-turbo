import { config } from 'dotenv';
import mongoose from'mongoose';

config();

const conn = process.env.DB_STRING;

const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    admin: Boolean
});

export const User = connection.model('User', UserSchema);

export default connection;