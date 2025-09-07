export interface PropertyTaxProrationInputs {
  propertyValue: number;
  annualTaxRate: number;
  closingDate: string;
  prorationDate: string;
  sellerPaysTaxes: boolean;
  buyerPaysTaxes: boolean;
  taxYearStart: string;
  taxYearEnd: string;
  prepaidTaxes: number;
  taxAssessment: number;
}

export interface PropertyTaxProrationResults {
  annualPropertyTax: number;
  dailyTaxRate: number;
  daysInTaxYear: number;
  daysSellerOwns: number;
  daysBuyerOwns: number;
  sellerTaxProration: number;
  buyerTaxProration: number;
  netProrationAmount: number;
  adjustmentToSeller: number;
  adjustmentToBuyer: number;
  totalTaxDue: number;
  prepaidTaxAdjustment: number;
}

export interface PropertyTaxProrationMetrics {
  prorationAccuracy: number;
  taxYearProgress: number;
  sellerPortion: number;
  buyerPortion: number;
  adjustmentDirection: 'seller' | 'buyer' | 'neutral';
}