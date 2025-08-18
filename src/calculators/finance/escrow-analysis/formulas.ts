import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Calculate monthly escrow payment
function calculateMonthlyEscrowPayment(inputs: CalculatorInputs): number {
  const {
    annualPropertyTax, annualHomeInsurance, annualPMI, annualFloodInsurance
  } = inputs;

  const totalAnnualEscrow = (Number(annualPropertyTax) || 0) + 
                           (Number(annualHomeInsurance) || 0) + 
                           (Number(annualPMI) || 0) + 
                           (Number(annualFloodInsurance) || 0);

  return totalAnnualEscrow / 12;
}

// Calculate required escrow balance
function calculateRequiredEscrowBalance(monthlyEscrowPayment: number, escrowCushion: number): number {
  return (2 * monthlyEscrowPayment) + Number(escrowCushion);
}

// Calculate escrow shortage or surplus
function calculateEscrowShortageSurplus(currentBalance: number, requiredBalance: number): {
  shortage: number;
  surplus: number;
} {
  const difference = requiredBalance - currentBalance;
  
  return {
    shortage: difference > 0 ? difference : 0,
    surplus: difference < 0 ? Math.abs(difference) : 0
  };
}

// Calculate shortage payment
function calculateShortagePayment(shortage: number): number {
  return shortage / 12;
}

// Calculate surplus refund
function calculateSurplusRefund(surplus: number): number {
  // Lenders typically refund surpluses over $50
  return surplus > 50 ? surplus : 0;
}

