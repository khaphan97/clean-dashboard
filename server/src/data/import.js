import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Content from './models/content';

dotenv.config();
(async () => {
  await mongoose.connect(process.env.DB_URL);
  console.log('connect successfully');
})().catch(err => console.log(err));

const importDataContent = async () => {
  const contents = JSON.parse(fs.readFileSync(`${__dirname}/data/contents.json`, 'utf-8'));
  contents.content.forEach(node => (node.videoHistory = [node.videoUrl]));

  try {
    await Content.insertMany(contents);
    console.log('Import Data Content Success');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteDataContent = async () => {
  try {
    await Content.deleteMany();
    console.log('Delete Contents successful');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// deleteDataContent();
// importDataContent();
