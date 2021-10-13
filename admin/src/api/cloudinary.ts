import request from '@/utils/request';

// Get Chat Node

export function getSignatureKey(timestamp: string) {
  return request({
    url: `/node/upload`,
    method: 'GET',
    params: {
      timestamp,
    },
  });
}

export function saveVideoHistory(data: any) {
  return request({
    url: `/node/upload`,
    method: 'POST',
    data,
  });
}
