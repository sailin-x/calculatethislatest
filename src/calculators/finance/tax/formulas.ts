import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// 2024 Federal Tax Brackets
const FEDERAL_TAX_BRACKETS_2024 = {
  'single': [
    { rate: 0.10, max: 11600 },
    { rate: 0.12, max: 47150 },
    { rate: 0.22, max: 100525 },
    { rate: 0.24, max: 191950 },
    { rate: 0.32, max: 243725 },
    { rate: 0.35, max: 609350 },
    { rate: 0.37, max: Infinity }
  ],
  'married-filing-jointly': [
    { rate: 0.10, max: 23200 },
    { rate: 0.12, max: 94300 },
    { rate: 0.22, max: 201050 },
    { rate: 0.24, max: 383900 },
    { rate: 0.32, max: 487450 },
    { rate: 0.35, max: 731200 },
    { rate: 0.37, max: Infinity }
  ],
  'married-filing-separately': [
    { rate: 0.10, max: 11600 },
    { rate: 0.12, max: 47150 },
    { rate: 0.22, max: 100525 },
    { rate: 0.24, max: 191950 },
    { rate: 0.32, max: 243725 },
    { rate: 0.35, max: 365600 },
    { rate: 0.37, max: Infinity }
  ],
  'head-of-household': [
    { rate: 0.10, max: 16550 },
    { rate: 0.12, max: 63100 },
    { rate: 0.22, max: 100500 },
    { rate: 0.24, max: 191950 },
    { rate: 0.32, max: 243700 },
    { rate: 0.35, max: 609350 },
    { rate: 0.37, max: Infinity }
  ],
  'qualifying-widow': [
    { rate: 0.10, max: 23200 },
    { rate: 0.12, max: 94300 },
    { rate: 0.22, max: 201050 },
    { rate: 0.24, max: 383900 },
    { rate: 0.32, max: 487450 },
    { rate: 0.35, max: 731200 },
    { rate: 0.37, max: Infinity }
  ]
};

// 2024 Standard Deductions
const STANDARD_DEDUCTIONS_2024 = {
  'single': 14600,
  'married-filing-jointly': 29200,
  'married-filing-separately': 14600,
  'head-of-household': 21900,
  'qualifying-widow': 29200
};

// State tax rates (simplified - actual rates vary by income)
const STATE_TAX_RATES = {
  'ca': 0.075, // California - progressive but simplified
  'ny': 0.0685, // New York - progressive but simplified
  'tx': 0, // Texas - no state income tax
  'fl': 0, // Florida - no state income tax
  'wa': 0, // Washington - no state income tax
  'nv': 0, // Nevada - no state income tax
  'tn': 0, // Tennessee - no state income tax
  'sd': 0, // South Dakota - no state income tax
  'wy': 0, // Wyoming - no state income tax
  'nh': 0, // New Hampshire - no state income tax
  'al': 0.05,
  'ak': 0,
  'az': 0.0259,
  'ar': 0.055,
  'co': 0.044,
  'ct': 0.0699,
  'de': 0.066,
  'ga': 0.0575,
  'hi': 0.11,
  'id': 0.058,
  'il': 0.0495,
  'in': 0.0323,
  'ia': 0.0575,
  'ks': 0.057,
  'ky': 0.045,
  'la': 0.0425,
  'me': 0.0715,
  'md': 0.0575,
  'ma': 0.05,
  'mi': 0.0425,
  'mn': 0.0985,
  'ms': 0.05,
  'mo': 0.0495,
  'mt': 0.068,
  'ne': 0.0584,
  'nj': 0.0637,
  'nm': 0.059,
  'nc': 0.0499,
  'nd': 0.029,
  'oh': 0.0399,
  'ok': 0.0475,
  'or': 0.099,
  'pa': 0.0307,
  'ri': 0.0599,
  'sc': 0.07,
  'ut': 0.0485,
  'vt': 0.0875,
  'va': 0.0575,
  'wv': 0.065,
  'wi': 0.0765
};

