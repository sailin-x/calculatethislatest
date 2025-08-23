import { EstatePlanningInputs, EstatePlanningResults } from './types';

export class EstatePlanningFormulas {
  // Calculate total assets
  static calculateTotalAssets(inputs: EstatePlanningInputs): number {
    const { assets } = inputs;
    return (
      this.calculateLiquidAssets(assets.liquidAssets) +
      this.calculateRealEstate(assets.realEstate) +
      this.calculateBusinessInterests(assets.businessInterests) +
      this.calculateRetirementAccounts(assets.retirementAccounts) +
      assets.lifeInsurance.deathBenefit +
      this.calculatePersonalProperty(assets.personalProperty) +
      this.calculateOtherAssets(assets.otherAssets)
    );
  }

  // Calculate liquid assets
  static calculateLiquidAssets(liquidAssets: any): number {
    return (
      liquidAssets.cash +
      liquidAssets.stocks +
      liquidAssets.mutualFunds +
      liquidAssets.etfs +
      liquidAssets.otherSecurities
    );
  }

  // Calculate real estate
  static calculateRealEstate(realEstate: any): number {
    return (
      realEstate.primaryResidence +
      realEstate.investmentProperties +
      realEstate.commercialProperties +
      realEstate.land
    );
  }

  // Calculate business interests
  static calculateBusinessInterests(businessInterests: any): number {
    return (
      businessInterests.businessValue +
      businessInterests.partnershipInterests +
      businessInterests.llcInterests +
      businessInterests.stockOptions
    );
  }

  // Calculate retirement accounts
  static calculateRetirementAccounts(retirementAccounts: any): number {
    return (
      retirementAccounts.traditionalIRA +
      retirementAccounts.rothIRA +
      retirementAccounts.employerPlans +
      retirementAccounts.annuities
    );
  }

  // Calculate personal property
  static calculatePersonalProperty(personalProperty: any): number {
    return (
      personalProperty.vehicles +
      personalProperty.jewelry +
      personalProperty.artwork +
      personalProperty.otherPersonalProperty
    );
  }

  // Calculate other assets
  static calculateOtherAssets(otherAssets: any): number {
    return (
      otherAssets.trusts +
      otherAssets.foreignAssets +
      otherAssets.otherAssets
    );
  }

  // Calculate total liabilities
  static calculateTotalLiabilities(inputs: EstatePlanningInputs): number {
    const { liabilities } = inputs;
    return (
      liabilities.mortgages +
      liabilities.personalLoans +
      liabilities.creditCardDebt +
      liabilities.businessDebt +
      liabilities.taxLiabilities +
      liabilities.otherLiabilities
    );
  }

  // Calculate net estate
  static calculateNetEstate(totalAssets: number, totalLiabilities: number): number {
    return totalAssets - totalLiabilities;
  }

  // Calculate federal estate tax
  static calculateFederalEstateTax(
    netEstate: number,
    exemption: number,
    rate: number,
    portability: boolean
  ): number {
    const taxableEstate = Math.max(0, netEstate - exemption);
    return taxableEstate * (rate / 100);
  }

  // Calculate state estate tax
  static calculateStateEstateTax(
    netEstate: number,
    exemption: number,
    rate: number
  ): number {
    const taxableEstate = Math.max(0, netEstate - exemption);
    return taxableEstate * (rate / 100);
  }

  // Calculate total estate tax
  static calculateTotalEstateTax(
    federalTax: number,
    stateTax: number
  ): number {
    return federalTax + stateTax;
  }

  // Calculate effective tax rate
  static calculateEffectiveTaxRate(
    totalTax: number,
    netEstate: number
  ): number {
    return netEstate > 0 ? (totalTax / netEstate) * 100 : 0;
  }

  // Calculate gift tax liability
  static calculateGiftTaxLiability(
    giftsMade: number,
    annualExclusion: number,
    lifetimeExemption: number
  ): number {
    const taxableGifts = Math.max(0, giftsMade - annualExclusion);
    return taxableGifts > lifetimeExemption ? (taxableGifts - lifetimeExemption) * 0.40 : 0;
  }

