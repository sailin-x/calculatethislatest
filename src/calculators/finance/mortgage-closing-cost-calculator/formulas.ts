import { MortgageClosingCostInputs, MortgageClosingCostOutputs } from './types';

// Calculate monthly mortgage payment
export function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  if (monthlyRate === 0) return principal / numPayments;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
          (Math.pow(1 + monthlyRate, numPayments) - 1);
}

// Calculate lender fees
export function calculateLenderFees(inputs: MortgageClosingCostInputs): number {
  const originationFee = inputs.loanAmount * 0.01; // 1% origination fee
  const discountPoints = inputs.discountPoints * inputs.loanAmount * 0.0025; // $25 per point per $100k
  const lenderCredits = inputs.lenderCredits;

  return originationFee + discountPoints - lenderCredits + inputs.originationFees;
}

// Calculate third-party fees
export function calculateThirdPartyFees(inputs: MortgageClosingCostInputs): number {
  return inputs.appraisalFee +
         inputs.titleInsurance +
         inputs.escrowFees +
         inputs.recordingFees +
         inputs.transferTaxes +
         inputs.otherFees;
}

// Calculate prepaid items
export function calculatePrepaidItems(inputs: MortgageClosingCostInputs): number {
  const monthlyPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  const propertyTaxesMonthly = inputs.propertyTaxes / 12;
  const homeownersInsuranceMonthly = inputs.homeownersInsurance / 12;
  const floodInsuranceMonthly = inputs.floodInsurance / 12;

  // Prepaid items for 2 months (common practice)
  return (monthlyPayment + propertyTaxesMonthly + homeownersInsuranceMonthly + floodInsuranceMonthly) * 2 +
         inputs.prepaidInterest;
}

// Calculate escrow deposits
export function calculateEscrowDeposits(inputs: MortgageClosingCostInputs): number {
  // Escrow for 2 months of property taxes and insurance
  return (inputs.propertyTaxes + inputs.homeownersInsurance + inputs.floodInsurance) * 2 / 12;
}

// Calculate total closing costs
export function calculateTotalClosingCosts(inputs: MortgageClosingCostInputs): number {
  return calculateLenderFees(inputs) +
         calculateThirdPartyFees(inputs) +
         calculatePrepaidItems(inputs) +
         calculateEscrowDeposits(inputs);
}

// Calculate total cash to close
export function calculateTotalCashToClose(inputs: MortgageClosingCostInputs): number {
  const closingCosts = calculateTotalClosingCosts(inputs);
  const downPayment = inputs.downPayment;
  const earnestMoney = inputs.earnestMoneyDeposit;
  const cashReserves = inputs.cashReserves;

  return closingCosts + downPayment + earnestMoney + cashReserves - inputs.sellerConcessions;
}

// Calculate cash from borrower
export function calculateCashFromBorrower(inputs: MortgageClosingCostInputs): number {
  return calculateTotalCashToClose(inputs);
}

// Calculate cash from seller (concessions)
export function calculateCashFromSeller(inputs: MortgageClosingCostInputs): number {
  return inputs.sellerConcessions;
}

// Generate cost breakdown
export function generateCostBreakdown(inputs: MortgageClosingCostInputs): MortgageClosingCostOutputs['costBreakdown'] {
  const totalCosts = calculateTotalClosingCosts(inputs);
  const lenderFees = calculateLenderFees(inputs);
  const thirdPartyFees = calculateThirdPartyFees(inputs);
  const prepaidItems = calculatePrepaidItems(inputs);
  const escrowDeposits = calculateEscrowDeposits(inputs);

  return [
    {
      category: 'Lender Fees',
      amount: lenderFees,
      percentage: (lenderFees / totalCosts) * 100,
      description: 'Origination fees, discount points, and lender credits'
    },
    {
      category: 'Third-Party Fees',
      amount: thirdPartyFees,
      percentage: (thirdPartyFees / totalCosts) * 100,
      description: 'Appraisal, title insurance, escrow, recording, and transfer taxes'
    },
    {
      category: 'Prepaid Items',
      amount: prepaidItems,
      percentage: (prepaidItems / totalCosts) * 100,
      description: 'Prepaid interest, property taxes, and insurance'
    },
    {
      category: 'Escrow Deposits',
      amount: escrowDeposits,
      percentage: (escrowDeposits / totalCosts) * 100,
      description: 'Funds held in escrow for future payments'
    }
  ];
}