function calculateFederalTax(taxableIncome: number, filingStatus: string): { tax: number; brackets: any[] } {
  const brackets = FEDERAL_TAX_BRACKETS_2024[filingStatus] || FEDERAL_TAX_BRACKETS_2024['single'];
  let remainingIncome = taxableIncome;
  let totalTax = 0;
  let bracketBreakdown = [];
  let previousMax = 0;

  for (let i = 0; i < brackets.length; i++) {
    const bracket = brackets[i];
    const bracketIncome = Math.min(remainingIncome, bracket.max - previousMax);
    
    if (bracketIncome > 0) {
      const bracketTax = bracketIncome * bracket.rate;
      totalTax += bracketTax;
      
      bracketBreakdown.push({
        rate: bracket.rate * 100,
        income: bracketIncome,
        tax: bracketTax,
        max: bracket.max
      });
      
      remainingIncome -= bracketIncome;
    }
    
    previousMax = bracket.max;
    
    if (remainingIncome <= 0) break;
  }

  return { tax: totalTax, brackets: bracketBreakdown };
}

function calculateStandardDeduction(filingStatus: string): number {
  return STANDARD_DEDUCTIONS_2024[filingStatus] || STANDARD_DEDUCTIONS_2024['single'];
}

function calculateItemizedDeductions(inputs: CalculatorInputs): number {
  const stateLocalTaxes = Math.min(inputs.stateLocalTaxes || 0, 10000); // SALT cap
  const mortgageInterest = inputs.mortgageInterest || 0;
  const charitableContributions = inputs.charitableContributions || 0;
  const medicalExpenses = inputs.medicalExpenses || 0;
  const casualtyLosses = inputs.casualtyLosses || 0;
  const miscDeductions = inputs.miscDeductions || 0;

  return stateLocalTaxes + mortgageInterest + charitableContributions + 
         medicalExpenses + casualtyLosses + miscDeductions;
}

function calculateChildTaxCredit(children: number, agi: number, filingStatus: string): number {
  if (!children || children <= 0) return 0;
  
  const maxCreditPerChild = 2000;
  const phaseoutStart = filingStatus === 'married-filing-jointly' ? 400000 : 200000;
  const phaseoutEnd = filingStatus === 'married-filing-jointly' ? 440000 : 240000;
  
  if (agi >= phaseoutEnd) return 0;
  if (agi <= phaseoutStart) return children * maxCreditPerChild;
  
  const reduction = (agi - phaseoutStart) / (phaseoutEnd - phaseoutStart);
  return Math.max(0, children * maxCreditPerChild * (1 - reduction));
}

function calculateEarnedIncomeCredit(wages: number, filingStatus: string, children: number): number {
  if (!wages || wages <= 0) return 0;
  
  // Simplified EIC calculation
  const maxCredit = children === 0 ? 600 : children === 1 ? 3995 : children === 2 ? 6604 : 7430;
  const phaseoutStart = filingStatus === 'married-filing-jointly' ? 25020 : 16480;
  const phaseoutEnd = filingStatus === 'married-filing-jointly' ? 63498 : 54838;
  
  if (wages >= phaseoutEnd) return 0;
  if (wages <= phaseoutStart) return maxCredit;
  
  const reduction = (wages - phaseoutStart) / (phaseoutEnd - phaseoutStart);
  return Math.max(0, maxCredit * (1 - reduction));
}

function calculateStateTax(state: string, taxableIncome: number): number {
  if (!state || !STATE_TAX_RATES[state]) return 0;
  return taxableIncome * STATE_TAX_RATES[state];
}

function calculateTaxEfficiencyScore(inputs: CalculatorInputs, outputs: CalculatorOutputs): number {
  let score = 50; // Base score
  
  // Deduction optimization
  const standardDeduction = calculateStandardDeduction(inputs.filingStatus || 'single');
  const itemizedDeductions = calculateItemizedDeductions(inputs);
  
  if (itemizedDeductions > standardDeduction) {
    score += 10; // Using itemized deductions effectively
  }
  
  // Credit utilization
  if (outputs.totalCredits > 0) {
    score += Math.min(20, outputs.totalCredits / 1000);
  }
  
  // Withholding accuracy
  const withholdingAccuracy = Math.abs(outputs.federalRefund) / outputs.federalTax;
  if (withholdingAccuracy < 0.1) {
    score += 10; // Good withholding accuracy
  } else if (withholdingAccuracy > 0.3) {
    score -= 10; // Poor withholding accuracy
  }
  
  // Income diversification
  const incomeSources = [
    inputs.wages, inputs.selfEmployment, inputs.interest, inputs.dividends,
    inputs.capitalGains, inputs.rentalIncome, inputs.businessIncome, inputs.otherIncome
  ].filter(income => income && income > 0).length;
  
  if (incomeSources > 3) {
    score += 5; // Good income diversification
  }
  
  return Math.max(0, Math.min(100, score));
}

