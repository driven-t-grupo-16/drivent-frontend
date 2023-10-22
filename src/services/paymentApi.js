/* eslint-disable react-hooks/rules-of-hooks */

import api from './api';

export async function createPayment(token, payload) {
  const response = await api.post('/payments/process', payload , {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  return response.data
}