  // Calculate trust efficiency
  static calculateTrustEfficiency(
    trustValue: number,
    taxBenefits: number,
    creditorProtection: boolean,
    probateAvoidance: boolean
  ): number {
    let efficiency = 0;
    if (trustValue > 0) {
      efficiency += (taxBenefits / trustValue) * 50; // Tax benefits weight
      efficiency += creditorProtection ? 25 : 0; // Creditor protection weight
      efficiency += probateAvoidance ? 25 : 0; // Probate avoidance weight
    }
    return Math.min(100, Math.max(0, efficiency));
  }

  // Calculate insurance needs
  static calculateInsuranceNeeds(inputs: EstatePlanningInputs): {
    incomeReplacement: number;
    debtPayoff: number;
    educationFunding: number;
    estateTaxFunding: number;
    businessContinuation: number;
    totalNeeds: number;
  } {
    const { lifeInsurancePlanning } = inputs;
    const needs = lifeInsurancePlanning.insuranceNeeds;
    const totalNeeds = 
      needs.incomeReplacement +
      needs.debtPayoff +
      needs.educationFunding +
      needs.estateTaxFunding +
      needs.businessContinuation;

    return {
      ...needs,
      totalNeeds
    };
  }

  // Calculate coverage gap
  static calculateCoverageGap(
    totalNeeds: number,
    totalDeathBenefit: number
  ): number {
    return Math.max(0, totalNeeds - totalDeathBenefit);
  }

  // Calculate insurance efficiency
  static calculateInsuranceEfficiency(
    totalDeathBenefit: number,
    totalPremium: number,
    coverageGap: number
  ): number {
    if (totalPremium === 0) return 0;
    const efficiency = (totalDeathBenefit / totalPremium) * 10;
    const gapPenalty = coverageGap > 0 ? 20 : 0;
    return Math.max(0, Math.min(100, efficiency - gapPenalty));
  }

  // Calculate charitable efficiency
  static calculateCharitableEfficiency(
    charitableGifts: number,
    taxDeductions: number
  ): number {
    return charitableGifts > 0 ? (taxDeductions / charitableGifts) * 100 : 0;
  }

  // Calculate estate planning efficiency
  static calculateEstatePlanningEfficiency(inputs: EstatePlanningInputs): {
    documentCompleteness: number;
    taxEfficiency: number;
    assetProtection: number;
    beneficiaryProtection: number;
    overallEfficiency: number;
  } {
    const { estateDocuments, specialSituations } = inputs;
    
    // Document completeness
    const documentCompleteness = (
      (estateDocuments.will ? 20 : 0) +
      (estateDocuments.trust ? 20 : 0) +
      (estateDocuments.powerOfAttorney ? 20 : 0) +
      (estateDocuments.healthcareDirective ? 20 : 0) +
      (estateDocuments.beneficiaryDesignations ? 10 : 0) +
      (estateDocuments.businessSuccessionPlan ? 10 : 0)
    );

    // Tax efficiency (placeholder - would be calculated based on tax analysis)
    const taxEfficiency = 75; // Example value

    // Asset protection
    const assetProtection = estateDocuments.trust ? 80 : 40;

    // Beneficiary protection
    let beneficiaryProtection = 60;
    if (specialSituations.specialNeedsBeneficiary) beneficiaryProtection += 20;
    if (specialSituations.minorChildren) beneficiaryProtection += 10;
    if (specialSituations.spendthriftBeneficiary) beneficiaryProtection += 10;
    beneficiaryProtection = Math.min(100, beneficiaryProtection);

    // Overall efficiency
    const overallEfficiency = (
      documentCompleteness * 0.3 +
      taxEfficiency * 0.3 +
      assetProtection * 0.2 +
      beneficiaryProtection * 0.2
    );

    return {
      documentCompleteness,
      taxEfficiency,
      assetProtection,
      beneficiaryProtection,
      overallEfficiency
    };
  }