function generateOptimizationSuggestions(inputs: CalculatorInputs, outputs: CalculatorOutputs): any[] {
  const suggestions = [];
  
  // Deduction optimization
  const standardDeduction = calculateStandardDeduction(inputs.filingStatus || 'single');
  const itemizedDeductions = calculateItemizedDeductions(inputs);
  
  if (itemizedDeductions < standardDeduction && inputs.mortgageInterest) {
    suggestions.push({
      type: 'deduction',
      title: 'Consider Itemizing Deductions',
      description: 'Your itemized deductions are close to the standard deduction. Consider timing charitable contributions or other deductible expenses.',
      potentialSavings: Math.min(1000, (standardDeduction - itemizedDeductions) * 0.22)
    });
  }
  
  // IRA contribution
  if (inputs.iraContribution && inputs.iraContribution < 7000) {
    suggestions.push({
      type: 'retirement',
      title: 'Maximize IRA Contribution',
      description: 'Consider contributing the maximum to your Traditional IRA to reduce taxable income.',
      potentialSavings: (7000 - inputs.iraContribution) * 0.22
    });
  }
  
  // HSA contribution
  if (inputs.hsaContribution && inputs.hsaContribution < 4150) {
    suggestions.push({
      type: 'health',
      title: 'Maximize HSA Contribution',
      description: 'Consider contributing the maximum to your HSA for additional tax savings.',
      potentialSavings: (4150 - inputs.hsaContribution) * 0.22
    });
  }
  
  // Withholding adjustment
  if (Math.abs(outputs.federalRefund) > outputs.federalTax * 0.1) {
    suggestions.push({
      type: 'withholding',
      title: 'Adjust Withholding',
      description: 'Consider adjusting your W-4 to improve withholding accuracy.',
      potentialSavings: 0 // No direct tax savings, but better cash flow
    });
  }
  
  return suggestions;
}

