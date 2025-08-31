import { RealEstate1031ExchangeInputs, RealEstate1031ExchangeOutputs, RealEstate1031ExchangeMetrics, ExchangeTimeline, BootAnalysis, TaxForm, ComplianceCheck, RealEstate1031ExchangeAnalysis } from './types';

export function calculateRealEstate1031Exchange(inputs: RealEstate1031ExchangeInputs): RealEstate1031ExchangeOutputs {
  // Calculate key metrics
  const metrics = calculateRealEstate1031ExchangeMetrics(inputs);

  // Generate timeline
  const timeline = generateExchangeTimeline(inputs, metrics);

  // Generate boot analysis
  const bootAnalysis = generateBootAnalysis(inputs, metrics);

  // Generate tax forms
  const taxForms = generateTaxForms(inputs, metrics);

  // Generate compliance checks
  const complianceChecks = generateComplianceChecks(inputs, metrics);

  // Generate analysis
  const analysis = generateExchangeAnalysis(inputs, metrics);

  return {
    metrics,
    timeline,
    bootAnalysis,
    taxForms,
    complianceChecks,
    analysis
  };
}

export function calculateRealEstate1031ExchangeMetrics(inputs: RealEstate1031ExchangeInputs): RealEstate1031ExchangeMetrics {
  // Calculate realized gain
  const netSaleProceeds = inputs.relinquishedPropertySalePrice - inputs.relinquishedPropertySellingCosts;
  const realizedGain = netSaleProceeds - inputs.relinquishedPropertyBasis;

  // Calculate boot
  const bootReceived = inputs.cashBoot + inputs.mortgageBoot + inputs.personalPropertyBoot + inputs.otherBoot;
  const bootGiven = 0; // Simplified - assuming no boot given
  const netBoot = bootReceived - bootGiven;

  // Calculate recognized gain (boot is taxable)
  const recognizedGain = Math.min(realizedGain, netBoot);
  const deferredGain = realizedGain - recognizedGain;

  // Calculate tax liability
  const taxLiability = recognizedGain * ((inputs.taxRate + inputs.stateTaxRate) / 100);
  const taxWithoutExchange = realizedGain * ((inputs.taxRate + inputs.stateTaxRate) / 100);
  const taxSavings = taxWithoutExchange - taxLiability;

  // Calculate effective tax rate
  const effectiveTaxRate = realizedGain > 0 ? (taxLiability / realizedGain) * 100 : 0;

  // Calculate property analysis
  const equityReplacement = inputs.replacementPropertyBasis - inputs.replacementPropertyDebt;
  const debtReplacement = inputs.replacementPropertyDebt;
  const totalReplacement = inputs.replacementPropertyBasis;
  const exchangeRatio = totalReplacement / netSaleProceeds;

  // Calculate timing
  const saleDate = new Date(inputs.relinquishedPropertySaleDate);
  const identificationDeadline = new Date(saleDate.getTime() + inputs.identificationPeriod * 24 * 60 * 60 * 1000);
  const exchangeDeadline = new Date(saleDate.getTime() + inputs.exchangePeriod * 24 * 60 * 60 * 1000);
  const today = new Date();
  const daysRemaining = Math.max(0, Math.ceil((exchangeDeadline.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)));

  // Calculate compliance
  const isQualified = calculateQualificationStatus(inputs, metrics);
  const complianceIssues = generateComplianceIssues(inputs, metrics);
  const qualificationPercentage = calculateQualificationPercentage(inputs, metrics);

  return {
    realizedGain,
    recognizedGain,
    deferredGain,
    bootReceived,
    bootGiven,
    netBoot,
    taxLiability,
    taxSavings,
    effectiveTaxRate,
    equityReplacement,
    debtReplacement,
    totalReplacement,
    exchangeRatio,
    identificationDeadline: identificationDeadline.toISOString().split('T')[0],
    exchangeDeadline: exchangeDeadline.toISOString().split('T')[0],
    daysRemaining,
    isQualified,
    complianceIssues,
    qualificationPercentage
  };
}

