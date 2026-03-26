import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

process.stdout.write('STARTING DB TEST\n');
process.stdout.write(`Testing URI: ${process.env.MONGO_URI}\n`);

const timeout = setTimeout(() => {
  process.stdout.write('FAILURE: Timeout after 10 seconds\n');
  process.exit(1);
}, 10000);

try {
  await mongoose.connect(process.env.MONGO_URI, { 
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000
  });
  clearTimeout(timeout);
  process.stdout.write('SUCCESS: Connected to MongoDB\n');
  process.exit(0);
} catch (err) {
  clearTimeout(timeout);
  process.stdout.write(`FAILURE: Connection Error: ${err.message}\n`);
  process.exit(1);
}
