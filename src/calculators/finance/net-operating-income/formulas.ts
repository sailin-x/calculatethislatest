export interface NetOperatingIncomeInputs {
  grossRentalIncome: number;
  otherIncome?: number;
  vacancyLoss: number;
  propertyManagementFee?: number;
  propertyTaxes: number;
  insurance: number;
  utilities: number;
  maintenance: number;
  landscaping?: number;
  cleaning?: number;
  advertising?: number;
  legalFees?: number;
  accountingFees?: number;
  hoaFees?: number;
  trashRemoval?: number;
  security?: number;
  otherExpenses?: number;
}

export interface ExpenseBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

export interface NetOperatingIncomeOutputs {
  grossIncome: number;
  effectiveGrossIncome: number;
  totalOperatingExpenses: number;
  netOperatingIncome: number;
  operatingExpenseRatio: number;
  netIncomeRatio: number;
  analysis: string;
}

/**
 * Calculate Net Operating Income (NOI)
 */
export function calculateNetOperatingIncome(inputs: NetOperatingIncomeInputs): NetOperatingIncomeOutputs {
  const {
    grossRentalIncome,
    otherIncome = 0,
    vacancyLoss,
    propertyManagementFee = 0,
    propertyTaxes,
    insurance,
    utilities,
    maintenance,
    landscaping = 0,
    cleaning = 0,
    advertising = 0,
    legalFees = 0,
    accountingFees = 0,
    hoaFees = 0,
    trashRemoval = 0,
    security = 0,
    otherExpenses = 0
  } = inputs;

  // Calculate gross income
  const grossIncome = grossRentalIncome + otherIncome;

  // Calculate vacancy loss
  const vacancyLossAmount = grossRentalIncome * (vacancyLoss / 100);

  // Calculate effective gross income
  const effectiveGrossIncome = grossIncome - vacancyLossAmount;

  // Calculate property management fee
  const propertyManagementAmount = effectiveGrossIncome * (propertyManagementFee / 100);

  // Calculate total operating expenses
  const totalOperatingExpenses = propertyManagementAmount + propertyTaxes + insurance + utilities + 
                                 maintenance + landscaping + cleaning + advertising + legalFees + 
                                 accountingFees + hoaFees + trashRemoval + security + otherExpenses;

  // Calculate NOI
  const netOperatingIncome = effectiveGrossIncome - totalOperatingExpenses;

  // Calculate ratios
  const operatingExpenseRatio = effectiveGrossIncome > 0 ? (totalOperatingExpenses / effectiveGrossIncome) * 100 : 0;
  const netIncomeRatio = effectiveGrossIncome > 0 ? (netOperatingIncome / effectiveGrossIncome) * 100 : 0;

  // Generate analysis
  const analysis = generateAnalysis(
    inputs,
    grossIncome,
    effectiveGrossIncome,
    totalOperatingExpenses,
    netOperatingIncome,
    operatingExpenseRatio,
    netIncomeRatio
  );

  return {
    grossIncome,
    effectiveGrossIncome,
    totalOperatingExpenses,
    netOperatingIncome,
    operatingExpenseRatio,
    netIncomeRatio,
    analysis
  };
}

/**
 * Generate detailed financial analysis
 */
