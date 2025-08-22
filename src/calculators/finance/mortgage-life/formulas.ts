import { MortgageLifeInputs, MortgageLifeOutputs } from './types';

/**
 * Calculate mortgage life insurance needs and coverage analysis
 */
export function calculateMortgageLife(inputs: MortgageLifeInputs): MortgageLifeOutputs {
  // Basic calculations
  const mortgageLifeCoverage = inputs.currentLoanBalance;
  const totalLifeInsuranceNeeded = calculateTotalLifeInsuranceNeeded(inputs);
  const additionalCoverageNeeded = Math.max(0, totalLifeInsuranceNeeded - inputs.existingLifeInsurance);
  
  // Cost calculations
  const mortgageLifeCost = inputs.mortgageLifePremium * 12;
  const termLifeCost = inputs.termLifePremium * 12;
  const costDifference = mortgageLifeCost - termLifeCost;
  const totalCostOverTerm = mortgageLifeCost * inputs.yearsRemaining;
  
  // Generate analysis reports
  const coverageComparison = generateCoverageComparison(inputs, mortgageLifeCost, termLifeCost);
  const benefitAnalysis = generateBenefitAnalysis(inputs, costDifference);
  const recommendations = generateRecommendations(inputs, additionalCoverageNeeded, costDifference);
  const riskAssessment = generateRiskAssessment(inputs);
  const costBenefitAnalysis = generateCostBenefitAnalysis(inputs, mortgageLifeCost, termLifeCost, totalCostOverTerm);
  const alternativeStrategies = generateAlternativeStrategies(inputs, additionalCoverageNeeded);
  const taxImplications = generateTaxImplications(inputs);
  const coverageTimeline = generateCoverageTimeline(inputs);
  const familyProtection = generateFamilyProtection(inputs, totalLifeInsuranceNeeded);
  const policyFeatures = generatePolicyFeatures(inputs);
  const underwritingConsiderations = generateUnderwritingConsiderations(inputs);
  const conversionOptions = generateConversionOptions(inputs);
  const claimProcess = generateClaimProcess(inputs);
  const financialImpact = generateFinancialImpact(inputs, totalLifeInsuranceNeeded);
  const estatePlanning = generateEstatePlanning(inputs);
  const nextSteps = generateNextSteps(inputs, additionalCoverageNeeded);

  return {
    mortgageLifeCoverage,
    totalLifeInsuranceNeeded,
    additionalCoverageNeeded,
    mortgageLifeCost,
    termLifeCost,
    costDifference,
    totalCostOverTerm,
    coverageComparison,
    benefitAnalysis,
    recommendations,
    riskAssessment,
    costBenefitAnalysis,
    alternativeStrategies,
    taxImplications,
    coverageTimeline,
    familyProtection,
    policyFeatures,
    underwritingConsiderations,
    conversionOptions,
    claimProcess,
    financialImpact,
    estatePlanning,
    nextSteps
  };
}

/**
 * Calculate total life insurance needed based on financial obligations
 */
function calculateTotalLifeInsuranceNeeded(inputs: MortgageLifeInputs): number {
  const mortgageObligation = inputs.currentLoanBalance;
  const otherDebts = inputs.otherDebts;
  const incomeReplacement = inputs.annualIncome * 10; // 10x annual income rule
  const educationFunds = inputs.dependents * 50000; // $50k per dependent for education
  const finalExpenses = 15000; // Funeral and final expenses
  
  return mortgageObligation + otherDebts + incomeReplacement + educationFunds + finalExpenses;
}

/**
 * Generate comprehensive coverage comparison analysis
 */
function generateCoverageComparison(
  inputs: MortgageLifeInputs, 
  mortgageLifeCost: number, 
  termLifeCost: number
): string {
  const costDifference = mortgageLifeCost - termLifeCost;
  const costDifferencePercent = ((costDifference / termLifeCost) * 100).toFixed(1);
  
  return `## Coverage Comparison Analysis

### Mortgage Life Insurance
- **Coverage Amount**: $${inputs.currentLoanBalance.toLocaleString()}
- **Annual Cost**: $${mortgageLifeCost.toLocaleString()}
- **Total Cost Over Term**: $${(mortgageLifeCost * inputs.yearsRemaining).toLocaleString()}

### Term Life Insurance
- **Coverage Amount**: $${inputs.currentLoanBalance.toLocaleString()}
- **Annual Cost**: $${termLifeCost.toLocaleString()}
- **Total Cost Over Term**: $${(termLifeCost * inputs.yearsRemaining).toLocaleString()}

### Cost Analysis
- **Annual Cost Difference**: $${costDifference.toLocaleString()} (${costDifferencePercent}% higher for mortgage life)
- **Total Cost Difference**: $${(costDifference * inputs.yearsRemaining).toLocaleString()}`;
}

