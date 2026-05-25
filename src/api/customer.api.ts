import { createApi } from './api';
import { environment } from './environment';
import type { Customer } from '../types/customer';

type CustomerCreate = Omit<Customer, 'id'>;
const api = createApi(environment.customerApiUrl);

export const customerApi = {
  getAll: async () => (await api.get<Customer[]>('')).data,
  create: async (payload: CustomerCreate) => (await api.post<Customer>('', payload)).data,
  update: async (id: string, payload: Customer) => (await api.put<Customer>(`/${id}`, payload)).data,
  deactivate: async (id: string) => (await api.patch<Customer>(`/delete/${id}`, {})).data,
  restore: async (id: string) => (await api.patch<Customer>(`/restore/${id}`, {})).data,
  deletePermanent: async (id: string) => (await api.delete(`/${id}`)).data,
};