export function calculateTax(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract and set defaults
  const filingStatus = inputs.filingStatus || 'single';
  const taxYear = inputs.taxYear || '2024';
  
  // Calculate gross income
  const grossIncome = (inputs.wages || 0) + (inputs.selfEmployment || 0) + 
                     (inputs.interest || 0) + (inputs.dividends || 0) + 
                     (inputs.capitalGains || 0) + (inputs.rentalIncome || 0) + 
                     (inputs.businessIncome || 0) + (inputs.otherIncome || 0);
  
  // Calculate above-the-line deductions
  const aboveLineDeductions = (inputs.studentLoanInterest || 0) + 
                             (inputs.iraContribution || 0) + 
                             (inputs.hsaContribution || 0) + 
                             (inputs.selfEmploymentTax || 0) + 
                             (inputs.selfEmploymentHealth || 0) + 
                             (inputs.alimonyPaid || 0);
  
  // Calculate AGI
  const adjustedGrossIncome = Math.max(0, grossIncome - aboveLineDeductions);
  
  // Calculate deductions
  const standardDeductionAmount = calculateStandardDeduction(filingStatus);
  const itemizedDeductions = calculateItemizedDeductions(inputs);
  const deductionAmount = inputs.standardDeduction === 'itemized' ? 
                         Math.max(standardDeductionAmount, itemizedDeductions) : 
                         standardDeductionAmount;
  
  // Calculate taxable income
  const taxableIncome = Math.max(0, adjustedGrossIncome - deductionAmount);
  
  // Calculate federal tax
  const federalTaxResult = calculateFederalTax(taxableIncome, filingStatus);
  const federalTax = federalTaxResult.tax;
  
  // Calculate credits
  const childTaxCredit = calculateChildTaxCredit(inputs.childTaxCredit || 0, adjustedGrossIncome, filingStatus);
  const earnedIncomeCredit = inputs.earnedIncomeCredit === 'yes' ? 
                            calculateEarnedIncomeCredit(inputs.wages || 0, filingStatus, inputs.childTaxCredit || 0) : 0;
  const totalCredits = childTaxCredit + earnedIncomeCredit + (inputs.educationCredits || 0) + 
                      (inputs.adoptionCredit || 0) + (inputs.foreignTaxCredit || 0);
  
  // Calculate final federal tax
  const finalFederalTax = Math.max(0, federalTax - totalCredits);
  
  // Calculate state tax
  const stateTax = calculateStateTax(inputs.stateOfResidence, inputs.stateIncome || taxableIncome);
  
  // Calculate total tax
  const totalTax = finalFederalTax + stateTax;
  
  // Calculate refunds
  const federalRefund = (inputs.federalWithholding || 0) + (inputs.estimatedPayments || 0) + 
                       (inputs.otherPayments || 0) - finalFederalTax;
  const stateRefund = (inputs.stateWithholding || 0) - stateTax;
  const totalRefund = federalRefund + stateRefund;
  
  // Calculate rates
  const effectiveTaxRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;
  const marginalTaxRate = federalTaxResult.brackets.length > 0 ? 
                         federalTaxResult.brackets[federalTaxResult.brackets.length - 1].rate : 0;
  
  // Calculate AMT (simplified)
  const alternativeMinimumTax = inputs.amtIncome && inputs.amtIncome > 0 ? 
                               Math.max(0, inputs.amtIncome * 0.26 - 81000) : 0;
  
  // Generate analysis
  const taxEfficiencyScore = calculateTaxEfficiencyScore(inputs, {
    totalCredits,
    federalRefund,
    federalTax: finalFederalTax
  } as any);
  
  const optimizationSuggestions = generateOptimizationSuggestions(inputs, {
    federalRefund,
    federalTax: finalFederalTax
  } as any);
  
  const taxSavings = optimizationSuggestions.reduce((total, suggestion) => 
    total + (suggestion.potentialSavings || 0), 0);
  
  // Generate recommendations
  let recommendations = '';
  let keyInsights = '';
  
  if (federalRefund > 1000) {
    recommendations += 'Consider adjusting your W-4 to reduce over-withholding and improve cash flow. ';
  } else if (federalRefund < -1000) {
    recommendations += 'Consider increasing withholding or making estimated payments to avoid penalties. ';
  }
  
  if (itemizedDeductions > standardDeductionAmount) {
    recommendations += 'You\'re effectively using itemized deductions. Consider timing additional deductible expenses. ';
  }
  
  if (totalCredits > 0) {
    recommendations += 'Good utilization of tax credits. Continue to maximize eligible credits. ';
  }
  
  keyInsights = `Your effective tax rate is ${effectiveTaxRate.toFixed(1)}% with a marginal rate of ${marginalTaxRate.toFixed(1)}%. `;
  keyInsights += `You have ${optimizationSuggestions.length} optimization opportunities with potential savings of $${taxSavings.toFixed(0)}.`;
  
  return {
    grossIncome,
    adjustedGrossIncome,
    taxableIncome,
    federalTax: finalFederalTax,
    stateTax,
    totalTax,
    effectiveTaxRate,
    marginalTaxRate,
    federalRefund,
    stateRefund,
    totalRefund,
    standardDeductionAmount,
    itemizedDeductions,
    totalCredits,
    alternativeMinimumTax,
    taxBrackets: federalTaxResult.brackets,
    deductionAnalysis: [
      { type: 'Standard Deduction', amount: standardDeductionAmount, used: inputs.standardDeduction !== 'itemized' },
      { type: 'Itemized Deductions', amount: itemizedDeductions, used: inputs.standardDeduction === 'itemized' }
    ],
    creditAnalysis: [
      { type: 'Child Tax Credit', amount: childTaxCredit },
      { type: 'Earned Income Credit', amount: earnedIncomeCredit },
      { type: 'Education Credits', amount: inputs.educationCredits || 0 },
      { type: 'Other Credits', amount: (inputs.adoptionCredit || 0) + (inputs.foreignTaxCredit || 0) }
    ],
    withholdingAnalysis: {
      accuracy: Math.abs(federalRefund) / finalFederalTax,
      recommendation: federalRefund > 1000 ? 'Reduce withholding' : federalRefund < -1000 ? 'Increase withholding' : 'Withholding is appropriate'
    },
    optimizationSuggestions,
    taxSavings,
    nextYearProjection: {
      projectedIncome: grossIncome * 1.03, // Assume 3% growth
      projectedTax: totalTax * 1.03
    },
    taxEfficiencyScore,
    recommendations,
    keyInsights,
    taxAnalysis: generateTaxAnalysis(inputs, {
      grossIncome,
      adjustedGrossIncome,
      taxableIncome,
      federalTax: finalFederalTax,
      stateTax,
      totalTax,
      effectiveTaxRate,
      marginalTaxRate,
      federalRefund,
      stateRefund,
      totalRefund,
      standardDeductionAmount,
      itemizedDeductions,
      totalCredits,
      alternativeMinimumTax,
      taxBrackets: federalTaxResult.brackets,
      deductionAnalysis: [
        { type: 'Standard Deduction', amount: standardDeductionAmount, used: inputs.standardDeduction !== 'itemized' },
        { type: 'Itemized Deductions', amount: itemizedDeductions, used: inputs.standardDeduction === 'itemized' }
      ],
      creditAnalysis: [
        { type: 'Child Tax Credit', amount: childTaxCredit },
        { type: 'Earned Income Credit', amount: earnedIncomeCredit },
        { type: 'Education Credits', amount: inputs.educationCredits || 0 },
        { type: 'Other Credits', amount: (inputs.adoptionCredit || 0) + (inputs.foreignTaxCredit || 0) }
      ],
      withholdingAnalysis: {
        accuracy: Math.abs(federalRefund) / finalFederalTax,
        recommendation: federalRefund > 1000 ? 'Reduce withholding' : federalRefund < -1000 ? 'Increase withholding' : 'Withholding is appropriate'
      },
      optimizationSuggestions,
      taxSavings,
      nextYearProjection: {
        projectedIncome: grossIncome * 1.03,
        projectedTax: totalTax * 1.03
      },
      taxEfficiencyScore,
      recommendations,
      keyInsights
    })
  };
}