/**
 * Generate benefit analysis
 */
function generateBenefitAnalysis(inputs: MortgageLifeInputs, costDifference: number): string {
  return `## Benefit Analysis

### Mortgage Life Insurance Benefits
✅ Automatic premium payment
✅ No medical underwriting
✅ Guaranteed acceptance
✅ Decreasing coverage

### Mortgage Life Insurance Drawbacks
❌ Higher cost (${costDifference > 0 ? 'typically more expensive' : 'may be cost-effective'})
❌ Limited flexibility
❌ Decreasing coverage
❌ Lender as beneficiary

### Term Life Insurance Benefits
✅ Lower cost
✅ Flexible coverage
✅ Portable
✅ Beneficiary control`;
}

/**
 * Generate recommendations
 */
function generateRecommendations(
  inputs: MortgageLifeInputs, 
  additionalCoverageNeeded: number, 
  costDifference: number
): string {
  const recommendations = [];
  
  if (additionalCoverageNeeded > 0) {
    recommendations.push(`You need an additional $${additionalCoverageNeeded.toLocaleString()} in life insurance coverage.`);
  }
  
  if (costDifference > 0) {
    recommendations.push(`Consider term life insurance to save $${costDifference.toLocaleString()} annually.`);
  }
  
  recommendations.push(`Consult with a licensed insurance agent to compare quotes from multiple carriers.`);
  
  return `## Recommendations

${recommendations.join('\n\n')}

### Priority Actions
1. Secure adequate life insurance coverage
2. Compare quotes from multiple carriers
3. Review coverage needs annually`;
}

/**
 * Generate risk assessment
 */
function generateRiskAssessment(inputs: MortgageLifeInputs): string {
  const riskFactors = [];
  
  if (inputs.healthStatus !== 'excellent') {
    riskFactors.push(`Health status: ${inputs.healthStatus}`);
  }
  
  if (inputs.smokingStatus !== 'non-smoker') {
    riskFactors.push(`Smoking status: ${inputs.smokingStatus}`);
  }
  
  return `## Risk Assessment

### Risk Factors
${riskFactors.length > 0 ? riskFactors.map(factor => `- ${factor}`).join('\n') : '- No significant risk factors identified'}

### Underwriting Impact
- **Preferred Rates**: ${inputs.healthStatus === 'excellent' && inputs.smokingStatus === 'non-smoker' ? 'Likely eligible' : 'May not qualify'}
- **Standard Rates**: ${inputs.healthStatus === 'very-good' || inputs.healthStatus === 'excellent' ? 'Likely eligible' : 'May qualify'}

### Recommendations
1. Work with an experienced insurance agent
2. Compare options from different carriers
3. Address any health issues that can be improved`;
}

/**
 * Generate cost-benefit analysis
 */
function generateCostBenefitAnalysis(
  inputs: MortgageLifeInputs, 
  mortgageLifeCost: number, 
  termLifeCost: number, 
  totalCostOverTerm: number
): string {
  const costDifference = mortgageLifeCost - termLifeCost;
  const totalCostDifference = costDifference * inputs.yearsRemaining;
  
  return `## Cost-Benefit Analysis

### Cost Comparison Over ${inputs.yearsRemaining} Years
- **Mortgage Life**: $${totalCostOverTerm.toLocaleString()}
- **Term Life**: $${(termLifeCost * inputs.yearsRemaining).toLocaleString()}
- **Total Savings**: $${totalCostDifference.toLocaleString()}

### Investment Opportunity
If you invested the cost difference annually at ${inputs.investmentReturn}%:
- **Potential Growth**: $${(totalCostDifference * Math.pow(1 + inputs.investmentReturn / 100, inputs.yearsRemaining)).toLocaleString()}

### Recommendation
Term life insurance provides better value for most borrowers, offering significant cost savings while providing greater flexibility.`;
}

/**
 * Generate alternative strategies
 */
