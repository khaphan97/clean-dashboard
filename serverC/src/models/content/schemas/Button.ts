import mongoose from 'mongoose';

const ButtonSchema = new mongoose.Schema({
  text: {
    type: String,
    require: true,
  },
  event: {
    type: String,
  },
  data: {
    type: String,
  },
  thumb: String,
  price: String,
  sub_text: String,
  description: String,
});

export default ButtonSchema;
