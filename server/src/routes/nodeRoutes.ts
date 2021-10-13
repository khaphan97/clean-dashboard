import express from 'express';
import Node from '../controllers/nodeController';
import cloudinary from '../utils/cloudinary';

const route = express.Router();

route.post('/navigateNode', Node.navigateNode);
route.post('/user', Node.createUser);
route.post('/order', Node.createOrder);

// Be sure to change the cloud_name, api_key, and api_secret to yours below
route
  .route('/upload')
  .get((req, res) => {
    const signature = cloudinary.utils.api_sign_request(req.query, cloudinary.config().api_secret);
    res.status(200).json(signature);
  })
  .post(Node.updateVideoHistory);

export default route;
