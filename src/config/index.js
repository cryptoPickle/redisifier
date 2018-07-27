import dotenv from 'dotenv';

dotenv.load();

const config = {
  url: process.env.REDISURL,
  port: process.env.REDISPORT,
  password: process.env.REDISPASSWORD
}

export default config;