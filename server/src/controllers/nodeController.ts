import dotenv from 'dotenv';
import { Request, Response } from 'express';
import Content from '../models/content';
import Order from '../models/Order';
import User from '../models/User';
dotenv.config();

class nodeController {
  async navigateNode(req: Request, res: Response) {
    const botData: any = await Content.findById(process.env.ID);
    const oldNode = { ...req.body.currentNode };

    const nameNextNode = oldNode.event === 'capture' ? oldNode.data.next : oldNode.data;

    const node = botData.content.find(node => {
      if (nameNextNode === node.name) return node;
    });

    const newNode = JSON.parse(JSON.stringify(node));

    newNode.buttons = newNode.buttons.map(but => {
      if (but.event === 'capture') {
        but.data = JSON.parse(but.data);
      }
      return but;
    });

    if (node)
      return res.status(200).json({
        status: 'success',
        data: newNode,
      });
    res.status(404).json({ status: 'failed', message: 'Node Not found' });
  }

  async createUser(req: Request, res: Response) {
    try {
      const data: any = await Content.findById(process.env.ID);
      const { name, language } = req.body.user;
      await User.create({ name, language });
      const nextNode = data.content.find(
        node => node.name === `conversation_welcome${language === 'vi' ? ':vi' : ''}`
      );
      res.status(200).json({
        status: 'success',
        data: nextNode,
      });
    } catch (err) {
      res.status(400).json({ status: 'failed', message: err.message });
    }
  }

  async createOrder(req: Request, res: Response) {
    try {
      //Save order form
      const { name, language, address, phone } = req.body;
      const orderInformation = new Order({ name, address, phone });
      await orderInformation.save();
      //Get Node conversation_end
      const data: any = await Content.findById(process.env.ID);
      const endConversation = language === 'en' ? 'conversation_end' : 'conversation_end:vi';
      const node = data.content.find(node => node.name === endConversation);
      res.status(200).json({
        status: 'success',
        data: node,
      });
    } catch (err) {
      res.status(503).json({ status: 'failed', message: err.message });
    }
  }
  async updateVideoHistory(req: Request, res: Response) {
    try {
      const { nodeName, videoUrl } = req.body;
      await Content.findOneAndUpdate(
        { idContent: process.env.ID, 'content.name': nodeName },
        {
          $push: { 'content.$.videoHistory': videoUrl },
        }
      );
      res.status(200).json({
        status: 'success',
      });
    } catch (err) {
      res.status(503).json({ status: 'failed', message: err.message });
    }
  }
}

export default new nodeController();
