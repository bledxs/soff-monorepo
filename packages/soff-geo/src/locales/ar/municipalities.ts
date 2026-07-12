import type { Municipality } from '../../core/types.js';
import { unpackMunicipalities } from '../../core/utils.js';

export interface ArgentineMunicipality extends Municipality {
  code: string;
  departmentCode: string;
}

// Subset of major cities due to large number of localities in AR
const PACKED_DATA: Record<string, string> = {
  C: '001:Buenos Aires',
  B: '001:La Plata|002:Mar del Plata|003:Bahía Blanca|004:Tandil|005:San Isidro|006:Vicente López|007:Lanús|008:Lomas de Zamora|009:Quilmes|010:La Matanza',
  X: '001:Córdoba|002:Villa Carlos Paz|003:Río Cuarto|004:Alta Gracia|005:San Francisco',
  S: '001:Santa Fe|002:Rosario|003:Rafaela|004:Venado Tuerto',
  M: '001:Mendoza|002:San Rafael|003:Godoy Cruz|004:Guaymallén',
};

export const MUNICIPALITIES: readonly ArgentineMunicipality[] =
  unpackMunicipalities<ArgentineMunicipality>(PACKED_DATA);
