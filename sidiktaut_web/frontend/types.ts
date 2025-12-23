export interface ScanResponse {
  status: string;
  malicious: number;
  harmless: number;
  suspicious: number;
  reputation: number;
  error?: string;
  
  // Info tambahan
  scan_signature?: string; 
  process_time?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: any; 
  group?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}