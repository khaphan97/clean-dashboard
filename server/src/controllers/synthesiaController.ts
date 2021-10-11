import { getListTemplates, getTemplateById } from '../services/synthesia/index';

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
      res.status(200).json({ status: 'success', templates: result.data });
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message });
    }
  }
}

export default new synthesiaController();
