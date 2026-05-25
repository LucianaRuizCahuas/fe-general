export interface TourPackage {
  id?: number;
  packageName: string;
  descripcion: string;
  price: number;
  startDate: string | null;
  endDate: string | null;
  state: 'A' | 'I' | string;
}
