export interface HomeInsuranceCalculatorInputs {
  propertyValue: number;
  propertyAddress: string;
  propertyType: string;
  propertyAge: number;
  propertySize: number;
  constructionType: string;
  roofType: string;
  roofAge: number;
  state: string;
  city: string;
  zipCode: string;
  floodZone: string;
  crimeRate: string;
  fireStationDistance: number;
  policeStationDistance: number;
  dwellingCoverage: number;
  personalPropertyCoverage: number;
  liabilityCoverage: number;
  medicalPaymentsCoverage: number;
  lossOfUseCoverage: number;
  otherStructuresCoverage: number;
  dwellingDeductible: number;
  personalPropertyDeductible: number;
  liabilityDeductible: number;
  hurricaneDeductible: number;
  windstormDeductible: number;
  claimsInLast3Years: number;
  claimsInLast5Years: number;
  claimsInLast10Years: number;
  totalClaimAmount: number;
  insuranceCompany: string;
  policyType: string;
  policyTerm: number;
  analysisPeriod: number;
  inflationRate: number;
  propertyAppreciationRate: number;
  rentalUnits: number;
}

export interface HomeInsuranceCalculatorOutputs {
  annualPremium: number;
  monthlyPremium: number;
  totalCoverage: number;
  riskScore: number;
  premiumToValueRatio: number;
  totalDiscounts: number;
  effectivePremium: number;
}
