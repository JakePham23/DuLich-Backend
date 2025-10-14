// import mongoose from "mongoose";
// import dotenv from 'dotenv'
// dotenv.config()
// const MONGODB_URI = process.env.MONGODB_URI
// ;

// if (!MONGODB_URI) {
//   throw new Error("❌ Please define MONGODB_URI in .env file");
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export async function connectDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI, {
//       bufferCommands: false,
//     }).then((mongoose) => mongoose);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

import mongoose from "mongoose";
import dotenv from 'dotenv';

// Load environment variables immediately
dotenv.config();

// Get the URI from environment variables
const connectString = process.env.MONGODB_URI;

// Throw an error if the URI is not set
if (!connectString) {
  throw new Error("❌ MONGODB_URI environment variable is not defined in the .env file.");
}
class Database {

    constructor() {
        this._connect();
    }

    // TODO: Connected to mongodb
    _connect() {
        if (true) {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
        }

        mongoose.connect(connectString, {
            maxPoolSize: 50 // TODO: Max connection
        })
            .then(() => {
                console.log(`Connected to mongodb`)
            })
            .catch(err => {
                console.log('Connect to mongodb failed');
                console.error(err);
            })
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Database();
        }

        return this.instance;
    }
    
}

export default Database.getInstance();