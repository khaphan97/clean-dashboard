import SynthesiaAxios from '../../utils/request';

// Get Chat Node
const request = SynthesiaAxios('https://api.synthesia.io/v2');

export function getListTemplates() {
  return request({
    url: '/templates',
    method: 'GET',
  });
}

export function getTemplateById(id) {
  return request({
    url: `/templates/${id}`,
    method: 'GET',
  });
}

export function createVideoByTemplateID(data) {
  return request({
    url: 'videos/fromTemplate',
    method: 'POST',
    data,
  });
}
