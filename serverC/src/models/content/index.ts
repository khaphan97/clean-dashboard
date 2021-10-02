import mongoose from 'mongoose';
import Node from './schemas/Node';
const ContentSchema = new mongoose.Schema({
  content: [Node],
});

const Content = mongoose.model('content', ContentSchema);

export default Content;