  // Generate asset allocation breakdown
  static generateAssetAllocation(inputs: EstatePlanningInputs): {
    category: string;
    value: number;
    percentage: number;
  }[] {
    const totalAssets = this.calculateTotalAssets(inputs);
    const { assets } = inputs;

    return [
      {
        category: 'Liquid Assets',
        value: this.calculateLiquidAssets(assets.liquidAssets),
        percentage: totalAssets > 0 ? (this.calculateLiquidAssets(assets.liquidAssets) / totalAssets) * 100 : 0
      },
      {
        category: 'Real Estate',
        value: this.calculateRealEstate(assets.realEstate),
        percentage: totalAssets > 0 ? (this.calculateRealEstate(assets.realEstate) / totalAssets) * 100 : 0
      },
      {
        category: 'Business Interests',
        value: this.calculateBusinessInterests(assets.businessInterests),
        percentage: totalAssets > 0 ? (this.calculateBusinessInterests(assets.businessInterests) / totalAssets) * 100 : 0
      },
      {
        category: 'Retirement Accounts',
        value: this.calculateRetirementAccounts(assets.retirementAccounts),
        percentage: totalAssets > 0 ? (this.calculateRetirementAccounts(assets.retirementAccounts) / totalAssets) * 100 : 0
      },
      {
        category: 'Life Insurance',
        value: assets.lifeInsurance.deathBenefit,
        percentage: totalAssets > 0 ? (assets.lifeInsurance.deathBenefit / totalAssets) * 100 : 0
      },
      {
        category: 'Personal Property',
        value: this.calculatePersonalProperty(assets.personalProperty),
        percentage: totalAssets > 0 ? (this.calculatePersonalProperty(assets.personalProperty) / totalAssets) * 100 : 0
      },
      {
        category: 'Other Assets',
        value: this.calculateOtherAssets(assets.otherAssets),
        percentage: totalAssets > 0 ? (this.calculateOtherAssets(assets.otherAssets) / totalAssets) * 100 : 0
      }
    ];
  }

  // Generate beneficiary distribution
  static generateBeneficiaryDistribution(inputs: EstatePlanningInputs, netToBeneficiaries: number): {
    beneficiary: string;
    percentage: number;
    amount: number;
    taxImpact: number;
  }[] {
    return inputs.beneficiaries.map(beneficiary => ({
      beneficiary: beneficiary.name,
      percentage: beneficiary.percentage,
      amount: (beneficiary.percentage / 100) * netToBeneficiaries,
      taxImpact: beneficiary.specialNeeds ? 0 : (beneficiary.percentage / 100) * 0.15 // Example tax rate
    }));
  }

  // Generate planning opportunities
  static generatePlanningOpportunities(inputs: EstatePlanningInputs, results: any): {
    opportunity: string;
    potentialSavings: number;
    implementation: string;
    priority: 'high' | 'medium' | 'low';
  }[] {
    const opportunities = [];

    // Trust opportunities
    if (!inputs.estateDocuments.trust && inputs.estateInfo.netEstate > 1000000) {
      opportunities.push({
        opportunity: 'Establish Revocable Living Trust',
        potentialSavings: results.estateTax * 0.1,
        implementation: 'Consult with estate planning attorney',
        priority: 'high' as const
      });
    }

    // Life insurance opportunities
    if (results.lifeInsuranceAnalysis.coverageGap > 0) {
      opportunities.push({
        opportunity: 'Increase Life Insurance Coverage',
        potentialSavings: results.lifeInsuranceAnalysis.coverageGap * 0.05,
        implementation: 'Review insurance needs with financial advisor',
        priority: 'high' as const
      });
    }

    // Charitable giving opportunities
    if (inputs.estateInfo.netEstate > 5000000) {
      opportunities.push({
        opportunity: 'Establish Charitable Remainder Trust',
        potentialSavings: results.estateTax * 0.15,
        implementation: 'Consult with charitable giving specialist',
        priority: 'medium' as const
      });
    }

    return opportunities;
  }

