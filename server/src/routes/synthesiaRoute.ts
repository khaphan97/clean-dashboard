import express from 'express';
import Synthesia from '../controllers/synthesiaController';

const router = express.Router();

router.get('/:id', Synthesia.getTemplate);
router.route('/').get(Synthesia.getVideoTemplates).post(Synthesia.createNewVideoByTemplate);
router.post('/hook', Synthesia.receiveVideoStatus);

export default router;
