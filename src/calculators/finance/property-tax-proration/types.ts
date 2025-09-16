export interface PropertyTaxProrationInputs {
  annualPropertyTax: number;
  taxYearStart: string;
  taxYearEnd: string;
  closingDate: string;
  prorationMethod: '365-day' | '366-day' | '360-day' | 'actual-days';
  includeInterest: boolean;
  interestAmount: number;
  buyerPaysClosingCosts: boolean;
}

export interface PropertyTaxProrationResults {
  daysInTaxYear: number;
  daysOwnedBySeller: number;
  daysOwnedByBuyer: number;
  sellerTaxPortion: number;
  buyerTaxPortion: number;
  dailyTaxRate: number;
  sellerInterestPortion: number;
  buyerInterestPortion: number;
  totalSellerResponsibility: number;
  totalBuyerResponsibility: number;
  prorationDate: string;
  adjustmentAmount: number;
}