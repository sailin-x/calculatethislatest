/**
 * Child Support Calculator Formulas
 * Comprehensive child support calculations based on state guidelines and income sharing models
 */

/**
 * Calculate child support using the Income Shares model
 * This is the most common method used in the US
 */
export function calculateIncomeSharesSupport(
  custodialParentIncome: number,
  nonCustodialParentIncome: number,
  numberOfChildren: number,
  custodyArrangement: 'sole' | 'joint' | 'split' = 'sole',
  state: string = 'default'
): {
  combinedIncome: number;
  custodialParentShare: number;
  nonCustodialParentShare: number;
  basicChildSupport: number;
  monthlyPayment: number;
  annualPayment: number;
  custodyAdjustment: number;
  stateGuidelines: string;
} {
  if (custodialParentIncome < 0 || nonCustodialParentIncome < 0) {
    throw new Error('Income values cannot be negative');
  }
  if (numberOfChildren < 1) {
    throw new Error('Number of children must be at least 1');
  }

  const combinedIncome = custodialParentIncome + nonCustodialParentIncome;

  if (combinedIncome === 0) {
    return {
      combinedIncome: 0,
      custodialParentShare: 0,
      nonCustodialParentShare: 0,
      basicChildSupport: 0,
      monthlyPayment: 0,
      annualPayment: 0,
      custodyAdjustment: 0,
      stateGuidelines: 'No income available for child support calculation'
    };
  }

  // Calculate each parent's share of combined income
  const custodialParentShare = custodialParentIncome / combinedIncome;
  const nonCustodialParentShare = nonCustodialParentIncome / combinedIncome;

  // Get state-specific child support guidelines
  const stateGuidelines = getStateChildSupportGuidelines(combinedIncome, numberOfChildren, state);

  // Apply custody arrangement adjustments
  let custodyMultiplier = 1.0;
  let custodyAdjustment = 0;

  switch (custodyArrangement) {
    case 'joint':
      custodyMultiplier = 0.5; // Each parent pays for 50% of time with children
      custodyAdjustment = -50;
      break;
    case 'split':
      custodyMultiplier = 0.75; // Non-custodial parent pays more due to split custody
      custodyAdjustment = -25;
      break;
    case 'sole':
    default:
      custodyMultiplier = 1.0; // Standard sole custody
      custodyAdjustment = 0;
      break;
  }

  // Calculate basic child support obligation
  const basicChildSupport = stateGuidelines.basicSupport * custodyMultiplier;

  // Calculate the non-custodial parent's portion
  const nonCustodialPortion = basicChildSupport * nonCustodialParentShare;

  return {
    combinedIncome: Math.round(combinedIncome * 100) / 100,
    custodialParentShare: Math.round(custodialParentShare * 10000) / 100,
    nonCustodialParentShare: Math.round(nonCustodialParentShare * 10000) / 100,
    basicChildSupport: Math.round(basicChildSupport * 100) / 100,
    monthlyPayment: Math.round(nonCustodialPortion * 100) / 100,
    annualPayment: Math.round(nonCustodialPortion * 12 * 100) / 100,
    custodyAdjustment,
    stateGuidelines: stateGuidelines.description
  };
}

/**
 * Calculate child support using the Percentage of Income model
 * Used in some states like Alabama, Hawaii, Mississippi, and Wyoming
 */
export function calculatePercentageOfIncomeSupport(
  nonCustodialParentIncome: number,
  numberOfChildren: number,
  percentage: number = 20,
  minimumAmount: number = 50,
  maximumAmount: number = 500
): {
  percentageUsed: number;
  calculatedAmount: number;
  monthlyPayment: number;
  annualPayment: number;
  minimumApplied: boolean;
  maximumApplied: boolean;
} {
  if (nonCustodialParentIncome < 0) {
    throw new Error('Income cannot be negative');
  }
  if (numberOfChildren < 1) {
    throw new Error('Number of children must be at least 1');
  }
  if (percentage < 0 || percentage > 100) {
    throw new Error('Percentage must be between 0 and 100');
  }

  // Calculate base amount using percentage of income
  const baseAmount = (nonCustodialParentIncome * percentage / 100) / numberOfChildren;

  // Apply minimum and maximum constraints
  let finalAmount = baseAmount;
  let minimumApplied = false;
  let maximumApplied = false;

  if (finalAmount < minimumAmount) {
    finalAmount = minimumAmount;
    minimumApplied = true;
  } else if (finalAmount > maximumAmount) {
    finalAmount = maximumAmount;
    maximumApplied = true;
  }

  return {
    percentageUsed: percentage,
    calculatedAmount: Math.round(finalAmount * 100) / 100,
    monthlyPayment: Math.round(finalAmount * 100) / 100,
    annualPayment: Math.round(finalAmount * 12 * 100) / 100,
    minimumApplied,
    maximumApplied
  };
}