export function generateTaxAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  return `# Tax Analysis Report

## Summary
**Tax Year: ${inputs.taxYear || '2024'} | Filing Status: ${inputs.filingStatus || 'Single'}**

Your tax efficiency score is **${outputs.taxEfficiencyScore.toFixed(1)}/100** with potential savings of **$${outputs.taxSavings.toFixed(0)}** from optimization opportunities.

## Income Analysis

### Gross Income Breakdown
- **Total Gross Income:** $${outputs.grossIncome.toLocaleString()}
- **Wages & Salary:** $${(inputs.wages || 0).toLocaleString()}
- **Self-Employment:** $${(inputs.selfEmployment || 0).toLocaleString()}
- **Investment Income:** $${((inputs.interest || 0) + (inputs.dividends || 0) + (inputs.capitalGains || 0)).toLocaleString()}
- **Other Income:** $${((inputs.rentalIncome || 0) + (inputs.businessIncome || 0) + (inputs.otherIncome || 0)).toLocaleString()}

### Adjusted Gross Income (AGI)
- **AGI:** $${outputs.adjustedGrossIncome.toLocaleString()}
- **Above-the-Line Deductions:** $${(outputs.grossIncome - outputs.adjustedGrossIncome).toLocaleString()}

## Tax Calculation

### Federal Tax
- **Taxable Income:** $${outputs.taxableIncome.toLocaleString()}
- **Federal Tax:** $${outputs.federalTax.toLocaleString()}
- **Effective Rate:** ${outputs.effectiveTaxRate.toFixed(1)}%
- **Marginal Rate:** ${outputs.marginalTaxRate.toFixed(1)}%

### State Tax
- **State:** ${inputs.stateOfResidence ? inputs.stateOfResidence.toUpperCase() : 'Not specified'}
- **State Tax:** $${outputs.stateTax.toLocaleString()}

### Total Tax Liability
- **Total Tax:** $${outputs.totalTax.toLocaleString()}
- **Combined Effective Rate:** ${outputs.effectiveTaxRate.toFixed(1)}%

## Deductions Analysis

### Standard vs. Itemized
- **Standard Deduction:** $${outputs.standardDeductionAmount.toLocaleString()}
- **Itemized Deductions:** $${outputs.itemizedDeductions.toLocaleString()}
- **Deduction Used:** ${outputs.standardDeductionAmount > outputs.itemizedDeductions ? 'Standard' : 'Itemized'}

### Itemized Deduction Breakdown
- **State & Local Taxes:** $${(inputs.stateLocalTaxes || 0).toLocaleString()}
- **Mortgage Interest:** $${(inputs.mortgageInterest || 0).toLocaleString()}
- **Charitable Contributions:** $${(inputs.charitableContributions || 0).toLocaleString()}
- **Medical Expenses:** $${(inputs.medicalExpenses || 0).toLocaleString()}
- **Other Deductions:** $${((inputs.casualtyLosses || 0) + (inputs.miscDeductions || 0)).toLocaleString()}

## Credits Analysis

### Total Credits: $${outputs.totalCredits.toLocaleString()}
- **Child Tax Credit:** $${outputs.creditAnalysis.find(c => c.type === 'Child Tax Credit')?.amount.toLocaleString() || '0'}
- **Earned Income Credit:** $${outputs.creditAnalysis.find(c => c.type === 'Earned Income Credit')?.amount.toLocaleString() || '0'}
- **Education Credits:** $${outputs.creditAnalysis.find(c => c.type === 'Education Credits')?.amount.toLocaleString() || '0'}
- **Other Credits:** $${outputs.creditAnalysis.find(c => c.type === 'Other Credits')?.amount.toLocaleString() || '0'}

## Tax Brackets Breakdown

| Bracket | Rate | Income | Tax |
|---------|------|--------|-----|
${outputs.taxBrackets.map(bracket => 
  `| ${bracket.rate}% | $${bracket.income.toLocaleString()} | $${bracket.tax.toLocaleString()} |`
).join('\n')}

## Refund Analysis

### Federal
- **Withholding:** $${(inputs.federalWithholding || 0).toLocaleString()}
- **Estimated Payments:** $${(inputs.estimatedPayments || 0).toLocaleString()}
- **Tax Liability:** $${outputs.federalTax.toLocaleString()}
- **Refund/Owed:** $${outputs.federalRefund.toLocaleString()}

### State
- **Withholding:** $${(inputs.stateWithholding || 0).toLocaleString()}
- **Tax Liability:** $${outputs.stateTax.toLocaleString()}
- **Refund/Owed:** $${outputs.stateRefund.toLocaleString()}

### Total
- **Total Refund/Owed:** $${outputs.totalRefund.toLocaleString()}

## Optimization Opportunities

${outputs.optimizationSuggestions.length > 0 ? 
  outputs.optimizationSuggestions.map(suggestion => 
    `### ${suggestion.title}\n${suggestion.description}\n**Potential Savings:** $${suggestion.potentialSavings?.toFixed(0) || '0'}\n`
  ).join('\n') : 
  'No significant optimization opportunities identified at this time.'
}

