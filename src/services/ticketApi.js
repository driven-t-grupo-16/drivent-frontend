/* eslint-disable react-hooks/rules-of-hooks */

import api from './api';

export async function getTicketTypes(token) {
  const response = await api.get('/tickets/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  return response.data
}

export async function getTickets(token) {
  const response = await api.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  return response.data
}