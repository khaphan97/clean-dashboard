import mongoose from 'mongoose';
import Button from './Button';
import Condition from './Condition';

const NodeSchema = new mongoose.Schema({
  name: String,
  ui: String,
  type: String,
  videoTitle: String,
  videoUrl: String,
  text: String,
  description: String,
  thumb: String,
  price: String,
  sub_text: String,
  buttons: [Button],
  condition: [Condition],
  regex: String,
});

export default NodeSchema;
