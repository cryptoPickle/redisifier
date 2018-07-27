import dotenv from 'dotenv';

dotenv.load();

const config = {
  host: process.env.REDISURL,
  port: process.env.REDISPORT,
  password: process.env.REDISPASSWORD
}

module.exports = config;