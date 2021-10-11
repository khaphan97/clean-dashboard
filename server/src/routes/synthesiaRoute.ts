import express from 'express';
import Synthesia from '../controllers/synthesiaController';

const router = express.Router();

router.get('/:id', Synthesia.getTemplate);
router.get('/', Synthesia.getVideoTemplates);

export default router;