function generateExchangeTimeline(inputs: RealEstate1031ExchangeInputs, metrics: RealEstate1031ExchangeMetrics): ExchangeTimeline[] {
  const timeline: ExchangeTimeline[] = [];
  const saleDate = new Date(inputs.relinquishedPropertySaleDate);
  const today = new Date();

  // Sale of relinquished property
  timeline.push({
    event: 'Sale of Relinquished Property',
    date: inputs.relinquishedPropertySaleDate,
    deadline: inputs.relinquishedPropertySaleDate,
    status: saleDate <= today ? 'completed' : 'pending',
    description: 'Transfer of relinquished property to buyer',
    requirements: [
      'Execute purchase agreement',
      'Close escrow',
      'Transfer title',
      'Receive sale proceeds'
    ]
  });

  // Identification period
  const identificationDeadline = new Date(saleDate.getTime() + inputs.identificationPeriod * 24 * 60 * 60 * 1000);
  timeline.push({
    event: 'Identify Replacement Property',
    date: '',
    deadline: identificationDeadline.toISOString().split('T')[0],
    status: identificationDeadline < today ? 'overdue' : identificationDeadline > today ? 'pending' : 'completed',
    description: 'Must identify potential replacement properties',
    requirements: [
      'Identify up to 3 properties of any value',
      'Or identify more than 3 properties within 200% rule',
      'Provide written identification to qualified intermediary',
      'Meet 45-day deadline'
    ]
  });

  // Exchange period
  const exchangeDeadline = new Date(saleDate.getTime() + inputs.exchangePeriod * 24 * 60 * 60 * 1000);
  timeline.push({
    event: 'Acquire Replacement Property',
    date: inputs.replacementPropertyAcquisitionDate || '',
    deadline: exchangeDeadline.toISOString().split('T')[0],
    status: exchangeDeadline < today ? 'overdue' : exchangeDeadline > today ? 'pending' : 'completed',
    description: 'Must acquire replacement property',
    requirements: [
      'Close on replacement property',
      'Transfer title',
      'Meet 180-day deadline',
      'Use qualified intermediary'
    ]
  });

  return timeline;
}

function generateBootAnalysis(inputs: RealEstate1031ExchangeInputs, metrics: RealEstate1031ExchangeMetrics): BootAnalysis[] {
  const bootAnalysis: BootAnalysis[] = [];

  // Cash boot
  if (inputs.cashBoot > 0) {
    bootAnalysis.push({
      type: 'Cash Boot',
      amount: inputs.cashBoot,
      taxable: true,
      taxRate: inputs.taxRate + inputs.stateTaxRate,
      taxLiability: inputs.cashBoot * ((inputs.taxRate + inputs.stateTaxRate) / 100),
      description: 'Cash received in exchange is taxable'
    });
  }

  // Mortgage boot
  if (inputs.mortgageBoot > 0) {
    bootAnalysis.push({
      type: 'Mortgage Boot',
      amount: inputs.mortgageBoot,
      taxable: true,
      taxRate: inputs.taxRate + inputs.stateTaxRate,
      taxLiability: inputs.mortgageBoot * ((inputs.taxRate + inputs.stateTaxRate) / 100),
      description: 'Mortgage relief is taxable boot'
    });
  }

  // Personal property boot
  if (inputs.personalPropertyBoot > 0) {
    bootAnalysis.push({
      type: 'Personal Property Boot',
      amount: inputs.personalPropertyBoot,
      taxable: true,
      taxRate: inputs.taxRate + inputs.stateTaxRate,
      taxLiability: inputs.personalPropertyBoot * ((inputs.taxRate + inputs.stateTaxRate) / 100),
      description: 'Personal property received is taxable'
    });
  }

  // Other boot
  if (inputs.otherBoot > 0) {
    bootAnalysis.push({
      type: 'Other Boot',
      amount: inputs.otherBoot,
      taxable: true,
      taxRate: inputs.taxRate + inputs.stateTaxRate,
      taxLiability: inputs.otherBoot * ((inputs.taxRate + inputs.stateTaxRate) / 100),
      description: 'Other non-like-kind property is taxable'
    });
  }

  return bootAnalysis;
}

