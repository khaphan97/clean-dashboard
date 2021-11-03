import {
  getListTemplates,
  getTemplateById,
  createVideoByTemplateID,
} from '../services/synthesia/index';

import cloudinaryInstance from '../utils/cloudinary';

import https from 'https';
import fs from 'fs';

import dotenv from 'dotenv';
dotenv.config();

import Content from '../models/content';

class synthesiaController {
  async getVideoTemplates(req, res) {
    try {
      const result = await getListTemplates();
      res.status(200).json({ status: 'success', templates: result.data });
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message });
    }
  }
  async getTemplate(req, res) {
    try {
      const { id } = req.params;

      const result = await getTemplateById(id);
      console.log(id);
      res.status(200).json({ status: 'success', templates: result.data });
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message });
    }
  }
  async createNewVideoByTemplate(req, res) {
    try {
      const { data } = req.body;
      const video = await createVideoByTemplateID(data);
      res.status(201).json({
        status: 'success',
        video: video.data,
      });
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message });
    }
  }

  /**
   * This is webhook handler , the synthesia server will call this function automatic
   * This function will upload the video to the cloud and then update the chat node url from database
   */
  async receiveVideoStatus(req, res) {
    // Get Data After status of Video is success
    const { data } = req.body;

    // WRITE FILE INTO LOCAL
    const file = fs.createWriteStream(`src/assets/videos/${data.id}.mp4`);

    https.get(data.download, function (response) {
      response.pipe(file);
      file.on('finish', function () {
        // Call API To cloudinary after write file success

        cloudinaryInstance.uploader.upload(
          file.path.toString(),
          {
            resource_type: 'video',
            public_id: `work/${data.id}`,
            overwrite: true,
          },
          async function (error, result) {
            file.close();
            // Update Data Node From Database
            const videoUrl = result.secure_url;
            const nodeId = data.callbackId;

            await Content.findOneAndUpdate(
              { idContent: process.env.ID, 'content.name': nodeId },
              {
                $push: { 'content.$.videoHistory': videoUrl },
                $set: { 'content.$.videoUrl': videoUrl },
              }
            );
          }
        );
      });
    });

    res.status(200).send('OK');
  }
}

export default new synthesiaController();
