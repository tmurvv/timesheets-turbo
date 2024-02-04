import { MongoClient } from "mongodb";
import {config} from "dotenv";

config();

const DATABASE_STAGING = process.env["DATABASE_STAGING"] as string ?? "";
const DATABASE_PASSWORD = process.env["DATABASE_PASSWORD"] as string?? "";
const url = DATABASE_STAGING.replace("<PASSWORD>", DATABASE_PASSWORD);

const mongoClient = new MongoClient(url);

export const db = mongoClient.db(process.env["DATABASE_NAME"] as string);