function generateTaxForms(inputs: RealEstate1031ExchangeInputs, metrics: RealEstate1031ExchangeMetrics): TaxForm[] {
  const taxForms: TaxForm[] = [];

  // Form 8824 - Like-Kind Exchanges
  taxForms.push({
    form: 'Form 8824',
    schedule: 'Form 1040',
    description: 'Like-Kind Exchanges',
    amount: metrics.realizedGain,
    line: '1',
    instructions: 'Report like-kind exchange information'
  });

  // Form 4797 - Sales of Business Property
  if (metrics.recognizedGain > 0) {
    taxForms.push({
      form: 'Form 4797',
      schedule: 'Form 1040',
      description: 'Sales of Business Property',
      amount: metrics.recognizedGain,
      line: '1',
      instructions: 'Report recognized gain from boot'
    });
  }

  return taxForms;
}

function generateComplianceChecks(inputs: RealEstate1031ExchangeInputs, metrics: RealEstate1031ExchangeMetrics): ComplianceCheck[] {
  const complianceChecks: ComplianceCheck[] = [];

  // Like-kind requirement
  complianceChecks.push({
    requirement: 'Like-Kind Property',
    status: inputs.likeKindRequirement ? 'pass' : 'fail',
    description: 'Properties must be of like-kind',
    impact: inputs.likeKindRequirement ? 'Exchange qualifies' : 'Exchange disqualified',
    recommendation: inputs.likeKindRequirement ? 'Continue with exchange' : 'Consult tax professional'
  });

  // Investment intent
  complianceChecks.push({
    requirement: 'Investment Intent',
    status: inputs.investmentIntent ? 'pass' : 'fail',
    description: 'Properties must be held for investment or business use',
    impact: inputs.investmentIntent ? 'Exchange qualifies' : 'Exchange disqualified',
    recommendation: inputs.investmentIntent ? 'Continue with exchange' : 'Review property use'
  });

  // Qualified intermediary
  complianceChecks.push({
    requirement: 'Qualified Intermediary',
    status: inputs.qualifiedIntermediary ? 'pass' : 'fail',
    description: 'Must use qualified intermediary for delayed exchange',
    impact: inputs.qualifiedIntermediary ? 'Exchange qualifies' : 'Exchange disqualified',
    recommendation: inputs.qualifiedIntermediary ? 'Continue with exchange' : 'Engage qualified intermediary'
  });

  // Timing requirements
  const saleDate = new Date(inputs.relinquishedPropertySaleDate);
  const identificationDeadline = new Date(saleDate.getTime() + inputs.identificationPeriod * 24 * 60 * 60 * 1000);
  const exchangeDeadline = new Date(saleDate.getTime() + inputs.exchangePeriod * 24 * 60 * 60 * 1000);
  const today = new Date();

  complianceChecks.push({
    requirement: 'Identification Period',
    status: identificationDeadline >= today ? 'pass' : 'fail',
    description: 'Must identify replacement property within 45 days',
    impact: identificationDeadline >= today ? 'Deadline met' : 'Deadline missed',
    recommendation: identificationDeadline >= today ? 'Continue with identification' : 'Consult tax professional immediately'
  });

  complianceChecks.push({
    requirement: 'Exchange Period',
    status: exchangeDeadline >= today ? 'pass' : 'fail',
    description: 'Must acquire replacement property within 180 days',
    impact: exchangeDeadline >= today ? 'Deadline met' : 'Deadline missed',
    recommendation: exchangeDeadline >= today ? 'Continue with acquisition' : 'Consult tax professional immediately'
  });

  // Related party transaction
  complianceChecks.push({
    requirement: 'Related Party Transaction',
    status: !inputs.relatedPartyTransaction ? 'pass' : 'warning',
    description: 'Related party transactions have additional restrictions',
    impact: !inputs.relatedPartyTransaction ? 'No restrictions' : 'Additional holding period required',
    recommendation: !inputs.relatedPartyTransaction ? 'Continue with exchange' : 'Ensure 2-year holding period'
  });

  return complianceChecks;
}