function generateAlternativeStrategies(inputs: MortgageLifeInputs, additionalCoverageNeeded: number): string {
  return `## Alternative Strategies

### Recommended Alternatives
- **Laddered Term Life**: Multiple term policies with different terms
- **Permanent Life Insurance**: Whole life or universal life
- **Group Life Insurance**: Through employer
- **Accidental Death Insurance**: As supplement

### Strategy Comparison
| Strategy | Pros | Cons | Best For |
|----------|------|------|----------|
| **Term Life** | Low cost, flexible | No cash value | Most families |
| **Whole Life** | Permanent, cash value | High cost | High net worth |
| **Group Life** | Low cost | Limited coverage | Employees |

### Your Profile
- **Age**: ${inputs.borrowerAge} years old
- **Health**: ${inputs.healthStatus}
- **Income**: $${inputs.annualIncome.toLocaleString()}/year
- **Dependents**: ${inputs.dependents}

**Recommended Approach**: Focus on term life insurance for maximum coverage at minimum cost.`;
}

/**
 * Generate tax implications
 */
function generateTaxImplications(inputs: MortgageLifeInputs): string {
  return `## Tax Implications

### Life Insurance Death Benefits
- **Federal Tax**: Generally tax-free to beneficiaries
- **State Tax**: Most states exempt death benefits
- **Estate Tax**: May be included in estate

### Premium Payments
- **Personal Policies**: Not tax-deductible
- **Business Policies**: May be deductible
- **Employer-Provided**: May be taxable income

### Your Situation
- **State**: ${inputs.state}
- **Coverage Type**: ${inputs.coverageType}
- **Beneficiary**: ${inputs.beneficiaryType}

**Recommendations**:
1. Ensure proper beneficiary designation
2. Review state-specific tax implications
3. Consult with tax professional`;
}

/**
 * Generate coverage timeline
 */
function generateCoverageTimeline(inputs: MortgageLifeInputs): string {
  const currentYear = new Date().getFullYear();
  
  return `## Coverage Timeline

### Key Milestones
- **${currentYear}**: Secure adequate life insurance coverage
- **${currentYear + 5}**: Review coverage needs
- **${currentYear + 10}**: Assess if permanent coverage needed
- **${currentYear + inputs.yearsRemaining}**: Mortgage paid off

### Coverage Needs Over Time
- **Years 1-10**: High coverage needs
- **Years 11-20**: Moderate coverage needs
- **Years 21-30**: Lower coverage needs

### Long-term Strategy
- **Immediate**: Secure adequate term life coverage
- **Mid-term**: Consider permanent coverage if needed
- **Long-term**: Focus on retirement planning`;
}

/**
 * Generate family protection analysis
 */
function generateFamilyProtection(inputs: MortgageLifeInputs, totalLifeInsuranceNeeded: number): string {
  const coverageGap = totalLifeInsuranceNeeded - inputs.existingLifeInsurance;
  const monthlyIncomeNeeded = inputs.annualIncome / 12;
  
  return `## Family Protection Analysis

### Current Protection Status
- **Total Insurance Needed**: $${totalLifeInsuranceNeeded.toLocaleString()}
- **Existing Coverage**: $${inputs.existingLifeInsurance.toLocaleString()}
- **Coverage Gap**: $${Math.max(0, coverageGap).toLocaleString()}

### Family Financial Impact
- **Monthly Income**: $${monthlyIncomeNeeded.toLocaleString()}
- **Savings Duration**: ${Math.round(inputs.savings / monthlyIncomeNeeded)} months without insurance

### Protection Scenarios
**Without Insurance**: Family would lose $${monthlyIncomeNeeded.toLocaleString()}/month
**With Insurance**: Family receives $${totalLifeInsuranceNeeded.toLocaleString()} tax-free

### Recommendations
1. Close the coverage gap of $${Math.max(0, coverageGap).toLocaleString()}
2. Ensure adequate income replacement
3. Consider permanent coverage for estate planning`;
}

/**
 * Generate policy features analysis
 */
function generatePolicyFeatures(inputs: MortgageLifeInputs): string {
  return `## Policy Features to Consider

### Essential Features
- **Guaranteed Renewable**: Renew without medical exam
- **Convertible**: Convert to permanent coverage
- **Waiver of Premium**: Premiums waived if disabled
- **Accelerated Death Benefit**: Access if terminally ill

### Optional Riders
- **Child Rider**: Coverage for children
- **Spouse Rider**: Coverage for spouse
- **Accidental Death**: Additional coverage
- **Disability Income**: Monthly income if disabled

### Your Profile
- **Health Status**: ${inputs.healthStatus}
- **Age**: ${inputs.borrowerAge}
- **Occupation**: ${inputs.occupation}

### Recommendations
1. **Primary Focus**: Level term life insurance
2. **Key Riders**: Waiver of premium, accelerated death benefit
3. **Term Length**: ${inputs.yearsRemaining} years
4. **Underwriting**: Aim for preferred rates`;
}

