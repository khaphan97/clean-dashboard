import mongoose from 'mongoose';

const ConditionSchema = new mongoose.Schema({
  property: {
    type: String,
  },
  value: {
    type: String,
  },
  operator: {
    type: String,
  },
});

export default ConditionSchema;