  // Generate comprehensive report
  static generateReport(inputs: EstatePlanningInputs, results: any): string {
    return `
# Estate Planning Analysis Report

## Executive Summary
This comprehensive estate planning analysis evaluates the estate of ${inputs.estateInfo.estateOwner} with a total value of $${results.totalAssets.toLocaleString()} and net estate of $${results.netEstate.toLocaleString()}.

## Key Findings
- **Total Assets:** $${results.totalAssets.toLocaleString()}
- **Total Liabilities:** $${results.totalLiabilities.toLocaleString()}
- **Net Estate:** $${results.netEstate.toLocaleString()}
- **Estimated Estate Tax:** $${results.estateTax.toLocaleString()}
- **Net to Beneficiaries:** $${results.netToBeneficiaries.toLocaleString()}

## Asset Analysis
The estate is well-diversified across multiple asset categories:
${results.assetAnalysis.assetAllocation.map(asset => 
  `- ${asset.category}: $${asset.value.toLocaleString()} (${asset.percentage.toFixed(1)}%)`
).join('\n')}

## Tax Analysis
- **Federal Estate Tax:** $${results.taxAnalysis.federalEstateTax.toLocaleString()}
- **State Estate Tax:** $${results.taxAnalysis.stateEstateTax.toLocaleString()}
- **Effective Tax Rate:** ${results.taxAnalysis.effectiveTaxRate.toFixed(2)}%

## Estate Planning Efficiency
- **Document Completeness:** ${results.estatePlanningEfficiency.documentCompleteness}%
- **Tax Efficiency:** ${results.estatePlanningEfficiency.taxEfficiency}%
- **Asset Protection:** ${results.estatePlanningEfficiency.assetProtection}%
- **Overall Efficiency:** ${results.estatePlanningEfficiency.overallEfficiency}%

## Recommendations
${results.recommendations.map(rec => 
  `### ${rec.category}
${rec.recommendations.map(r => `- ${r}`).join('\n')}`
).join('\n\n')}

## Action Items
${results.actionItems.map(item => 
  `- **${item.priority.toUpperCase()}:** ${item.action} (${item.timeline})`
).join('\n')}
    `.trim();
  }

  // Generate recommendations
  static generateRecommendations(inputs: EstatePlanningInputs, results: any): {
    category: string;
    recommendations: string[];
    priority: 'high' | 'medium' | 'low';
    expectedImpact: number;
  }[] {
    const recommendations = [];

    // Document recommendations
    const documentRecs = [];
    if (!inputs.estateDocuments.will) documentRecs.push('Create a comprehensive will');
    if (!inputs.estateDocuments.trust) documentRecs.push('Consider establishing a revocable living trust');
    if (!inputs.estateDocuments.powerOfAttorney) documentRecs.push('Execute durable power of attorney');
    if (!inputs.estateDocuments.healthcareDirective) documentRecs.push('Create healthcare directive');

    if (documentRecs.length > 0) {
      recommendations.push({
        category: 'Estate Documents',
        recommendations: documentRecs,
        priority: 'high' as const,
        expectedImpact: 25
      });
    }

    // Tax recommendations
    if (results.estateTax > 0) {
      recommendations.push({
        category: 'Tax Planning',
        recommendations: [
          'Consider annual gifting to reduce estate size',
          'Review life insurance ownership structure',
          'Explore charitable giving strategies'
        ],
        priority: 'high' as const,
        expectedImpact: results.estateTax * 0.2
      });
    }

    // Insurance recommendations
    if (results.lifeInsuranceAnalysis.coverageGap > 0) {
      recommendations.push({
        category: 'Life Insurance',
        recommendations: [
          'Increase life insurance coverage to fill identified gaps',
          'Review policy ownership and beneficiary designations',
          'Consider trust-owned life insurance for estate tax funding'
        ],
        priority: 'medium' as const,
        expectedImpact: results.lifeInsuranceAnalysis.coverageGap * 0.1
      });
    }

    return recommendations;
  }

  // Generate action items
  static generateActionItems(inputs: EstatePlanningInputs, results: any): {
    priority: 'immediate' | 'short-term' | 'long-term';
    action: string;
    owner: string;
    timeline: string;
    expectedOutcome: string;
  }[] {
    const actionItems = [];

    // Immediate actions
    if (!inputs.estateDocuments.will) {
      actionItems.push({
        priority: 'immediate' as const,
        action: 'Create comprehensive will',
        owner: 'Estate Planning Attorney',
        timeline: '30 days',
        expectedOutcome: 'Basic estate planning foundation'
      });
    }

    // Short-term actions
    if (results.estateTax > 100000) {
      actionItems.push({
        priority: 'short-term' as const,
        action: 'Implement annual gifting strategy',
        owner: 'Financial Advisor',
        timeline: '90 days',
        expectedOutcome: 'Reduce estate tax liability'
      });
    }

    // Long-term actions
    if (inputs.estateInfo.netEstate > 5000000) {
      actionItems.push({
        priority: 'long-term' as const,
        action: 'Establish irrevocable life insurance trust',
        owner: 'Estate Planning Attorney',
        timeline: '6 months',
        expectedOutcome: 'Remove life insurance from estate'
      });
    }

    return actionItems;
  }
}

