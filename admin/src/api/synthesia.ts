import request from '@/utils/request';

// Get Chat Node

export function getListTemplates() {
  return request({
    url: '/synthesia',
    method: 'GET',
  });
}

export function generateVideo(data: any) {
  return request({
    url: '/synthesia',
    method: 'POST',
    data,
  });
}