function generateExchangeAnalysis(inputs: RealEstate1031ExchangeInputs, metrics: RealEstate1031ExchangeMetrics): RealEstate1031ExchangeAnalysis {
  // Calculate compliance score
  const complianceChecks = generateComplianceChecks(inputs, metrics);
  const passedChecks = complianceChecks.filter(check => check.status === 'pass').length;
  const complianceScore = (passedChecks / complianceChecks.length) * 100;

  // Generate key benefits
  const keyBenefits = generateKeyBenefits(inputs, metrics);

  // Generate tax savings opportunities
  const taxSavingsOpportunities = generateTaxSavingsOpportunities(inputs, metrics);

  // Generate risks
  const risks = generateRisks(inputs, metrics);

  // Generate recommendations
  const recommendations = generateRecommendations(inputs, metrics);

  // Calculate risk level
  const riskLevel = calculateRiskLevel(inputs, metrics);

  // Generate risk factors
  const riskFactors = generateRiskFactors(inputs, metrics);

  // Generate mitigation strategies
  const mitigationStrategies = generateMitigationStrategies(inputs, metrics);

  return {
    keyBenefits,
    taxSavingsOpportunities,
    risks,
    recommendations,
    complianceScore,
    complianceIssues: metrics.complianceIssues,
    qualificationRequirements: generateQualificationRequirements(inputs, metrics),
    riskLevel,
    riskFactors,
    mitigationStrategies
  };
}

// Helper functions
function calculateQualificationStatus(inputs: RealEstate1031ExchangeInputs, metrics: RealEstate1031ExchangeMetrics): boolean {
  // Basic qualification checks
  if (!inputs.likeKindRequirement) return false;
  if (!inputs.investmentIntent) return false;
  if (!inputs.qualifiedIntermediary) return false;

  // Timing checks
  const saleDate = new Date(inputs.relinquishedPropertySaleDate);
  const identificationDeadline = new Date(saleDate.getTime() + inputs.identificationPeriod * 24 * 60 * 60 * 1000);
  const exchangeDeadline = new Date(saleDate.getTime() + inputs.exchangePeriod * 24 * 60 * 60 * 1000);
  const today = new Date();

  if (identificationDeadline < today) return false;
  if (exchangeDeadline < today) return false;

  return true;
}

function generateComplianceIssues(inputs: RealEstate1031ExchangeInputs, metrics: RealEstate1031ExchangeMetrics): string[] {
  const issues: string[] = [];

  if (!inputs.likeKindRequirement) {
    issues.push('Properties are not like-kind');
  }

  if (!inputs.investmentIntent) {
    issues.push('Properties not held for investment intent');
  }

  if (!inputs.qualifiedIntermediary) {
    issues.push('Qualified intermediary not used');
  }

  const saleDate = new Date(inputs.relinquishedPropertySaleDate);
  const identificationDeadline = new Date(saleDate.getTime() + inputs.identificationPeriod * 24 * 60 * 60 * 1000);
  const exchangeDeadline = new Date(saleDate.getTime() + inputs.exchangePeriod * 24 * 60 * 60 * 1000);
  const today = new Date();

  if (identificationDeadline < today) {
    issues.push('Identification period deadline missed');
  }

  if (exchangeDeadline < today) {
    issues.push('Exchange period deadline missed');
  }

  return issues;
}

function calculateQualificationPercentage(inputs: RealEstate1031ExchangeInputs, metrics: RealEstate1031ExchangeMetrics): number {
  const complianceChecks = generateComplianceChecks(inputs, metrics);
  const passedChecks = complianceChecks.filter(check => check.status === 'pass').length;
  return (passedChecks / complianceChecks.length) * 100;
}

function generateKeyBenefits(inputs: RealEstate1031ExchangeInputs, metrics: RealEstate1031ExchangeMetrics): string[] {
  const benefits: string[] = [];

  if (metrics.taxSavings > 0) {
    benefits.push(`Tax savings of ${metrics.taxSavings.toLocaleString()}`);
  }

  if (metrics.deferredGain > 0) {
    benefits.push(`Deferred gain of ${metrics.deferredGain.toLocaleString()}`);
  }

  benefits.push('Tax-deferred exchange of investment properties');
  benefits.push('Preservation of investment capital');
  benefits.push('Ability to upgrade or diversify holdings');

  return benefits;
}