## Withholding Analysis

- **Accuracy:** ${(outputs.withholdingAnalysis.accuracy * 100).toFixed(1)}%
- **Recommendation:** ${outputs.withholdingAnalysis.recommendation}

## Next Year Projection

- **Projected Income:** $${outputs.nextYearProjection.projectedIncome.toLocaleString()}
- **Projected Tax:** $${outputs.nextYearProjection.projectedTax.toLocaleString()}
- **Growth Rate:** 3.0%

## Key Insights

${outputs.keyInsights}

## Recommendations

${outputs.recommendations}

## Important Considerations

- **Alternative Minimum Tax:** $${outputs.alternativeMinimumTax.toLocaleString()}
- **Tax Efficiency Score:** ${outputs.taxEfficiencyScore.toFixed(1)}/100
- **Potential Savings:** $${outputs.taxSavings.toFixed(0)}

## Next Steps

1. **Review Withholding:** ${outputs.withholdingAnalysis.recommendation}
2. **Optimize Deductions:** Consider timing of deductible expenses
3. **Maximize Credits:** Ensure all eligible credits are claimed
4. **Plan for Next Year:** Adjust withholding and estimated payments
5. **Consider Professional Help:** For complex tax situations

*This analysis is based on current tax laws and assumptions. Actual tax liability may vary based on specific circumstances and tax law changes.*`;
}