/**
 * Generate underwriting considerations
 */
function generateUnderwritingConsiderations(inputs: MortgageLifeInputs): string {
  const considerations = [];
  
  if (inputs.healthStatus !== 'excellent') {
    considerations.push(`Health status: ${inputs.healthStatus}`);
  }
  
  if (inputs.smokingStatus !== 'non-smoker') {
    considerations.push(`Smoking status: ${inputs.smokingStatus}`);
  }
  
  return `## Underwriting Considerations

### Factors Affecting Application
${considerations.length > 0 ? considerations.map(factor => `- ${factor}`).join('\n') : '- No significant concerns'}

### Medical Underwriting Process
1. Complete health questionnaire
2. Medical exam and tests
3. Medical records review
4. Decision: approval, rating, or decline

### Potential Outcomes
- **Preferred Plus**: Best rates
- **Preferred**: Good rates
- **Standard**: Average rates
- **Substandard**: Higher rates

### Preparation Tips
1. Gather medical records
2. Be honest about health
3. Apply when health is stable
4. Compare multiple carriers`;
}

/**
 * Generate conversion options
 */
function generateConversionOptions(inputs: MortgageLifeInputs): string {
  return `## Conversion Options

### Term Life Conversion
- **Convertible Term**: Convert to permanent coverage
- **Conversion Period**: First 5-10 years
- **No Medical Underwriting**: Usually not required
- **Permanent Options**: Whole life, universal life

### Conversion Benefits
- **Guaranteed Insurability**: Convert regardless of health
- **Permanent Coverage**: Lasts entire life
- **Cash Value**: Build cash value over time
- **Estate Planning**: Useful for estate taxes

### Your Situation
- **Age**: ${inputs.borrowerAge} - good age for conversion
- **Health**: ${inputs.healthStatus} - favorable

### Recommendations
1. Secure adequate term life coverage first
2. Monitor health regularly
3. Review conversion needs annually
4. Consult insurance professional`;
}

/**
 * Generate claim process information
 */
function generateClaimProcess(inputs: MortgageLifeInputs): string {
  return `## Claim Process

### Steps to File a Claim
1. Contact insurance company
2. Obtain claim forms
3. Gather documentation
4. Submit claim
5. Follow up with adjuster
6. Receive payment

### Required Documentation
- Death certificate
- Policy information
- Beneficiary information
- Claimant statement

### Timeline Expectations
- **Initial Response**: 1-3 business days
- **Review**: 1-2 weeks
- **Decision**: 2-4 weeks
- **Payment**: 1-2 weeks after approval

### Your Policy
- **Beneficiary Type**: ${inputs.beneficiaryType}
- **Coverage Type**: ${inputs.coverageType}
- **State**: ${inputs.state}

### Recommendations
1. Keep organized records
2. Update beneficiaries regularly
3. Inform family about policy
4. Get professional help if needed`;
}

/**
 * Generate financial impact analysis
 */
function generateFinancialImpact(inputs: MortgageLifeInputs, totalLifeInsuranceNeeded: number): string {
  const monthlyIncome = inputs.annualIncome / 12;
  const yearsOfProtection = 10;
  
  return `## Financial Impact Analysis

### Current Financial Picture
- **Annual Income**: $${inputs.annualIncome.toLocaleString()}
- **Monthly Income**: $${monthlyIncome.toLocaleString()}
- **Current Savings**: $${inputs.savings.toLocaleString()}
- **Other Debts**: $${inputs.otherDebts.toLocaleString()}

### Without Life Insurance
- **Income Loss**: $${monthlyIncome.toLocaleString()}/month
- **Savings Duration**: ${Math.round(inputs.savings / monthlyIncome)} months
- **Family Impact**: Severe financial hardship

### With Adequate Life Insurance
- **Death Benefit**: $${totalLifeInsuranceNeeded.toLocaleString()}
- **Income Replacement**: $${(totalLifeInsuranceNeeded / (yearsOfProtection * 12)).toLocaleString()}/month for ${yearsOfProtection} years
- **Debt Elimination**: All debts paid off
- **Family Security**: Financial stability maintained

### Recommendations
1. Secure adequate coverage immediately
2. Focus on term life for cost-effectiveness
3. Consider permanent coverage for estate planning`;
}

/**
 * Generate estate planning considerations
 */