function generateAnalysis(
  inputs: NetOperatingIncomeInputs,
  grossIncome: number,
  effectiveGrossIncome: number,
  totalOperatingExpenses: number,
  netOperatingIncome: number,
  operatingExpenseRatio: number,
  netIncomeRatio: number
): string {
  const {
    grossRentalIncome,
    otherIncome = 0,
    vacancyLoss,
    propertyManagementFee = 0,
    propertyTaxes,
    insurance,
    utilities,
    maintenance,
    landscaping = 0,
    cleaning = 0,
    advertising = 0,
    legalFees = 0,
    accountingFees = 0,
    hoaFees = 0,
    trashRemoval = 0,
    security = 0,
    otherExpenses = 0
  } = inputs;

  let analysis = `# Net Operating Income (NOI) Analysis\n\n`;

  // Income summary
  analysis += `## Income Summary\n`;
  analysis += `- **Gross Rental Income:** $${grossRentalIncome.toLocaleString()}\n`;
  if (otherIncome > 0) {
    analysis += `- **Other Income:** $${otherIncome.toLocaleString()}\n`;
  }
  analysis += `- **Total Gross Income:** $${grossIncome.toLocaleString()}\n`;
  analysis += `- **Vacancy Loss (${vacancyLoss}%):** $${(grossRentalIncome * vacancyLoss / 100).toLocaleString()}\n`;
  analysis += `- **Effective Gross Income:** $${effectiveGrossIncome.toLocaleString()}\n\n`;

  // Expense breakdown
  analysis += `## Operating Expenses Breakdown\n`;
  analysis += `- **Property Management (${propertyManagementFee}%):** $${(effectiveGrossIncome * propertyManagementFee / 100).toLocaleString()}\n`;
  analysis += `- **Property Taxes:** $${propertyTaxes.toLocaleString()}\n`;
  analysis += `- **Insurance:** $${insurance.toLocaleString()}\n`;
  analysis += `- **Utilities:** $${utilities.toLocaleString()}\n`;
  analysis += `- **Maintenance & Repairs:** $${maintenance.toLocaleString()}\n`;
  
  if (landscaping > 0) {
    analysis += `- **Landscaping:** $${landscaping.toLocaleString()}\n`;
  }
  if (cleaning > 0) {
    analysis += `- **Cleaning Services:** $${cleaning.toLocaleString()}\n`;
  }
  if (advertising > 0) {
    analysis += `- **Advertising & Marketing:** $${advertising.toLocaleString()}\n`;
  }
  if (legalFees > 0) {
    analysis += `- **Legal & Professional Fees:** $${legalFees.toLocaleString()}\n`;
  }
  if (accountingFees > 0) {
    analysis += `- **Accounting Fees:** $${accountingFees.toLocaleString()}\n`;
  }
  if (hoaFees > 0) {
    analysis += `- **HOA Fees:** $${hoaFees.toLocaleString()}\n`;
  }
  if (trashRemoval > 0) {
    analysis += `- **Trash Removal:** $${trashRemoval.toLocaleString()}\n`;
  }
  if (security > 0) {
    analysis += `- **Security Services:** $${security.toLocaleString()}\n`;
  }
  if (otherExpenses > 0) {
    analysis += `- **Other Expenses:** $${otherExpenses.toLocaleString()}\n`;
  }
  
  analysis += `- **Total Operating Expenses:** $${totalOperatingExpenses.toLocaleString()}\n\n`;

  // NOI summary
  analysis += `## Net Operating Income Summary\n`;
  analysis += `- **Net Operating Income (NOI):** $${netOperatingIncome.toLocaleString()}\n`;
  analysis += `- **Operating Expense Ratio:** ${operatingExpenseRatio.toFixed(1)}%\n`;
  analysis += `- **Net Income Ratio:** ${netIncomeRatio.toFixed(1)}%\n\n`;

  // Performance analysis
  analysis += `## Performance Analysis\n`;
  
  // Vacancy analysis
  if (vacancyLoss > 10) {
    analysis += `- **⚠️ High Vacancy Rate:** ${vacancyLoss}% vacancy loss is above typical market rates\n`;
  } else if (vacancyLoss < 3) {
    analysis += `- **✅ Low Vacancy Rate:** ${vacancyLoss}% vacancy loss indicates strong tenant retention\n`;
  } else {
    analysis += `- **📊 Normal Vacancy Rate:** ${vacancyLoss}% vacancy loss is within typical market range\n`;
  }

  // Operating expense ratio analysis
  if (operatingExpenseRatio > 70) {
    analysis += `- **⚠️ High Operating Expenses:** ${operatingExpenseRatio.toFixed(1)}% expense ratio is above optimal levels\n`;
  } else if (operatingExpenseRatio < 40) {
    analysis += `- **✅ Excellent Expense Control:** ${operatingExpenseRatio.toFixed(1)}% expense ratio shows strong cost management\n`;
  } else {
    analysis += `- **📊 Good Expense Management:** ${operatingExpenseRatio.toFixed(1)}% expense ratio is within optimal range\n`;
  }

  // NOI margin analysis
  if (netIncomeRatio > 60) {
    analysis += `- **✅ Exceptional NOI Margin:** ${netIncomeRatio.toFixed(1)}% NOI ratio indicates excellent profitability\n`;
  } else if (netIncomeRatio > 40) {
    analysis += `- **📊 Strong NOI Performance:** ${netIncomeRatio.toFixed(1)}% NOI ratio shows good profitability\n`;
  } else if (netIncomeRatio > 25) {
    analysis += `- **⚠️ Moderate NOI Performance:** ${netIncomeRatio.toFixed(1)}% NOI ratio may need improvement\n`;
  } else {
    analysis += `- **❌ Poor NOI Performance:** ${netIncomeRatio.toFixed(1)}% NOI ratio indicates significant issues\n`;
  }

  // Property type analysis
  analysis += `\n## Property Type Considerations\n`;
  if (grossRentalIncome > 500000) {
    analysis += `- **Commercial Property:** Large-scale operations typically have lower expense ratios\n`;
  } else if (grossRentalIncome > 100000) {
    analysis += `- **Multi-Family Property:** Medium-scale operations with typical expense ratios\n`;
  } else {
    analysis += `- **Single-Family/Small Property:** Smaller operations may have higher per-unit expenses\n`;
  }

  // Recommendations
  analysis += `\n## Recommendations\n`;
  
  if (vacancyLoss > 8) {
    analysis += `- **Reduce Vacancy:** Consider marketing improvements, tenant retention programs, or rent adjustments\n`;
  }
  
  if (operatingExpenseRatio > 65) {
    analysis += `- **Optimize Expenses:** Review utility costs, maintenance contracts, and service providers\n`;
  }
  
  if (netIncomeRatio < 30) {
    analysis += `- **Improve NOI:** Focus on increasing rental rates, reducing expenses, or both\n`;
  }
  
  if (netIncomeRatio > 50) {
    analysis += `- **Strong Performance:** Property is performing well - consider expansion or refinancing opportunities\n`;
  }

  return analysis;
}