// Calculate affordability analysis
export function calculateAffordabilityAnalysis(inputs: MortgageClosingCostInputs): MortgageClosingCostOutputs['affordabilityAnalysis'] {
  const monthlyPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  const monthlyTaxes = inputs.propertyTaxes / 12;
  const monthlyInsurance = inputs.homeownersInsurance / 12;
  const totalMonthlyPayment = monthlyPayment + monthlyTaxes + monthlyInsurance;

  // Assuming borrower's income - this would typically be an input
  const assumedMonthlyIncome = 8000; // Placeholder
  const frontEndRatio = (totalMonthlyPayment / assumedMonthlyIncome) * 100;
  const backEndRatio = frontEndRatio; // Simplified

  let affordability: 'Excellent' | 'Good' | 'Fair' | 'Poor' = 'Poor';
  const recommendations: string[] = [];

  if (frontEndRatio <= 28) {
    affordability = 'Excellent';
    recommendations.push('Your payment ratios are excellent. You should have no problem qualifying.');
  } else if (frontEndRatio <= 33) {
    affordability = 'Good';
    recommendations.push('Your payment ratios are within acceptable ranges.');
  } else if (frontEndRatio <= 38) {
    affordability = 'Fair';
    recommendations.push('Consider a larger down payment or shopping for lower rates.');
  } else {
    affordability = 'Poor';
    recommendations.push('Your debt ratios are high. Consider improving your credit or saving for a larger down payment.');
  }

  return {
    frontEndRatio,
    backEndRatio,
    affordability,
    recommendations
  };
}

// Generate comparison scenarios
export function generateComparisonScenarios(inputs: MortgageClosingCostInputs): MortgageClosingCostOutputs['comparisonScenarios'] {
  const scenarios = [
    { name: 'Current Scenario', points: inputs.discountPoints, concessions: inputs.sellerConcessions },
    { name: 'No Points', points: 0, concessions: inputs.sellerConcessions },
    { name: '2 Points', points: 2, concessions: inputs.sellerConcessions },
    { name: 'Seller Pays All', points: inputs.discountPoints, concessions: calculateTotalClosingCosts(inputs) }
  ];

  return scenarios.map(scenario => {
    const modifiedInputs = {
      ...inputs,
      discountPoints: scenario.points,
      sellerConcessions: scenario.concessions
    };

    const totalCosts = calculateTotalClosingCosts(modifiedInputs);
    const cashToClose = calculateTotalCashToClose(modifiedInputs);
    const monthlyPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);

    return {
      scenario: scenario.name,
      totalCosts,
      cashToClose,
      monthlyPayment
    };
  });
}

// Main calculation function
export function calculateMortgageClosingCosts(inputs: MortgageClosingCostInputs): MortgageClosingCostOutputs {
  const totalClosingCosts = calculateTotalClosingCosts(inputs);
  const lenderFees = calculateLenderFees(inputs);
  const thirdPartyFees = calculateThirdPartyFees(inputs);
  const prepaidItems = calculatePrepaidItems(inputs);
  const escrowDeposits = calculateEscrowDeposits(inputs);
  const totalCashToClose = calculateTotalCashToClose(inputs);
  const cashFromBorrower = calculateCashFromBorrower(inputs);
  const cashFromSeller = calculateCashFromSeller(inputs);
  const costBreakdown = generateCostBreakdown(inputs);
  const affordabilityAnalysis = calculateAffordabilityAnalysis(inputs);
  const comparisonScenarios = generateComparisonScenarios(inputs);

  return {
    totalClosingCosts,
    lenderFees,
    thirdPartyFees,
    prepaidItems,
    escrowDeposits,
    totalCashToClose,
    cashFromBorrower,
    cashFromSeller,
    costBreakdown,
    affordabilityAnalysis,
    comparisonScenarios
  };
}