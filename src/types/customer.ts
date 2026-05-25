export interface Customer {
  id?: string;
  firstName: string;
  lastName: string;
  documentType: 'DNI' | 'PAS' | 'CE' | string;
  nroDocument: string;
  phone: string;
  email: string;
  estado: boolean;
}