/**
 * Calculate child support using the Melson Formula
 * Used in some states for higher-income families
 */
export function calculateMelsonFormulaSupport(
  custodialParentIncome: number,
  nonCustodialParentIncome: number,
  numberOfChildren: number,
  standardOfLiving: 'basic' | 'comfortable' | 'luxury' = 'comfortable'
): {
  combinedIncome: number;
  adjustedIncome: number;
  childSupportAmount: number;
  monthlyPayment: number;
  annualPayment: number;
  standardOfLiving: string;
  melsonMultiplier: number;
} {
  if (custodialParentIncome < 0 || nonCustodialParentIncome < 0) {
    throw new Error('Income values cannot be negative');
  }
  if (numberOfChildren < 1) {
    throw new Error('Number of children must be at least 1');
  }

  const combinedIncome = custodialParentIncome + nonCustodialParentIncome;

  // Melson formula adjustments based on standard of living
  const livingStandards = {
    basic: { multiplier: 0.15, description: 'Basic necessities only' },
    comfortable: { multiplier: 0.25, description: 'Comfortable lifestyle' },
    luxury: { multiplier: 0.35, description: 'Luxury lifestyle' }
  };

  const standard = livingStandards[standardOfLiving];
  const melsonMultiplier = standard.multiplier;

  // Calculate adjusted income (after taxes and work-related expenses)
  const adjustedIncome = combinedIncome * 0.75; // Rough estimate for take-home pay

  // Melson formula: Child support = (Adjusted income × Multiplier) ÷ Number of children
  const totalChildSupport = (adjustedIncome * melsonMultiplier) / numberOfChildren;

  // Non-custodial parent's share
  const nonCustodialShare = nonCustodialParentIncome / combinedIncome;
  const childSupportAmount = totalChildSupport * nonCustodialShare;

  return {
    combinedIncome: Math.round(combinedIncome * 100) / 100,
    adjustedIncome: Math.round(adjustedIncome * 100) / 100,
    childSupportAmount: Math.round(childSupportAmount * 100) / 100,
    monthlyPayment: Math.round(childSupportAmount * 100) / 100,
    annualPayment: Math.round(childSupportAmount * 12 * 100) / 100,
    standardOfLiving: standard.description,
    melsonMultiplier
  };
}

/**
 * Get state-specific child support guidelines
 */
function getStateChildSupportGuidelines(
  combinedIncome: number,
  numberOfChildren: number,
  state: string
): {
  basicSupport: number;
  description: string;
  method: string;
} {
  // Simplified state guidelines (in a real implementation, this would be much more comprehensive)
  const stateGuidelines: Record<string, any> = {
    'california': {
      method: 'Income Shares',
      baseAmount: 0,
      description: 'California uses Income Shares model with cost of living adjustments'
    },
    'texas': {
      method: 'Percentage of Income',
      percentage: 20,
      description: 'Texas uses 20% of non-custodial parent\'s income'
    },
    'florida': {
      method: 'Income Shares',
      baseAmount: 0,
      description: 'Florida uses Income Shares model'
    },
    'new_york': {
      method: 'Percentage of Income',
      percentage: 17,
      description: 'New York uses 17% of combined parental income'
    },
    'default': {
      method: 'Income Shares',
      baseAmount: 0,
      description: 'Using federal guidelines approximation'
    }
  };

  const guideline = stateGuidelines[state.toLowerCase()] || stateGuidelines.default;

  // Calculate basic support amount based on combined income and number of children
  let basicSupport = 0;

  if (guideline.method === 'Percentage of Income') {
    basicSupport = (combinedIncome * guideline.percentage / 100) / numberOfChildren;
  } else {
    // Income Shares approximation
    // This is a simplified calculation - real guidelines are more complex
    const baseSupportTable = [
      [0, 800, 1000, 1200, 1400],     // 1 child
      [0, 1100, 1350, 1600, 1850],    // 2 children
      [0, 1300, 1600, 1900, 2200],    // 3 children
      [0, 1450, 1800, 2150, 2500]     // 4+ children
    ];

    const incomeBracket = combinedIncome < 2000 ? 0 :
                         combinedIncome < 4000 ? 1 :
                         combinedIncome < 6000 ? 2 :
                         combinedIncome < 8000 ? 3 : 4;

    const childIndex = Math.min(numberOfChildren - 1, 3);
    basicSupport = baseSupportTable[childIndex][incomeBracket];
  }

  return {
    basicSupport,
    description: guideline.description,
    method: guideline.method
  };
}