function generateEstatePlanning(inputs: MortgageLifeInputs): string {
  const estateTaxThreshold = 12920000; // 2024 federal estate tax exemption
  const totalAssets = inputs.savings + inputs.currentLoanBalance;
  
  return `## Estate Planning Considerations

### Current Estate Value
- **Total Assets**: $${totalAssets.toLocaleString()}
- **Estate Tax Threshold**: $${estateTaxThreshold.toLocaleString()}
- **Estate Tax Exposure**: ${totalAssets > estateTaxThreshold ? 'Yes' : 'No'}

### Life Insurance in Estate Planning
- **Estate Inclusion**: Life insurance owned by you is included in estate
- **Estate Tax**: Death benefit may be subject to estate tax
- **Beneficiary Designation**: Proper designation is crucial
- **Trust Ownership**: Can remove from estate through trust

### Your Situation
- **Age**: ${inputs.borrowerAge} - good time to plan
- **Assets**: $${totalAssets.toLocaleString()}
- **Family**: ${inputs.dependents} dependent(s)

### Recommendations
1. Secure adequate life insurance coverage
2. Review beneficiary designations
3. Consider ILIT if estate tax is a concern
4. Consult with estate planning attorney`;
}

/**
 * Generate next steps
 */
function generateNextSteps(inputs: MortgageLifeInputs, additionalCoverageNeeded: number): string {
  return `## Next Steps

### Action Plan
**Immediate (This Week)**:
1. Contact 3-5 insurance carriers for quotes
2. Compare term life vs. mortgage life costs
3. Determine optimal coverage amount

**Short-term (Next 30 Days)**:
1. Complete applications for preferred policies
2. Schedule medical exams if required
3. Review beneficiary designations
4. Inform family about coverage decisions

**Medium-term (Next 6 Months)**:
1. Confirm policy is in force
2. Set up automatic premium payments
3. Store policy information securely
4. Review coverage with family

**Long-term (Annual)**:
1. Review coverage needs annually
2. Update beneficiary designations
3. Consider additional coverage for life changes
4. Review estate planning needs

### Key Contacts
- **Insurance Agent**: Licensed life insurance agent
- **Financial Advisor**: For comprehensive planning
- **Estate Attorney**: For estate planning needs
- **Tax Professional**: For tax implications

### Success Metrics
- **Coverage Secured**: Adequate life insurance in place
- **Cost Optimized**: Best rates for your health profile
- **Family Protected**: Dependents financially secure
- **Peace of Mind**: Confidence in family's financial future

**Remember**: Life insurance is about protecting your family's future. Take action today to ensure their financial security tomorrow.`;
}

/**
 * Generate comprehensive mortgage life analysis report
 */
export function generateMortgageLifeAnalysis(inputs: MortgageLifeInputs, outputs: MortgageLifeOutputs): string {
  return `# Mortgage Life Insurance Analysis Report

## Executive Summary
This analysis compares mortgage life insurance with traditional term life insurance to help you make an informed decision about protecting your family and mortgage.

### Key Findings
- **Recommended Coverage**: $${outputs.totalLifeInsuranceNeeded.toLocaleString()}
- **Additional Coverage Needed**: $${outputs.additionalCoverageNeeded.toLocaleString()}
- **Annual Cost Difference**: $${outputs.costDifference.toLocaleString()} (${outputs.costDifference > 0 ? 'higher' : 'lower'} for mortgage life)
- **Total Cost Over Term**: $${outputs.totalCostOverTerm.toLocaleString()}

### Primary Recommendation
${outputs.costDifference > 0 ? 
  '**Term Life Insurance** is recommended due to lower cost and greater flexibility.' :
  '**Mortgage Life Insurance** may be cost-effective in your situation, but consider flexibility needs.'
}

---

${outputs.coverageComparison}

---

${outputs.benefitAnalysis}

---

${outputs.recommendations}

---

${outputs.riskAssessment}

---

${outputs.costBenefitAnalysis}

---

${outputs.alternativeStrategies}

---

${outputs.taxImplications}

---

${outputs.coverageTimeline}

---

${outputs.familyProtection}

---

${outputs.policyFeatures}

---

${outputs.underwritingConsiderations}

---

${outputs.conversionOptions}

---

${outputs.claimProcess}

---

${outputs.financialImpact}

---

${outputs.estatePlanning}

---

${outputs.nextSteps}

---

*This analysis is for informational purposes only. Consult with a licensed insurance professional for personalized advice and to obtain actual quotes.*`;
}