function generateTaxSavingsOpportunities(inputs: RealEstate1031ExchangeInputs, metrics: RealEstate1031ExchangeMetrics): string[] {
  const opportunities: string[] = [];

  if (metrics.netBoot > 0) {
    opportunities.push('Minimize boot to reduce taxable gain');
  }

  if (inputs.replacementPropertyBasis < inputs.relinquishedPropertySalePrice) {
    opportunities.push('Consider higher-value replacement property');
  }

  opportunities.push('Ensure all requirements are met for full deferral');
  opportunities.push('Use qualified intermediary for proper structure');

  return opportunities;
}

function generateRisks(inputs: RealEstate1031ExchangeInputs, metrics: RealEstate1031ExchangeMetrics): string[] {
  const risks: string[] = [];

  if (metrics.netBoot > 0) {
    risks.push('Boot received creates immediate tax liability');
  }

  if (!inputs.qualifiedIntermediary) {
    risks.push('Exchange may be disqualified without qualified intermediary');
  }

  if (inputs.relatedPartyTransaction) {
    risks.push('Related party transactions have additional restrictions');
  }

  risks.push('Strict timing requirements must be met');
  risks.push('All requirements must be satisfied for qualification');

  return risks;
}

function generateRecommendations(inputs: RealEstate1031ExchangeInputs, metrics: RealEstate1031ExchangeMetrics): string[] {
  const recommendations: string[] = [];

  recommendations.push('Consult with qualified tax professional');
  recommendations.push('Use experienced qualified intermediary');
  recommendations.push('Meet all timing requirements');
  recommendations.push('Ensure proper documentation');

  if (metrics.netBoot > 0) {
    recommendations.push('Consider strategies to minimize boot');
  }

  if (!inputs.qualifiedIntermediary) {
    recommendations.push('Engage qualified intermediary immediately');
  }

  return recommendations;
}

function calculateRiskLevel(inputs: RealEstate1031ExchangeInputs, metrics: RealEstate1031ExchangeMetrics): 'low' | 'medium' | 'high' {
  let riskScore = 0;

  if (!inputs.qualifiedIntermediary) riskScore += 3;
  if (inputs.relatedPartyTransaction) riskScore += 2;
  if (metrics.netBoot > 0) riskScore += 2;
  if (metrics.complianceIssues.length > 0) riskScore += metrics.complianceIssues.length;

  if (riskScore <= 2) return 'low';
  if (riskScore <= 5) return 'medium';
  return 'high';
}

function generateRiskFactors(inputs: RealEstate1031ExchangeInputs, metrics: RealEstate1031ExchangeMetrics): string[] {
  const factors: string[] = [];

  if (!inputs.qualifiedIntermediary) {
    factors.push('No qualified intermediary used');
  }

  if (inputs.relatedPartyTransaction) {
    factors.push('Related party transaction');
  }

  if (metrics.netBoot > 0) {
    factors.push('Boot received in exchange');
  }

  if (metrics.complianceIssues.length > 0) {
    factors.push('Multiple compliance issues');
  }

  return factors;
}

function generateMitigationStrategies(inputs: RealEstate1031ExchangeInputs, metrics: RealEstate1031ExchangeMetrics): string[] {
  const strategies: string[] = [];

  if (!inputs.qualifiedIntermediary) {
    strategies.push('Engage qualified intermediary immediately');
  }

  if (inputs.relatedPartyTransaction) {
    strategies.push('Ensure 2-year holding period for replacement property');
  }

  if (metrics.netBoot > 0) {
    strategies.push('Consider strategies to minimize boot');
  }

  strategies.push('Meet all timing requirements');
  strategies.push('Maintain proper documentation');

  return strategies;
}

function generateQualificationRequirements(inputs: RealEstate1031ExchangeInputs, metrics: RealEstate1031ExchangeMetrics): string[] {
  const requirements: string[] = [
    'Properties must be like-kind',
    'Properties must be held for investment or business use',
    'Must use qualified intermediary for delayed exchange',
    'Must identify replacement property within 45 days',
    'Must acquire replacement property within 180 days',
    'Must not receive boot (or pay tax on boot received)',
    'Must not be a related party transaction (or meet holding period)'
  ];

  return requirements;
}