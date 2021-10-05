import express from 'express';
import Node from '../controllers/nodeController';

const route = express.Router();

route.post('/navigateNode', Node.navigateNode);
route.post('/user', Node.createUser);
route.post('/order', Node.createOrder);

export default route;