// Get next escrow analysis date
function getNextEscrowAnalysisDate(): string {
  const today = new Date();
  const nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
  return nextYear.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Generate projected payments
function generateProjectedPayments(inputs: CalculatorInputs, monthlyEscrowPayment: number): string {
  const {
    annualPropertyTax, annualHomeInsurance, annualPMI, annualFloodInsurance,
    propertyTaxPaymentFrequency, insurancePaymentFrequency, pmiPaymentFrequency,
    floodInsurancePaymentFrequency, analysisPeriod
  } = inputs;

  let projections = '**Projected Payments (Next 12 Months):**\n\n';

  // Property tax payments
  if (Number(annualPropertyTax) > 0) {
    const taxPayment = Number(annualPropertyTax);
    const frequency = propertyTaxPaymentFrequency;
    projections += `**Property Tax**: $${taxPayment.toLocaleString()}\n`;
    projections += `• Frequency: ${frequency.replace('-', ' ')}\n`;
    projections += `• Payment Amount: $${(taxPayment / getPaymentFrequency(frequency)).toLocaleString()}\n\n`;
  }

  // Home insurance payments
  if (Number(annualHomeInsurance) > 0) {
    const insurancePayment = Number(annualHomeInsurance);
    const frequency = insurancePaymentFrequency;
    projections += `**Home Insurance**: $${insurancePayment.toLocaleString()}\n`;
    projections += `• Frequency: ${frequency.replace('-', ' ')}\n`;
    projections += `• Payment Amount: $${(insurancePayment / getPaymentFrequency(frequency)).toLocaleString()}\n\n`;
  }

  // PMI payments
  if (Number(annualPMI) > 0) {
    const pmiPayment = Number(annualPMI);
    const frequency = pmiPaymentFrequency || 'monthly';
    projections += `**PMI**: $${pmiPayment.toLocaleString()}\n`;
    projections += `• Frequency: ${frequency.replace('-', ' ')}\n`;
    projections += `• Payment Amount: $${(pmiPayment / getPaymentFrequency(frequency)).toLocaleString()}\n\n`;
  }

  // Flood insurance payments
  if (Number(annualFloodInsurance) > 0) {
    const floodPayment = Number(annualFloodInsurance);
    const frequency = floodInsurancePaymentFrequency || 'annually';
    projections += `**Flood Insurance**: $${floodPayment.toLocaleString()}\n`;
    projections += `• Frequency: ${frequency.replace('-', ' ')}\n`;
    projections += `• Payment Amount: $${(floodPayment / getPaymentFrequency(frequency)).toLocaleString()}\n\n`;
  }

  projections += `**Total Monthly Escrow**: $${monthlyEscrowPayment.toLocaleString()}\n`;
  projections += `**Total Annual Escrow**: $${(monthlyEscrowPayment * 12).toLocaleString()}\n`;

  return projections;
}

// Get payment frequency multiplier
function getPaymentFrequency(frequency: string): number {
  switch (frequency) {
    case 'monthly': return 12;
    case 'quarterly': return 4;
    case 'semi-annually': return 2;
    case 'annually': return 1;
    default: return 12;
  }
}

// Generate escrow account status
function generateEscrowAccountStatus(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const { escrowShortage, escrowSurplus, requiredEscrowBalance, currentEscrowBalance } = outputs;
  const { paymentHistory, escrowAccountType } = inputs;

  let status = '**Escrow Account Status:**\n\n';

  if (escrowShortage > 0) {
    status += '⚠️ **ESCROW SHORTAGE**\n';
    status += `• Current Balance: $${Number(currentEscrowBalance).toLocaleString()}\n`;
    status += `• Required Balance: $${requiredEscrowBalance.toLocaleString()}\n`;
    status += `• Shortage Amount: $${escrowShortage.toLocaleString()}\n`;
    status += `• Monthly Shortage Payment: $${outputs.shortagePayment.toLocaleString()}\n\n`;
  } else if (escrowSurplus > 0) {
    status += '✅ **ESCROW SURPLUS**\n';
    status += `• Current Balance: $${Number(currentEscrowBalance).toLocaleString()}\n`;
    status += `• Required Balance: $${requiredEscrowBalance.toLocaleString()}\n`;
    status += `• Surplus Amount: $${escrowSurplus.toLocaleString()}\n`;
    if (outputs.surplusRefund > 0) {
      status += `• Available for Refund: $${outputs.surplusRefund.toLocaleString()}\n`;
    }
    status += '\n';
  } else {
    status += '✅ **ESCROW BALANCED**\n';
    status += `• Current Balance: $${Number(currentEscrowBalance).toLocaleString()}\n`;
    status += `• Required Balance: $${requiredEscrowBalance.toLocaleString()}\n\n`;
  }

  status += `**Account Type**: ${escrowAccountType.replace('-', ' ')}\n`;
  status += `**Payment History**: ${paymentHistory.replace('-', ' ')}\n`;
  status += `**Next Analysis**: ${outputs.nextEscrowAnalysis}\n`;

  return status;
}

// Generate recommendations
function generateRecommendations(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const { escrowShortage, escrowSurplus, shortagePayment } = outputs;
  const { paymentHistory, escrowAccountType } = inputs;

  let recommendations = '**Recommendations:**\n\n';

  if (escrowShortage > 0) {
    recommendations += '💰 **Address Escrow Shortage:**\n';
    recommendations += `• Pay shortage amount: $${escrowShortage.toLocaleString()}\n`;
    recommendations += `• Increase monthly payment by: $${shortagePayment.toLocaleString()}\n`;
    recommendations += `• Consider lump sum payment to avoid payment increase\n\n`;
  }

  if (escrowSurplus > 50) {
    recommendations += '💵 **Escrow Surplus Available:**\n';
    recommendations += `• Request refund of: $${outputs.surplusRefund.toLocaleString()}\n`;
    recommendations += `• Apply refund to principal to reduce loan balance\n`;
    recommendations += `• Use refund for home improvements or emergency fund\n\n`;
  }

  if (paymentHistory !== 'current') {
    recommendations += '⚠️ **Payment History Issues:**\n';
    recommendations += '• Bring account current to avoid escrow issues\n';
    recommendations += '• Contact lender about payment arrangements\n';
    recommendations += '• Consider automatic payments to avoid late fees\n\n';
  }

  if (escrowAccountType === 'waived') {
    recommendations += '📋 **Escrow Waived:**\n';
    recommendations += '• Ensure timely payment of property taxes\n';
    recommendations += '• Maintain insurance coverage\n';
    recommendations += '• Consider setting up separate savings account\n\n';
  }

  recommendations += '📊 **General Recommendations:**\n';
  recommendations += '• Review escrow analysis annually\n';
  recommendations += '• Monitor property tax assessments\n';
  recommendations += '• Shop for better insurance rates\n';
  recommendations += '• Keep emergency fund for unexpected increases\n';

  return recommendations;
}

// Generate cost breakdown
function generateCostBreakdown(inputs: CalculatorInputs, monthlyEscrowPayment: number): string {
  const {
    annualPropertyTax, annualHomeInsurance, annualPMI, annualFloodInsurance,
    propertyTaxPaymentFrequency, insurancePaymentFrequency, pmiPaymentFrequency,
    floodInsurancePaymentFrequency
  } = inputs;

  let breakdown = '**Escrow Cost Breakdown:**\n\n';

  const totalAnnual = (Number(annualPropertyTax) || 0) + 
                     (Number(annualHomeInsurance) || 0) + 
                     (Number(annualPMI) || 0) + 
                     (Number(annualFloodInsurance) || 0);

  breakdown += `**Annual Costs:**\n`;
  if (Number(annualPropertyTax) > 0) {
    breakdown += `• Property Tax: $${Number(annualPropertyTax).toLocaleString()} (${((Number(annualPropertyTax) / totalAnnual) * 100).toFixed(1)}%)\n`;
  }
  if (Number(annualHomeInsurance) > 0) {
    breakdown += `• Home Insurance: $${Number(annualHomeInsurance).toLocaleString()} (${((Number(annualHomeInsurance) / totalAnnual) * 100).toFixed(1)}%)\n`;
  }
  if (Number(annualPMI) > 0) {
    breakdown += `• PMI: $${Number(annualPMI).toLocaleString()} (${((Number(annualPMI) / totalAnnual) * 100).toFixed(1)}%)\n`;
  }
  if (Number(annualFloodInsurance) > 0) {
    breakdown += `• Flood Insurance: $${Number(annualFloodInsurance).toLocaleString()} (${((Number(annualFloodInsurance) / totalAnnual) * 100).toFixed(1)}%)\n`;
  }
  breakdown += `• **Total Annual**: $${totalAnnual.toLocaleString()}\n\n`;

  breakdown += `**Monthly Breakdown:**\n`;
  breakdown += `• Monthly Escrow Payment: $${monthlyEscrowPayment.toLocaleString()}\n`;
  breakdown += `• Property Tax (monthly): $${((Number(annualPropertyTax) || 0) / 12).toLocaleString()}\n`;
  breakdown += `• Insurance (monthly): $${((Number(annualHomeInsurance) || 0) / 12).toLocaleString()}\n`;
  breakdown += `• PMI (monthly): $${((Number(annualPMI) || 0) / 12).toLocaleString()}\n`;
  breakdown += `• Flood Insurance (monthly): $${((Number(annualFloodInsurance) || 0) / 12).toLocaleString()}\n`;

  return breakdown;
}

// Generate future projections
function generateFutureProjections(inputs: CalculatorInputs): string {
  const {
    annualPropertyTax, annualHomeInsurance, annualPMI, annualFloodInsurance,
    taxAssessmentIncrease, insuranceRateIncrease, analysisPeriod
  } = inputs;

  let projections = '**Future Cost Projections:**\n\n';

  const years = Math.ceil(Number(analysisPeriod) / 12);

  projections += `**Projected Increases (${years} years):**\n\n`;

  // Property tax projections
  if (Number(annualPropertyTax) > 0) {
    const currentTax = Number(annualPropertyTax);
    const taxIncrease = Number(taxAssessmentIncrease) / 100;
    
    projections += `**Property Tax:**\n`;
    projections += `• Current: $${currentTax.toLocaleString()}\n`;
    for (let year = 1; year <= Math.min(years, 5); year++) {
      const projectedTax = currentTax * Math.pow(1 + taxIncrease, year);
      projections += `• Year ${year}: $${Math.round(projectedTax).toLocaleString()}\n`;
    }
    projections += '\n';
  }

  // Insurance projections
  if (Number(annualHomeInsurance) > 0) {
    const currentInsurance = Number(annualHomeInsurance);
    const insuranceIncrease = Number(insuranceRateIncrease) / 100;
    
    projections += `**Home Insurance:**\n`;
    projections += `• Current: $${currentInsurance.toLocaleString()}\n`;
    for (let year = 1; year <= Math.min(years, 5); year++) {
      const projectedInsurance = currentInsurance * Math.pow(1 + insuranceIncrease, year);
      projections += `• Year ${year}: $${Math.round(projectedInsurance).toLocaleString()}\n`;
    }
    projections += '\n';
  }

  // PMI projections (typically decreases or disappears)
  if (Number(annualPMI) > 0) {
    projections += `**PMI:**\n`;
    projections += `• Current: $${Number(annualPMI).toLocaleString()}\n`;
    projections += `• Note: PMI typically decreases or is removed when LTV reaches 80%\n\n`;
  }

  projections += `**Impact on Monthly Payment:**\n`;
  projections += `• Monitor annual escrow analysis for payment adjustments\n`;
  projections += `• Plan for increasing costs over time\n`;
  projections += `• Consider refinancing if rates improve significantly\n`;

  return projections;
}

export function calculateEscrowAnalysis(inputs: CalculatorInputs): CalculatorOutputs {
  const {
    propertyValue, loanAmount, interestRate, loanTerm, monthlyPayment,
    currentEscrowBalance, annualPropertyTax, annualHomeInsurance,
    annualPMI, annualFloodInsurance, escrowCushion, taxAssessmentIncrease,
    insuranceRateIncrease, analysisPeriod, paymentHistory, escrowAccountType
  } = inputs;

  // Calculate monthly escrow payment
  const monthlyEscrowPayment = calculateMonthlyEscrowPayment(inputs);

  // Calculate total monthly payment
  const totalMonthlyPayment = Number(monthlyPayment) + monthlyEscrowPayment;

  // Calculate required escrow balance
  const requiredEscrowBalance = calculateRequiredEscrowBalance(monthlyEscrowPayment, Number(escrowCushion));

  // Calculate shortage/surplus
  const { shortage, surplus } = calculateEscrowShortageSurplus(Number(currentEscrowBalance), requiredEscrowBalance);

  // Calculate shortage payment
  const shortagePayment = calculateShortagePayment(shortage);

  // Calculate surplus refund
  const surplusRefund = calculateSurplusRefund(surplus);

  // Get next analysis date
  const nextEscrowAnalysis = getNextEscrowAnalysisDate();

  // Generate analysis components
  const projectedPayments = generateProjectedPayments(inputs, monthlyEscrowPayment);
  const escrowAccountStatus = generateEscrowAccountStatus(inputs, {
    escrowShortage: shortage,
    escrowSurplus: surplus,
    requiredEscrowBalance,
    currentEscrowBalance: Number(currentEscrowBalance),
    shortagePayment,
    surplusRefund,
    nextEscrowAnalysis,
    monthlyEscrowPayment,
    totalMonthlyPayment,
    projectedPayments: '',
    escrowAccountStatus: '',
    recommendations: '',
    costBreakdown: '',
    futureProjections: '',
    escrowAnalysisReport: ''
  });
  const recommendations = generateRecommendations(inputs, {
    escrowShortage: shortage,
    escrowSurplus: surplus,
    shortagePayment,
    requiredEscrowBalance,
    currentEscrowBalance: Number(currentEscrowBalance),
    surplusRefund,
    nextEscrowAnalysis,
    monthlyEscrowPayment,
    totalMonthlyPayment,
    projectedPayments,
    escrowAccountStatus,
    recommendations: '',
    costBreakdown: '',
    futureProjections: '',
    escrowAnalysisReport: ''
  });
  const costBreakdown = generateCostBreakdown(inputs, monthlyEscrowPayment);
  const futureProjections = generateFutureProjections(inputs);

  return {
    monthlyEscrowPayment: Math.round(monthlyEscrowPayment),
    totalMonthlyPayment: Math.round(totalMonthlyPayment),
    requiredEscrowBalance: Math.round(requiredEscrowBalance),
    escrowShortage: Math.round(shortage),
    escrowSurplus: Math.round(surplus),
    shortagePayment: Math.round(shortagePayment),
    surplusRefund: Math.round(surplusRefund),
    nextEscrowAnalysis,
    projectedPayments,
    escrowAccountStatus,
    recommendations,
    costBreakdown,
    futureProjections,
    escrowAnalysisReport: 'Comprehensive escrow analysis completed'
  };
}

export function generateEscrowAnalysisReport(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const {
    propertyValue, loanAmount, interestRate, loanTerm, monthlyPayment,
    currentEscrowBalance, annualPropertyTax, annualHomeInsurance,
    annualPMI, annualFloodInsurance, escrowCushion, taxAssessmentIncrease,
    insuranceRateIncrease, analysisPeriod, paymentHistory, escrowAccountType
  } = inputs;

  const {
    monthlyEscrowPayment, totalMonthlyPayment, requiredEscrowBalance,
    escrowShortage, escrowSurplus, shortagePayment, surplusRefund,
    nextEscrowAnalysis, projectedPayments, escrowAccountStatus,
    recommendations, costBreakdown, futureProjections
  } = outputs;

  let report = `# Escrow Analysis Report\n\n`;

  report += `## Loan Information\n`;
  report += `• **Property Value**: $${Number(propertyValue).toLocaleString()}\n`;
  report += `• **Loan Amount**: $${Number(loanAmount).toLocaleString()}\n`;
  report += `• **Interest Rate**: ${interestRate}%\n`;
  report += `• **Loan Term**: ${loanTerm} years\n`;
  report += `• **Monthly P&I Payment**: $${Number(monthlyPayment).toLocaleString()}\n\n`;

  report += `## Escrow Account Summary\n`;
  report += `• **Current Escrow Balance**: $${Number(currentEscrowBalance).toLocaleString()}\n`;
  report += `• **Required Escrow Balance**: $${requiredEscrowBalance.toLocaleString()}\n`;
  report += `• **Monthly Escrow Payment**: $${monthlyEscrowPayment.toLocaleString()}\n`;
  report += `• **Total Monthly Payment**: $${totalMonthlyPayment.toLocaleString()}\n\n`;

  if (escrowShortage > 0) {
    report += `## ⚠️ Escrow Shortage\n`;
    report += `• **Shortage Amount**: $${escrowShortage.toLocaleString()}\n`;
    report += `• **Monthly Shortage Payment**: $${shortagePayment.toLocaleString()}\n`;
    report += `• **New Total Monthly Payment**: $${(totalMonthlyPayment + shortagePayment).toLocaleString()}\n\n`;
  } else if (escrowSurplus > 0) {
    report += `## ✅ Escrow Surplus\n`;
    report += `• **Surplus Amount**: $${escrowSurplus.toLocaleString()}\n`;
    if (surplusRefund > 0) {
      report += `• **Available for Refund**: $${surplusRefund.toLocaleString()}\n`;
    }
    report += '\n';
  }

  report += `## Escrow Components\n`;
  report += `• **Annual Property Tax**: $${Number(annualPropertyTax).toLocaleString()}\n`;
  report += `• **Annual Home Insurance**: $${Number(annualHomeInsurance).toLocaleString()}\n`;
  if (Number(annualPMI) > 0) {
    report += `• **Annual PMI**: $${Number(annualPMI).toLocaleString()}\n`;
  }
  if (Number(annualFloodInsurance) > 0) {
    report += `• **Annual Flood Insurance**: $${Number(annualFloodInsurance).toLocaleString()}\n`;
  }
  report += `• **Escrow Cushion**: $${Number(escrowCushion).toLocaleString()}\n\n`;

  report += `## Account Details\n`;
  report += `• **Account Type**: ${escrowAccountType.replace('-', ' ')}\n`;
  report += `• **Payment History**: ${paymentHistory.replace('-', ' ')}\n`;
  report += `• **Next Analysis Date**: ${nextEscrowAnalysis}\n`;
  report += `• **Analysis Period**: ${analysisPeriod} months\n\n`;

  report += `${costBreakdown}\n`;
  report += `${projectedPayments}\n`;
  report += `${escrowAccountStatus}\n`;
  report += `${recommendations}\n`;
  report += `${futureProjections}\n`;

  report += `## Next Steps\n`;
  report += `1. Review escrow analysis with lender\n`;
  report += `2. Address any shortages or request surplus refunds\n`;
  report += `3. Monitor property tax assessments and insurance rates\n`;
  report += `4. Plan for annual escrow analysis\n`;
  report += `5. Consider refinancing if rates improve significantly\n`;

  return report;
}
