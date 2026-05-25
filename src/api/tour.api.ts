import { createApi } from './api';
import { environment } from './environment';
import type { TourPackage } from '../types/tour';

const api = createApi(environment.tourApiUrl);

export const tourApi = {

  getAll: async () =>
    (await api.get<TourPackage[]>('')).data,

  findByState: async (state: string) =>
    (await api.get<TourPackage[]>(`/state/${state}`)).data,

  findById: async (id: number) =>
    (await api.get<TourPackage>(`/${id}`)).data,

  // ✅ CREAR
  save: async (payload: TourPackage) =>
    (await api.post<TourPackage>('', payload)).data,

  // ✅ ACTUALIZAR
  update: async (id: number, payload: TourPackage) =>
    (await api.put<TourPackage>(`/${id}`, payload)).data,

  // ✅ ELIMINAR
  delete: async (id: number) =>
    (await api.patch<TourPackage>(`/delete/${id}`, {})).data,

  // ✅ RESTAURAR
  restore: async (id: number) =>
    (await api.patch<TourPackage>(`/restore/${id}`, {})).data,
};