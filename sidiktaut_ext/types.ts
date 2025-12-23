export interface ScanResult {
  malicious: number;
  harmless: number;
  suspicious?: number;
  undetected?: number;
  timeout?: number;
}

export interface ScanResponse {
  malicious: number;
  harmless: number;
  error?: string;
}

export enum ScanStatus {
  IDLE = 'IDLE',
  SCANNING = 'SCANNING',
  SAFE = 'SAFE',
  DANGER = 'DANGER',
  ERROR = 'ERROR'
}