/**
 * Calculate expense breakdown by category
 */
export function calculateExpenseBreakdown(inputs: NetOperatingIncomeInputs): ExpenseBreakdown[] {
  const {
    propertyManagementFee = 0,
    propertyTaxes,
    insurance,
    utilities,
    maintenance,
    landscaping = 0,
    cleaning = 0,
    advertising = 0,
    legalFees = 0,
    accountingFees = 0,
    hoaFees = 0,
    trashRemoval = 0,
    security = 0,
    otherExpenses = 0
  } = inputs;

  // Calculate effective gross income for property management fee
  const grossRentalIncome = inputs.grossRentalIncome;
  const otherIncome = inputs.otherIncome || 0;
  const vacancyLoss = inputs.vacancyLoss;
  const vacancyLossAmount = grossRentalIncome * (vacancyLoss / 100);
  const effectiveGrossIncome = (grossRentalIncome + otherIncome) - vacancyLossAmount;
  const propertyManagementAmount = effectiveGrossIncome * (propertyManagementFee / 100);

  const expenses: ExpenseBreakdown[] = [
    { category: 'Property Management', amount: propertyManagementAmount, percentage: 0 },
    { category: 'Property Taxes', amount: propertyTaxes, percentage: 0 },
    { category: 'Insurance', amount: insurance, percentage: 0 },
    { category: 'Utilities', amount: utilities, percentage: 0 },
    { category: 'Maintenance & Repairs', amount: maintenance, percentage: 0 },
    { category: 'Landscaping', amount: landscaping, percentage: 0 },
    { category: 'Cleaning Services', amount: cleaning, percentage: 0 },
    { category: 'Advertising & Marketing', amount: advertising, percentage: 0 },
    { category: 'Legal & Professional Fees', amount: legalFees, percentage: 0 },
    { category: 'Accounting Fees', amount: accountingFees, percentage: 0 },
    { category: 'HOA Fees', amount: hoaFees, percentage: 0 },
    { category: 'Trash Removal', amount: trashRemoval, percentage: 0 },
    { category: 'Security Services', amount: security, percentage: 0 },
    { category: 'Other Expenses', amount: otherExpenses, percentage: 0 }
  ];

  // Calculate total and percentages
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  expenses.forEach(expense => {
    expense.percentage = total > 0 ? (expense.amount / total) * 100 : 0;
  });

  // Filter out zero amounts and sort by amount
  return expenses
    .filter(expense => expense.amount > 0)
    .sort((a, b) => b.amount - a.amount);
}

/**
 * Calculate NOI per square foot
 */
export function calculateNOIPerSquareFoot(
  noi: number,
  totalSquareFootage: number
): number {
  return totalSquareFootage > 0 ? noi / totalSquareFootage : 0;
}

/**
 * Calculate NOI per unit
 */
export function calculateNOIPerUnit(
  noi: number,
  numberOfUnits: number
): number {
  return numberOfUnits > 0 ? noi / numberOfUnits : 0;
}

/**
 * Calculate cap rate (requires property value)
 */
export function calculateCapRate(
  noi: number,
  propertyValue: number
): number {
  return propertyValue > 0 ? (noi / propertyValue) * 100 : 0;
}

/**
 * Calculate debt service coverage ratio (DSCR)
 */
export function calculateDSCR(
  noi: number,
  annualDebtService: number
): number {
  return annualDebtService > 0 ? noi / annualDebtService : 0;
}