/**
 * Calculate additional child support expenses
 */
export function calculateAdditionalExpenses(
  medicalExpenses: number,
  educationalExpenses: number,
  childcareExpenses: number,
  otherExpenses: number,
  numberOfChildren: number,
  splitRatio: number = 0.5 // 50/50 split by default
): {
  totalAdditionalExpenses: number;
  nonCustodialParentShare: number;
  monthlyAdditionalPayment: number;
  annualAdditionalPayment: number;
  expenseBreakdown: {
    medical: number;
    educational: number;
    childcare: number;
    other: number;
  };
} {
  if (medicalExpenses < 0 || educationalExpenses < 0 || childcareExpenses < 0 || otherExpenses < 0) {
    throw new Error('Expense amounts cannot be negative');
  }
  if (splitRatio < 0 || splitRatio > 1) {
    throw new Error('Split ratio must be between 0 and 1');
  }

  const totalAdditionalExpenses = medicalExpenses + educationalExpenses + childcareExpenses + otherExpenses;
  const nonCustodialParentShare = totalAdditionalExpenses * splitRatio;

  return {
    totalAdditionalExpenses: Math.round(totalAdditionalExpenses * 100) / 100,
    nonCustodialParentShare: Math.round(nonCustodialParentShare * 100) / 100,
    monthlyAdditionalPayment: Math.round(nonCustodialParentShare * 100) / 100,
    annualAdditionalPayment: Math.round(nonCustodialParentShare * 12 * 100) / 100,
    expenseBreakdown: {
      medical: Math.round(medicalExpenses * splitRatio * 100) / 100,
      educational: Math.round(educationalExpenses * splitRatio * 100) / 100,
      childcare: Math.round(childcareExpenses * splitRatio * 100) / 100,
      other: Math.round(otherExpenses * splitRatio * 100) / 100
    }
  };
}

/**
 * Calculate child support modification
 */
export function calculateSupportModification(
  currentSupport: number,
  newCircumstances: {
    incomeChange: number; // Percentage change in income
    additionalChildren: number;
    costOfLivingIncrease: number; // Percentage
    medicalExpensesChange: number;
  },
  modificationThreshold: number = 10 // 10% change threshold
): {
  modifiedSupport: number;
  monthlyChange: number;
  annualChange: number;
  modificationNeeded: boolean;
  reason: string;
} {
  let modifiedSupport = currentSupport;
  let reason = '';

  // Check income change
  if (Math.abs(newCircumstances.incomeChange) >= modificationThreshold) {
    const incomeMultiplier = 1 + (newCircumstances.incomeChange / 100);
    modifiedSupport *= incomeMultiplier;
    reason += `Income change of ${newCircumstances.incomeChange}%. `;
  }

  // Check additional children
  if (newCircumstances.additionalChildren > 0) {
    modifiedSupport *= (1 + newCircumstances.additionalChildren * 0.15);
    reason += `Additional ${newCircumstances.additionalChildren} children. `;
  }

  // Check cost of living increase
  if (newCircumstances.costOfLivingIncrease >= modificationThreshold) {
    const colMultiplier = 1 + (newCircumstances.costOfLivingIncrease / 100);
    modifiedSupport *= colMultiplier;
    reason += `Cost of living increase of ${newCircumstances.costOfLivingIncrease}%. `;
  }

  // Check medical expenses change
  if (Math.abs(newCircumstances.medicalExpensesChange) > 0) {
    modifiedSupport += newCircumstances.medicalExpensesChange;
    reason += `Medical expenses change of $${newCircumstances.medicalExpensesChange}. `;
  }

  const monthlyChange = modifiedSupport - currentSupport;
  const annualChange = monthlyChange * 12;
  const modificationNeeded = Math.abs(monthlyChange) >= (currentSupport * modificationThreshold / 100);

  return {
    modifiedSupport: Math.round(modifiedSupport * 100) / 100,
    monthlyChange: Math.round(monthlyChange * 100) / 100,
    annualChange: Math.round(annualChange * 100) / 100,
    modificationNeeded,
    reason: reason || 'No significant changes requiring modification'
  };
}

/**
 * Calculate child support arrears and interest
 */