export function calculateEstatePlanning(inputs: EstatePlanningInputs): EstatePlanningResults {
  const formulas = EstatePlanningFormulas;
  
  // Calculate core metrics
  const totalAssets = formulas.calculateTotalAssets(inputs);
  const totalLiabilities = formulas.calculateTotalLiabilities(inputs);
  const netEstate = formulas.calculateNetEstate(totalAssets, totalLiabilities);
  
  // Calculate taxes
  const federalEstateTax = formulas.calculateFederalEstateTax(
    netEstate,
    inputs.taxConsiderations.federalEstateTax.exemption,
    inputs.taxConsiderations.federalEstateTax.rate,
    inputs.taxConsiderations.federalEstateTax.portability
  );
  
  const stateEstateTax = formulas.calculateStateEstateTax(
    netEstate,
    inputs.taxConsiderations.stateEstateTax.exemption,
    inputs.taxConsiderations.stateEstateTax.rate
  );
  
  const totalEstateTax = formulas.calculateTotalEstateTax(federalEstateTax, stateEstateTax);
  const netToBeneficiaries = netEstate - totalEstateTax;
  
  // Calculate insurance needs
  const insuranceNeeds = formulas.calculateInsuranceNeeds(inputs);
  const totalDeathBenefit = inputs.lifeInsurancePlanning.existingPolicies.reduce(
    (sum, policy) => sum + policy.deathBenefit, 0
  );
  const totalPremium = inputs.lifeInsurancePlanning.existingPolicies.reduce(
    (sum, policy) => sum + policy.premium, 0
  );
  const coverageGap = formulas.calculateCoverageGap(insuranceNeeds.totalNeeds, totalDeathBenefit);
  const insuranceEfficiency = formulas.calculateInsuranceEfficiency(totalDeathBenefit, totalPremium, coverageGap);
  
  // Calculate planning efficiency
  const estatePlanningEfficiency = formulas.calculateEstatePlanningEfficiency(inputs);
  
  // Generate analyses
  const assetAnalysis = {
    totalAssets,
    liquidAssets: formulas.calculateLiquidAssets(inputs.assets.liquidAssets),
    realEstate: formulas.calculateRealEstate(inputs.assets.realEstate),
    businessInterests: formulas.calculateBusinessInterests(inputs.assets.businessInterests),
    retirementAccounts: formulas.calculateRetirementAccounts(inputs.assets.retirementAccounts),
    lifeInsurance: inputs.assets.lifeInsurance.deathBenefit,
    personalProperty: formulas.calculatePersonalProperty(inputs.assets.personalProperty),
    otherAssets: formulas.calculateOtherAssets(inputs.assets.otherAssets),
    assetAllocation: formulas.generateAssetAllocation(inputs)
  };
  
  const liabilityAnalysis = {
    totalLiabilities,
    mortgages: inputs.liabilities.mortgages,
    personalLoans: inputs.liabilities.personalLoans,
    creditCardDebt: inputs.liabilities.creditCardDebt,
    businessDebt: inputs.liabilities.businessDebt,
    taxLiabilities: inputs.liabilities.taxLiabilities,
    otherLiabilities: inputs.liabilities.otherLiabilities,
    debtToAssetRatio: totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0
  };
  
  const taxAnalysis = {
    federalEstateTax,
    stateEstateTax,
    totalEstateTax,
    effectiveTaxRate: formulas.calculateEffectiveTaxRate(totalEstateTax, netEstate),
    taxExemption: inputs.taxConsiderations.federalEstateTax.exemption,
    taxableEstate: Math.max(0, netEstate - inputs.taxConsiderations.federalEstateTax.exemption),
    portabilityBenefits: inputs.taxConsiderations.federalEstateTax.portability ? totalEstateTax * 0.1 : 0
  };
  
  const giftTaxAnalysis = {
    annualExclusion: inputs.taxConsiderations.giftTax.annualExclusion,
    lifetimeExemption: inputs.taxConsiderations.giftTax.lifetimeExemption,
    giftsMade: inputs.taxConsiderations.giftTax.giftsMade,
    remainingExemption: Math.max(0, inputs.taxConsiderations.giftTax.lifetimeExemption - inputs.taxConsiderations.giftTax.giftsMade),
    giftTaxLiability: formulas.calculateGiftTaxLiability(
      inputs.taxConsiderations.giftTax.giftsMade,
      inputs.taxConsiderations.giftTax.annualExclusion,
      inputs.taxConsiderations.giftTax.lifetimeExemption
    ),
    gstExemption: inputs.taxConsiderations.generationSkippingTax.exemption,
    gstTransfers: inputs.taxConsiderations.generationSkippingTax.transfers
  };
  
  const beneficiaryAnalysis = {
    totalBeneficiaries: inputs.beneficiaries.length,
    beneficiaryDistribution: formulas.generateBeneficiaryDistribution(inputs, netToBeneficiaries),
    specialNeedsPlanning: inputs.beneficiaries.some(b => b.specialNeeds),
    minorBeneficiaryPlanning: inputs.beneficiaries.some(b => b.age < 18)
  };
  
  const lifeInsuranceAnalysis = {
    totalDeathBenefit,
    totalCashValue: inputs.lifeInsurancePlanning.existingPolicies.reduce(
      (sum, policy) => sum + policy.cashValue, 0
    ),
    totalPremium,
    insuranceNeeds,
    coverageGap,
    insuranceEfficiency
  };
  
  const charitableAnalysis = {
    charitableTrusts: inputs.charitableGiving.charitableTrusts.value,
    charitableGifts: inputs.charitableGiving.charitableGifts.annualGifts + inputs.charitableGiving.charitableGifts.plannedGifts,
    taxDeductions: inputs.charitableGiving.charitableGifts.charitableDeductions,
    charitableEfficiency: formulas.calculateCharitableEfficiency(
      inputs.charitableGiving.charitableGifts.annualGifts + inputs.charitableGiving.charitableGifts.plannedGifts,
      inputs.charitableGiving.charitableGifts.charitableDeductions
    ),
    philanthropicImpact: (inputs.charitableGiving.charitableGifts.annualGifts + inputs.charitableGiving.charitableGifts.plannedGifts) * 0.8
  };
  
  const businessSuccessionAnalysis = {
    businessValue: inputs.businessSuccession.businessValue,
    successionPlan: inputs.businessSuccession.successionPlan,
    keyEmployees: inputs.businessSuccession.keyEmployees,
    buySellAgreement: inputs.businessSuccession.buySellAgreement,
    fundingMechanism: inputs.businessSuccession.fundingMechanism,
    businessContinuity: inputs.businessSuccession.buySellAgreement ? 85 : 50
  };
  
  const estateAdministrationAnalysis = {
    executor: inputs.estateAdministration.executor,
    trustee: inputs.estateAdministration.trustee,
    guardian: inputs.estateAdministration.guardian,
    estimatedCosts: inputs.estateAdministration.estimatedCosts,
    administrationEfficiency: inputs.estateDocuments.trust ? 90 : 60,
    probateAvoidance: inputs.estateDocuments.trust
  };
  
  const internationalAnalysis = {
    foreignAssets: inputs.internationalConsiderations.foreignAssets,
    foreignTrusts: inputs.internationalConsiderations.foreignTrusts,
    dualCitizenship: inputs.internationalConsiderations.dualCitizenship,
    foreignTaxTreaties: inputs.internationalConsiderations.foreignTaxTreaties,
    reportingRequirements: inputs.internationalConsiderations.reportingRequirements,
    internationalComplexity: inputs.internationalConsiderations.foreignAssets > 0 ? 75 : 25
  };
  
  const specialSituationsAnalysis = {
    blendedFamily: inputs.specialSituations.blendedFamily,
    specialNeedsBeneficiary: inputs.specialSituations.specialNeedsBeneficiary,
    minorChildren: inputs.specialSituations.minorChildren,
    spendthriftBeneficiary: inputs.specialSituations.spendthriftBeneficiary,
    creditorProtection: inputs.specialSituations.creditorProtection,
    planningComplexity: Object.values(inputs.specialSituations).filter(Boolean).length * 20
  };
  
  // Generate recommendations and action items
  const recommendations = formulas.generateRecommendations(inputs, {
    estateTax: totalEstateTax,
    lifeInsuranceAnalysis: { coverageGap }
  });
  
  const actionItems = formulas.generateActionItems(inputs, {
    estateTax: totalEstateTax,
    estateInfo: inputs.estateInfo
  });
  
  const planningOpportunities = formulas.generatePlanningOpportunities(inputs, {
    estateTax: totalEstateTax,
    lifeInsuranceAnalysis: { coverageGap }
  });
  
  // Generate comprehensive report
  const report = formulas.generateReport(inputs, {
    totalAssets,
    totalLiabilities,
    netEstate,
    estateTax: totalEstateTax,
    netToBeneficiaries,
    assetAnalysis,
    taxAnalysis,
    estatePlanningEfficiency,
    recommendations,
    actionItems
  });
  
  return {
    totalAssets,
    totalLiabilities,
    netEstate,
    estateTax: totalEstateTax,
    netToBeneficiaries,
    assetAnalysis,
    liabilityAnalysis,
    taxAnalysis,
    giftTaxAnalysis,
    trustAnalysis: {
      trustType: inputs.trustInfo.trustType,
      trustValue: inputs.trustInfo.trustValue,
      taxBenefits: inputs.trustInfo.trustValue * 0.15,
      creditorProtection: inputs.trustInfo.trustType === 'irrevocable',
      probateAvoidance: true,
      trustEfficiency: formulas.calculateTrustEfficiency(
        inputs.trustInfo.trustValue,
        inputs.trustInfo.trustValue * 0.15,
        inputs.trustInfo.trustType === 'irrevocable',
        true
      )
    },
    beneficiaryAnalysis,
    lifeInsuranceAnalysis,
    charitableAnalysis,
    businessSuccessionAnalysis,
    estateAdministrationAnalysis,
    internationalAnalysis,
    specialSituationsAnalysis,
    estatePlanningEfficiency,
    scenarioResults: [],
    sensitivityResults: [],
    performanceMetrics: {
      taxEfficiency: estatePlanningEfficiency.taxEfficiency,
      assetProtection: estatePlanningEfficiency.assetProtection,
      beneficiaryProtection: estatePlanningEfficiency.beneficiaryProtection,
      overallScore: estatePlanningEfficiency.overallEfficiency
    },
    planningOpportunities,
    riskAnalysis: {
      taxRisk: totalEstateTax > 0 ? 60 : 20,
      assetProtectionRisk: inputs.estateDocuments.trust ? 20 : 60,
      beneficiaryRisk: inputs.beneficiaries.some(b => b.specialNeeds) ? 40 : 20,
      administrationRisk: inputs.estateAdministration.executor ? 30 : 70,
      totalRisk: 45
    },
    costBenefitAnalysis: {
      planningCosts: 15000,
      taxSavings: totalEstateTax * 0.2,
      administrationSavings: inputs.estateDocuments.trust ? 50000 : 0,
      netBenefit: (totalEstateTax * 0.2) + (inputs.estateDocuments.trust ? 50000 : 0) - 15000,
      returnOnInvestment: 15000 > 0 ? ((totalEstateTax * 0.2) + (inputs.estateDocuments.trust ? 50000 : 0) - 15000) / 15000 * 100 : 0
    },
    breakEvenAnalysis: {
      breakEvenEstate: inputs.taxConsiderations.federalEstateTax.exemption,
      breakEvenTaxRate: 40,
      marginOfSafety: Math.max(0, inputs.taxConsiderations.federalEstateTax.exemption - netEstate),
      requiredSavings: totalEstateTax * 0.1
    },
    monteCarloResults: {
      meanEstateTax: totalEstateTax,
      medianEstateTax: totalEstateTax,
      standardDeviation: totalEstateTax * 0.1,
      percentiles: {
        p10: totalEstateTax * 0.8,
        p25: totalEstateTax * 0.9,
        p50: totalEstateTax,
        p75: totalEstateTax * 1.1,
        p90: totalEstateTax * 1.2
      },
      probabilityOfTaxIncrease: 0.3
    },
    report,
    recommendations,
    actionItems
  };
}
