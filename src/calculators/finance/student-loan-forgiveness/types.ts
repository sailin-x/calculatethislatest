export interface StudentLoanForgivenessInputs {
  loanBalance: number;
  interestRate: number;
  monthlyPayment: number;
  forgivenessProgram: 'public_service' | 'income_driven' | 'teacher' | 'nurse' | 'other';
  employmentType: 'government' | 'nonprofit' | 'teacher' | 'nurse' | 'military' | 'other';
  yearsOfService: number;
  requiredYearsForForgiveness: number;
  income: number;
  familySize: number;
  state: string;
  currentAge: number;
  expectedSalaryGrowth: number;
  taxBracket: number;
  alternativePayment: number;
}

export interface StudentLoanForgivenessOutputs {
  totalPaymentsMade: number;
  totalInterestPaid: number;
  amountForgiven: number;
  netSavings: number;
  breakEvenPoint: number;
  timeToForgiveness: number;
  monthlyPaymentSavings: number;
  taxImplications: number;
  effectiveCost: number;
  paymentSchedule: Array<{
    year: number;
    beginningBalance: number;
    payment: number;
    interest: number;
    principal: number;
    endingBalance: number;
  }>;
  forgivenessEligibility: {
    isEligible: boolean;
    requirementsMet: string[];
    requirementsNotMet: string[];
    estimatedForgivenessDate: string;
  };
  alternativeScenarios: Array<{
    scenario: string;
    totalPayments: number;
    amountForgiven: number;
    netSavings: number;
  }>;
  recommendations: string[];
}