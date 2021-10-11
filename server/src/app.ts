import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { startApolloServer } from './graphql/apollo-server';
import nodeRoutes from './routes/nodeRoutes';
import synthesiaRoute from './routes/synthesiaRoute';
import connectDB from './server';

dotenv.config();
const port = process.env.PORT || 3000;
const url = process.env.DB_URL;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/node', nodeRoutes);
app.use('/api/v1/synthesia', synthesiaRoute);

const httpServer = http.createServer(app);

connectDB(url).then(res => {
  console.log('Connect DB Successfully');
  startApolloServer(httpServer, app, port);
});
