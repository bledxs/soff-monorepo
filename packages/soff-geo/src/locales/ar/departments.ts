import type { Department } from '../../core/types.js';

export interface ArgentineProvince extends Department {
  code: string;
  iso: string;
}

export const DEPARTMENTS: readonly ArgentineProvince[] = [
  {
    code: 'C',
    name: 'Ciudad Autónoma de Buenos Aires',
    iso: 'AR-C',
    capital: 'Buenos Aires',
    capitalCode: 'C',
  },
  { code: 'B', name: 'Buenos Aires', iso: 'AR-B', capital: 'La Plata', capitalCode: 'B001' },
  {
    code: 'K',
    name: 'Catamarca',
    iso: 'AR-K',
    capital: 'San Fernando del Valle de Catamarca',
    capitalCode: 'K001',
  },
  { code: 'H', name: 'Chaco', iso: 'AR-H', capital: 'Resistencia', capitalCode: 'H001' },
  { code: 'U', name: 'Chubut', iso: 'AR-U', capital: 'Rawson', capitalCode: 'U001' },
  { code: 'X', name: 'Córdoba', iso: 'AR-X', capital: 'Córdoba', capitalCode: 'X001' },
  { code: 'W', name: 'Corrientes', iso: 'AR-W', capital: 'Corrientes', capitalCode: 'W001' },
  { code: 'E', name: 'Entre Ríos', iso: 'AR-E', capital: 'Paraná', capitalCode: 'E001' },
  { code: 'P', name: 'Formosa', iso: 'AR-P', capital: 'Formosa', capitalCode: 'P001' },
  { code: 'Y', name: 'Jujuy', iso: 'AR-Y', capital: 'San Salvador de Jujuy', capitalCode: 'Y001' },
  { code: 'L', name: 'La Pampa', iso: 'AR-L', capital: 'Santa Rosa', capitalCode: 'L001' },
  { code: 'F', name: 'La Rioja', iso: 'AR-F', capital: 'La Rioja', capitalCode: 'F001' },
  { code: 'M', name: 'Mendoza', iso: 'AR-M', capital: 'Mendoza', capitalCode: 'M001' },
  { code: 'N', name: 'Misiones', iso: 'AR-N', capital: 'Posadas', capitalCode: 'N001' },
  { code: 'Q', name: 'Neuquén', iso: 'AR-Q', capital: 'Neuquén', capitalCode: 'Q001' },
  { code: 'R', name: 'Río Negro', iso: 'AR-R', capital: 'Viedma', capitalCode: 'R001' },
  { code: 'A', name: 'Salta', iso: 'AR-A', capital: 'Salta', capitalCode: 'A001' },
  { code: 'J', name: 'San Juan', iso: 'AR-J', capital: 'San Juan', capitalCode: 'J001' },
  { code: 'D', name: 'San Luis', iso: 'AR-D', capital: 'San Luis', capitalCode: 'D001' },
  { code: 'Z', name: 'Santa Cruz', iso: 'AR-Z', capital: 'Río Gallegos', capitalCode: 'Z001' },
  { code: 'S', name: 'Santa Fe', iso: 'AR-S', capital: 'Santa Fe', capitalCode: 'S001' },
  {
    code: 'G',
    name: 'Santiago del Estero',
    iso: 'AR-G',
    capital: 'Santiago del Estero',
    capitalCode: 'G001',
  },
  { code: 'V', name: 'Tierra del Fuego', iso: 'AR-V', capital: 'Ushuaia', capitalCode: 'V001' },
  {
    code: 'T',
    name: 'Tucumán',
    iso: 'AR-T',
    capital: 'San Miguel de Tucumán',
    capitalCode: 'T001',
  },
] as const;