export function calculateChildSupportArrears(
  monthlyPayment: number,
  monthsOwed: number,
  interestRate: number = 5, // 5% annual interest
  paymentsMade: number[] = []
): {
  totalOwed: number;
  principalOwed: number;
  interestOwed: number;
  monthlyBreakdown: Array<{
    month: number;
    payment: number;
    interest: number;
    total: number;
    balance: number;
  }>;
} {
  if (monthlyPayment < 0) {
    throw new Error('Monthly payment cannot be negative');
  }
  if (monthsOwed < 0) {
    throw new Error('Months owed cannot be negative');
  }
  if (interestRate < 0) {
    throw new Error('Interest rate cannot be negative');
  }

  const principalOwed = monthlyPayment * monthsOwed;
  let totalOwed = 0;
  let interestOwed = 0;
  let balance = principalOwed;

  const monthlyBreakdown = [];

  for (let month = 1; month <= monthsOwed; month++) {
    const monthlyInterest = balance * (interestRate / 100 / 12);
    const payment = paymentsMade[month - 1] || 0;
    const totalDue = monthlyPayment + monthlyInterest;

    balance = balance + monthlyInterest - payment;
    totalOwed += totalDue;
    interestOwed += monthlyInterest;

    monthlyBreakdown.push({
      month,
      payment: Math.round(payment * 100) / 100,
      interest: Math.round(monthlyInterest * 100) / 100,
      total: Math.round(totalDue * 100) / 100,
      balance: Math.round(Math.max(0, balance) * 100) / 100
    });
  }

  return {
    totalOwed: Math.round(totalOwed * 100) / 100,
    principalOwed: Math.round(principalOwed * 100) / 100,
    interestOwed: Math.round(interestOwed * 100) / 100,
    monthlyBreakdown
  };
}

/**
 * Main child support calculation function
 */
export function calculateChildSupport(inputs: any): any {
  const {
    calculationMethod,
    custodialParentIncome,
    nonCustodialParentIncome,
    numberOfChildren,
    custodyArrangement,
    state,
    percentage,
    minimumAmount,
    maximumAmount,
    standardOfLiving,
    medicalExpenses,
    educationalExpenses,
    childcareExpenses,
    otherExpenses,
    splitRatio,
    currentSupport,
    newCircumstances,
    modificationThreshold,
    monthlyPayment,
    monthsOwed,
    interestRate,
    paymentsMade
  } = inputs;

  switch (calculationMethod) {
    case 'income_shares':
      return calculateIncomeSharesSupport(
        custodialParentIncome,
        nonCustodialParentIncome,
        numberOfChildren,
        custodyArrangement,
        state
      );

    case 'percentage_of_income':
      return calculatePercentageOfIncomeSupport(
        nonCustodialParentIncome,
        numberOfChildren,
        percentage,
        minimumAmount,
        maximumAmount
      );

    case 'melson_formula':
      return calculateMelsonFormulaSupport(
        custodialParentIncome,
        nonCustodialParentIncome,
        numberOfChildren,
        standardOfLiving
      );

    case 'additional_expenses':
      return calculateAdditionalExpenses(
        medicalExpenses,
        educationalExpenses,
        childcareExpenses,
        otherExpenses,
        numberOfChildren,
        splitRatio
      );

    case 'modification':
      return calculateSupportModification(
        currentSupport,
        newCircumstances,
        modificationThreshold
      );

    case 'arrears':
      return calculateChildSupportArrears(
        monthlyPayment,
        monthsOwed,
        interestRate,
        paymentsMade
      );

    case 'comprehensive':
      // Calculate basic support + additional expenses
      const basicSupport = calculateIncomeSharesSupport(
        custodialParentIncome,
        nonCustodialParentIncome,
        numberOfChildren,
        custodyArrangement,
        state
      );

      const additionalExpenses = calculateAdditionalExpenses(
        medicalExpenses || 0,
        educationalExpenses || 0,
        childcareExpenses || 0,
        otherExpenses || 0,
        numberOfChildren,
        splitRatio || 0.5
      );

      return {
        basicSupport,
        additionalExpenses,
        totalMonthlySupport: basicSupport.monthlyPayment + additionalExpenses.monthlyAdditionalPayment,
        totalAnnualSupport: basicSupport.annualPayment + additionalExpenses.annualAdditionalPayment,
        summary: {
          custodialParentIncome,
          nonCustodialParentIncome,
          numberOfChildren,
          custodyArrangement,
          state,
          totalMonthlyPayment: Math.round((basicSupport.monthlyPayment + additionalExpenses.monthlyAdditionalPayment) * 100) / 100,
          totalAnnualPayment: Math.round((basicSupport.annualPayment + additionalExpenses.annualAdditionalPayment) * 100) / 100
        }
      };

    default:
      throw new Error('Unknown child support calculation method');
  }
}