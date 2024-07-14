import crypto from 'crypto';
import dotenv from 'dotenv';
import path from 'path';

const configPath = path.resolve(__dirname, '../../config.env');
dotenv.config({ path: configPath });
const SECRET = process.env.SECRET;

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt:string, password:string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}

