import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
});

const Order = mongoose.model('order', OrderSchema);
export default Order;
