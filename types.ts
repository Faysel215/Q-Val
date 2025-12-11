export enum AssetType {
  REAL_ESTATE = 'Real Estate',
  INFRASTRUCTURE = 'Infrastructure',
  PRIVATE_EQUITY = 'Private Equity',
  SUKUK = 'Illiquid Sukuk',
}

export enum Region {
  MENA = 'MENA',
  SE_ASIA = 'SE Asia',
  EUROPE = 'Europe',
  NORTH_AMERICA = 'North America',
}

export interface AssetParams {
  name: string;
  type: AssetType;
  region: Region;
  initialValue: number;
  currency: string;
  tenureYears: number;
  description: string;
}

export interface PricePoint {
  month: number;
  syntheticPrice: number;
  upperBound: number;
  lowerBound: number;
  proxyCorrelation: number;
}

export interface ValuationResult {
  pricePath: PricePoint[];
  finalValuation: number;
  volatility: number;
  tangibilityRatio: number; // For Sukuk
  confidenceScore: number;
  marketCommentary: string;
  proxyUsed: string;
}

export interface SimulationState {
  status: 'IDLE' | 'THINKING' | 'GENERATING' | 'COMPLETE' | 'ERROR';
  progress: number; // 0-100
  message?: string;
}