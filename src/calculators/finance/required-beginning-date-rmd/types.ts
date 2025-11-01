export interface RequiredBeginningDateRMDInputs {
  birthYear: number;
  accountType: 'traditional_ira' | '401k' | 'roth_ira' | 'sep_ira' | 'simple_ira';
  spouseBirthYear?: number;
  isSpouseBeneficialOwner?: boolean;
}

export interface RequiredBeginningDateRMDOutputs {
  requiredBeginningDate: string;
  ageAtRBD: number;
  yearsUntilRBD: number;
  rbdExplanation: string;
}