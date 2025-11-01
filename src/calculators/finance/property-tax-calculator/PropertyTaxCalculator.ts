import { Calculator } from '../../../types/calculator';
import { PropertyTaxInputs, PropertyTaxOutputs } from './types';
import { calculatePropertyTaxAnalysis } from './formulas';
import { validatePropertyTaxInputs, validatePropertyTaxBusinessRules } from './validation';

export const PropertyTaxCalculator: Calculator = {
  id: 'PropertyTaxCalculator',
  title: 'Property Tax Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Calculate property taxes, analyze assessment accuracy, evaluate appeal opportunities, and project future tax obligations with comprehensive exemption and relief program analysis.',
  usageInstructions: [
    'Enter property details and location information',
    'Input assessment and tax rate data',
    'Specify applicable exemptions and relief programs',
    'Review tax calculations and appeal opportunities',
    'Analyze projections and optimization strategies'
  ],

  inputs: [
    {
      id: 'propertyValue',
      label: 'Property Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current market value of the property'
    },
    {
      id: 'assessedValue',
      label: 'Assessed Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Value used by tax authority for assessment'
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'Residential', label: 'Residential' },
        { value: 'Commercial', label: 'Commercial' },
        { value: 'Vacant Land', label: 'Vacant Land' },
        { value: 'Agricultural', label: 'Agricultural' },
        { value: 'Industrial', label: 'Industrial' }
      ],
      tooltip: 'Type of property for tax calculation'
    },
    {
      id: 'propertyAddress',
      label: 'Property Address',
      type: 'text',
      required: true,
      tooltip: 'Full street address of the property'
    },
    {
      id: 'city',
      label: 'City',
      type: 'text',
      required: true,
      tooltip: 'City where property is located'
    },
    {
      id: 'state',
      label: 'State',
      type: 'text',
      required: true,
      tooltip: 'State where property is located'
    },
    {
      id: 'zipCode',
      label: 'Zip Code',
      type: 'text',
      required: true,
      tooltip: 'Zip code of the property'
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 20,
      step: 0.01,
      tooltip: 'Total property tax rate (mill rate)'
    },
    {
      id: 'assessmentRatio',
      label: 'Assessment Ratio (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      step: 1,
      tooltip: 'Percentage of market value used for assessment'
    },
    {
      id: 'taxCalculationMethod',
      label: 'Tax Calculation Method',
      type: 'select',
      required: false,
      options: [
        { value: 'Assessed Value', label: 'Assessed Value' },
        { value: 'Market Value', label: 'Market Value' },
        { value: 'Appraised Value', label: 'Appraised Value' }
      ],
      defaultValue: 'Assessed Value',
      tooltip: 'Method used to calculate property taxes'
    },
    {
      id: 'homesteadExemption',
      label: 'Homestead Exemption ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Homestead exemption amount'
    },
    {
      id: 'seniorExemption',
      label: 'Senior Exemption ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Senior citizen exemption amount'
    },
    {
      id: 'disabilityExemption',
      label: 'Disability Exemption ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Disability exemption amount'
    },
    {
      id: 'veteranExemption',
      label: 'Veteran Exemption ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Veteran exemption amount'
    },
    {
      id: 'otherExemptions',
      label: 'Other Exemptions ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Other applicable exemptions'
    },
    {
      id: 'schoolDistrictTax',
      label: 'School District Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 10,
      step: 0.01,
      tooltip: 'Additional school district tax rate'
    },
    {
      id: 'fireDistrictTax',
      label: 'Fire District Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 5,
      step: 0.01,
      tooltip: 'Additional fire district tax rate'
    },
    {
      id: 'libraryDistrictTax',
      label: 'Library District Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 5,
      step: 0.01,
      tooltip: 'Additional library district tax rate'
    },
    {
      id: 'otherDistrictTaxes',
      label: 'Other District Taxes (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 5,
      step: 0.01,
      tooltip: 'Other special district tax rates'
    },
    {
      id: 'paymentFrequency',
      label: 'Payment Frequency',
      type: 'select',
      required: false,
      options: [
        { value: 'Annual', label: 'Annual' },
        { value: 'Semi-Annual', label: 'Semi-Annual' },
        { value: 'Quarterly', label: 'Quarterly' },
        { value: 'Monthly', label: 'Monthly' }
      ],
      defaultValue: 'Annual',
      tooltip: 'How often property taxes are paid'
    },
    {
      id: 'paymentDueDate',
      label: 'Payment Due Date',
      type: 'date',
      required: true,
      tooltip: 'Date when property tax payment is due'
    },
    {
      id: 'lastPaymentDate',
      label: 'Last Payment Date',
      type: 'date',
      required: true,
      tooltip: 'Date of last property tax payment'
    },
    {
      id: 'lastPaymentAmount',
      label: 'Last Payment Amount ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Amount of last property tax payment'
    },
    {
      id: 'previousYearTax',
      label: 'Previous Year Tax ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Property tax amount from previous year'
    },
    {
      id: 'twoYearsAgoTax',
      label: 'Two Years Ago Tax ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Property tax amount from two years ago'
    },
    {
      id: 'threeYearsAgoTax',
      label: 'Three Years Ago Tax ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Property tax amount from three years ago'
    },
    {
      id: 'assessmentYear',
      label: 'Assessment Year',
      type: 'number',
      required: false,
      min: 1800,
      max: 2100,
      tooltip: 'Year of last property assessment'
    },
    {
      id: 'reassessmentFrequency',
      label: 'Reassessment Frequency (Years)',
      type: 'number',
      required: false,
      min: 1,
      max: 10,
      tooltip: 'How often property is reassessed'
    },
    {
      id: 'lastAssessmentDate',
      label: 'Last Assessment Date',
      type: 'date',
      required: true,
      tooltip: 'Date of last property assessment'
    },
    {
      id: 'circuitBreakerProgram',
      label: 'Circuit Breaker Program',
      type: 'boolean',
      required: false,
      defaultValue: false,
      tooltip: 'Whether enrolled in circuit breaker tax relief program'
    },
    {
      id: 'propertyTaxRelief',
      label: 'Property Tax Relief',
      type: 'boolean',
      required: false,
      defaultValue: false,
      tooltip: 'Whether receiving property tax relief'
    },
    {
      id: 'taxDeferralProgram',
      label: 'Tax Deferral Program',
      type: 'boolean',
      required: false,
      defaultValue: false,
      tooltip: 'Whether enrolled in tax deferral program'
    },
    {
      id: 'abatementProgram',
      label: 'Abatement Program',
      type: 'boolean',
      required: false,
      defaultValue: false,
      tooltip: 'Whether property qualifies for tax abatement'
    },
    {
      id: 'householdIncome',
      label: 'Annual Household Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Total annual household income for relief eligibility'
    },
    {
      id: 'numberOfDependents',
      label: 'Number of Dependents',
      type: 'number',
      required: false,
      min: 0,
      max: 10,
      tooltip: 'Number of dependents in household'
    },
    {
      id: 'ageOfHomeowner',
      label: 'Age of Homeowner',
      type: 'number',
      required: false,
      min: 0,
      max: 150,
      tooltip: 'Age of homeowner for senior relief eligibility'
    },
    {
      id: 'disabilityStatus',
      label: 'Disability Status',
      type: 'boolean',
      required: false,
      defaultValue: false,
      tooltip: 'Whether homeowner has disability for relief eligibility'
    },
    {
      id: 'veteranStatus',
      label: 'Veteran Status',
      type: 'boolean',
      required: false,
      defaultValue: false,
      tooltip: 'Whether homeowner is veteran for relief eligibility'
    },
    {
      id: 'averageTaxRate',
      label: 'Local Average Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      step: 0.01,
      tooltip: 'Average property tax rate in local area'
    },
    {
      id: 'medianTaxRate',
      label: 'Local Median Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      step: 0.01,
      tooltip: 'Median property tax rate in local area'
    },
    {
      id: 'localTaxRateRange',
      label: 'Local Tax Rate Range (%)',
      type: 'object',
      required: false,
      tooltip: 'Range of property tax rates in local area',
      properties: {
        low: { type: 'percentage', min: 0, max: 20 },
        high: { type: 'percentage', min: 0, max: 20 }
      }
    },
    {
      id: 'includeTaxReliefAnalysis',
      label: 'Include Tax Relief Analysis',
      type: 'boolean',
      required: false,
      defaultValue: true,
      tooltip: 'Whether to include tax relief program analysis'
    },
    {
      id: 'includeAppealAnalysis',
      label: 'Include Appeal Analysis',
      type: 'boolean',
      required: false,
      defaultValue: true,
      tooltip: 'Whether to include property tax appeal analysis'
    },
    {
      id: 'includeComparisonAnalysis',
      label: 'Include Comparison Analysis',
      type: 'boolean',
      required: false,
      defaultValue: true,
      tooltip: 'Whether to include local market comparison'
    },
    {
      id: 'includeProjectionAnalysis',
      label: 'Include Projection Analysis',
      type: 'boolean',
      required: false,
      defaultValue: true,
      tooltip: 'Whether to include future tax projections'
    },
    {
      id: 'appealFiled',
      label: 'Appeal Filed',
      type: 'boolean',
      required: false,
      defaultValue: false,
      tooltip: 'Whether a property tax appeal has been filed'
    },
    {
      id: 'appealFiledDate',
      label: 'Appeal Filed Date',
      type: 'date',
      required: false,
      tooltip: 'Date when appeal was filed'
    },
    {
      id: 'appealHearingDate',
      label: 'Appeal Hearing Date',
      type: 'date',
      required: false,
      tooltip: 'Date of appeal hearing'
    },
    {
      id: 'appraisedValueAppeal',
      label: 'Appeal Appraised Value ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Appraised value claimed in appeal'
    },
    {
      id: 'assessmentAppeal',
      label: 'Appeal Assessment Value ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Assessment value claimed in appeal'
    },
    {
      id: 'expectedValueChange',
      label: 'Expected Annual Value Change (%)',
      type: 'percentage',
      required: false,
      min: -50,
      max: 100,
      step: 0.1,
      tooltip: 'Expected annual change in property value'
    },
    {
      id: 'expectedRateChange',
      label: 'Expected Annual Rate Change (%)',
      type: 'percentage',
      required: false,
      min: -20,
      max: 50,
      step: 0.1,
      tooltip: 'Expected annual change in tax rate'
    },
    {
      id: 'projectionYears',
      label: 'Projection Period (Years)',
      type: 'number',
      required: false,
      min: 0,
      max: 50,
      defaultValue: 5,
      tooltip: 'Number of years for tax projections'
    }
  ],

  outputs: [
    {
      id: 'annualPropertyTax',
      label: 'Annual Property Tax ($)',
      type: 'currency',
      explanation: 'Total annual property tax amount'
    },
    {
      id: 'monthlyPropertyTax',
      label: 'Monthly Property Tax ($)',
      type: 'currency',
      explanation: 'Monthly property tax amount'
    },
    {
      id: 'quarterlyPropertyTax',
      label: 'Quarterly Property Tax ($)',
      type: 'currency',
      explanation: 'Quarterly property tax amount'
    },
    {
      id: 'semiAnnualPropertyTax',
      label: 'Semi-Annual Property Tax ($)',
      type: 'currency',
      explanation: 'Semi-annual property tax amount'
    },
    {
      id: 'taxableValue',
      label: 'Taxable Value ($)',
      type: 'currency',
      explanation: 'Property value subject to taxation after exemptions'
    },
    {
      id: 'assessedValueUsed',
      label: 'Assessed Value Used ($)',
      type: 'currency',
      explanation: 'Assessed value used in tax calculation'
    },
    {
      id: 'totalExemptions',
      label: 'Total Exemptions ($)',
      type: 'currency',
      explanation: 'Total value of all applicable exemptions'
    },
    {
      id: 'exemptionSavings',
      label: 'Exemption Savings ($)',
      type: 'currency',
      explanation: 'Annual tax savings from exemptions'
    },
    {
      id: 'baseTaxAmount',
      label: 'Base Tax Amount ($)',
      type: 'currency',
      explanation: 'Tax amount from base property tax rate'
    },
    {
      id: 'schoolDistrictTaxAmount',
      label: 'School District Tax ($)',
      type: 'currency',
      explanation: 'Additional tax from school district'
    },
    {
      id: 'fireDistrictTaxAmount',
      label: 'Fire District Tax ($)',
      type: 'currency',
      explanation: 'Additional tax from fire district'
    },
    {
      id: 'libraryDistrictTaxAmount',
      label: 'Library District Tax ($)',
      type: 'currency',
      explanation: 'Additional tax from library district'
    },
    {
      id: 'otherDistrictTaxAmount',
      label: 'Other District Taxes ($)',
      type: 'currency',
      explanation: 'Additional taxes from other districts'
    },
    {
      id: 'eligibleExemptions',
      label: 'Eligible Exemptions',
      type: 'text',
      explanation: 'List of exemptions you may be eligible for'
    },
    {
      id: 'totalTaxRelief',
      label: 'Total Tax Relief ($)',
      type: 'currency',
      explanation: 'Total annual tax relief from all programs'
    },
    {
      id: 'circuitBreakerSavings',
      label: 'Circuit Breaker Savings ($)',
      type: 'currency',
      explanation: 'Annual savings from circuit breaker program'
    },
    {
      id: 'propertyTaxReliefSavings',
      label: 'Property Tax Relief Savings ($)',
      type: 'currency',
      explanation: 'Annual savings from property tax relief program'
    },
    {
      id: 'taxDeferralAmount',
      label: 'Tax Deferral Amount ($)',
      type: 'currency',
      explanation: 'Amount of taxes deferred annually'
    },
    {
      id: 'appealPotentialSavings',
      label: 'Appeal Potential Savings ($)',
      type: 'currency',
      explanation: 'Potential annual savings from successful appeal'
    },
    {
      id: 'appealSuccessProbability',
      label: 'Appeal Success Probability (%)',
      type: 'percentage',
      explanation: 'Estimated probability of appeal success'
    },
    {
      id: 'recommendedAppealValue',
      label: 'Recommended Appeal Value ($)',
      type: 'currency',
      explanation: 'Recommended value to claim in appeal'
    },
    {
      id: 'appealCostBenefit',
      label: 'Appeal Cost-Benefit Ratio',
      type: 'number',
      explanation: 'Ratio of potential savings to appeal costs'
    },
    {
      id: 'vsAverageTaxRate',
      label: 'vs Average Tax Rate (%)',
      type: 'percentage',
      explanation: 'Comparison to local average tax rate'
    },
    {
      id: 'vsMedianTaxRate',
      label: 'vs Median Tax Rate (%)',
      type: 'percentage',
      explanation: 'Comparison to local median tax rate'
    },
    {
      id: 'percentileRanking',
      label: 'Percentile Ranking',
      type: 'number',
      explanation: 'Percentile ranking of your tax rate locally'
    },
    {
      id: 'lowerThan',
      label: 'Lower Than (%)',
      type: 'percentage',
      explanation: 'Percentage of properties with lower taxes'
    },
    {
      id: 'higherThan',
      label: 'Higher Than (%)',
      type: 'percentage',
      explanation: 'Percentage of properties with higher taxes'
    },
    {
      id: 'taxBurdenRatio',
      label: 'Tax Burden Ratio (%)',
      type: 'percentage',
      explanation: 'Tax amount as percentage of property value'
    },
    {
      id: 'taxBurdenCategory',
      label: 'Tax Burden Category',
      type: 'text',
      explanation: 'Category describing tax burden level'
    },
    {
      id: 'affordabilityIndex',
      label: 'Affordability Index (%)',
      type: 'percentage',
      explanation: 'Tax affordability based on income'
    },
    {
      id: 'projectedTax5Years',
      label: 'Projected Tax in 5 Years ($)',
      type: 'currency',
      explanation: 'Estimated property tax in 5 years'
    },
    {
      id: 'projectedTax10Years',
      label: 'Projected Tax in 10 Years ($)',
      type: 'currency',
      explanation: 'Estimated property tax in 10 years'
    },
    {
      id: 'projectedTaxIncrease',
      label: 'Projected Tax Increase ($)',
      type: 'currency',
      explanation: 'Projected increase in property tax'
    },
    {
      id: 'taxIncreaseRate',
      label: 'Tax Increase Rate (%)',
      type: 'percentage',
      explanation: 'Annual rate of tax increase'
    },
    {
      id: 'totalPaidThisYear',
      label: 'Total Paid This Year ($)',
      type: 'currency',
      explanation: 'Total property taxes paid this year'
    },
    {
      id: 'remainingBalance',
      label: 'Remaining Balance ($)',
      type: 'currency',
      explanation: 'Remaining property tax balance'
    },
    {
      id: 'nextPaymentDate',
      label: 'Next Payment Date',
      type: 'text',
      explanation: 'Date of next property tax payment'
    },
    {
      id: 'nextPaymentAmount',
      label: 'Next Payment Amount ($)',
      type: 'currency',
      explanation: 'Amount due for next property tax payment'
    },
    {
      id: 'potentialAnnualSavings',
      label: 'Potential Annual Savings ($)',
      type: 'currency',
      explanation: 'Potential annual savings from optimizations'
    },
    {
      id: 'potentialMonthlySavings',
      label: 'Potential Monthly Savings ($)',
      type: 'currency',
      explanation: 'Potential monthly savings from optimizations'
    },
    {
      id: 'breakEvenPeriodMonths',
      label: 'Break-Even Period (Months)',
      type: 'number',
      explanation: 'Months to recover costs of tax-saving actions'
    },
    {
      id: 'effectiveTaxRate',
      label: 'Effective Tax Rate (%)',
      type: 'percentage',
      explanation: 'Actual tax rate after exemptions and relief'
    },
    {
      id: 'taxEfficiencyScore',
      label: 'Tax Efficiency Score (0-100)',
      type: 'number',
      explanation: 'Score indicating tax efficiency'
    },
    {
      id: 'taxOptimizationTips',
      label: 'Tax Optimization Tips',
      type: 'text',
      explanation: 'Tips for optimizing property taxes'
    },
    {
      id: 'assessmentAccuracy',
      label: 'Assessment Accuracy (%)',
      type: 'percentage',
      explanation: 'Accuracy of current property assessment'
    },
    {
      id: 'overAssessmentAmount',
      label: 'Over-Assessment Amount ($)',
      type: 'currency',
      explanation: 'Amount property may be over-assessed'
    },
    {
      id: 'underAssessmentAmount',
      label: 'Under-Assessment Amount ($)',
      type: 'currency',
      explanation: 'Amount property may be under-assessed'
    },
    {
      id: 'assessmentAppealRecommendation',
      label: 'Assessment Appeal Recommendation',
      type: 'text',
      explanation: 'Recommendation regarding assessment appeal'
    },
    {
      id: 'marketTaxRate',
      label: 'Market Tax Rate (%)',
      type: 'percentage',
      explanation: 'Market average tax rate'
    },
    {
      id: 'marketComparison',
      label: 'Market Comparison',
      type: 'text',
      explanation: 'Comparison to market tax rates'
    },
    {
      id: 'marketAdjustmentNeeded',
      label: 'Market Adjustment Needed (%)',
      type: 'percentage',
      explanation: 'Adjustment needed to match market rates'
    },
    {
      id: 'stateTaxLaws',
      label: 'State Tax Laws',
      type: 'text',
      explanation: 'Relevant state property tax laws'
    },
    {
      id: 'stateExemptions',
      label: 'State Exemptions',
      type: 'text',
      explanation: 'Available state tax exemptions'
    },
    {
      id: 'stateReliefPrograms',
      label: 'State Relief Programs',
      type: 'text',
      explanation: 'Available state tax relief programs'
    },
    {
      id: 'localTaxAuthorities',
      label: 'Local Tax Authorities',
      type: 'text',
      explanation: 'Local tax authority contact information'
    },
    {
      id: 'localAssessmentProcess',
      label: 'Local Assessment Process',
      type: 'text',
      explanation: 'Local property assessment procedures'
    },
    {
      id: 'localAppealProcess',
      label: 'Local Appeal Process',
      type: 'text',
      explanation: 'Local property tax appeal procedures'
    },
    {
      id: 'paymentOptions',
      label: 'Payment Options',
      type: 'text',
      explanation: 'Available property tax payment options'
    },
    {
      id: 'paymentDeadlines',
      label: 'Payment Deadlines',
      type: 'text',
      explanation: 'Property tax payment deadlines'
    },
    {
      id: 'penaltyInformation',
      label: 'Penalty Information',
      type: 'text',
      explanation: 'Information about late payment penalties'
    },
    {
      id: 'lienStatus',
      label: 'Lien Status',
      type: 'text',
      explanation: 'Status of any property tax liens'
    },
    {
      id: 'lienAmount',
      label: 'Lien Amount ($)',
      type: 'currency',
      explanation: 'Amount of property tax lien'
    },
    {
      id: 'lienPriority',
      label: 'Lien Priority',
      type: 'number',
      explanation: 'Priority of property tax lien'
    },
    {
      id: 'taxTrend',
      label: 'Tax Trend',
      type: 'text',
      explanation: 'Trend in property tax amounts over time'
    },
    {
      id: 'averageAnnualIncrease',
      label: 'Average Annual Increase (%)',
      type: 'percentage',
      explanation: 'Average annual increase in property taxes'
    },
    {
      id: 'taxVolatility',
      label: 'Tax Volatility (%)',
      type: 'percentage',
      explanation: 'Volatility in property tax amounts'
    },
    {
      id: 'recommendedActions',
      label: 'Recommended Actions',
      type: 'text',
      explanation: 'Recommended actions to optimize property taxes'
    },
    {
      id: 'priorityActions',
      label: 'Priority Actions',
      type: 'text',
      explanation: 'High-priority actions to take'
    },
    {
      id: 'longTermStrategy',
      label: 'Long-Term Strategy',
      type: 'text',
      explanation: 'Long-term strategy for property tax management'
    },
    {
      id: 'taxRiskLevel',
      label: 'Tax Risk Level',
      type: 'text',
      explanation: 'Overall risk level for property taxes'
    },
    {
      id: 'riskFactors',
      label: 'Risk Factors',
      type: 'text',
      explanation: 'Factors that could increase property taxes'
    },
    {
      id: 'mitigationStrategies',
      label: 'Mitigation Strategies',
      type: 'text',
      explanation: 'Strategies to mitigate tax risks'
    },
    {
      id: 'taxFacts',
      label: 'Tax Facts',
      type: 'text',
      explanation: 'Important facts about property taxes'
    },
    {
      id: 'exemptionTips',
      label: 'Exemption Tips',
      type: 'text',
      explanation: 'Tips for claiming tax exemptions'
    },
    {
      id: 'appealTips',
      label: 'Appeal Tips',
      type: 'text',
      explanation: 'Tips for appealing property assessments'
    },
    {
      id: 'totalTaxCost',
      label: 'Total Tax Cost ($)',
      type: 'currency',
      explanation: 'Total cost of property ownership taxes'
    },
    {
      id: 'taxAsPercentageOfIncome',
      label: 'Tax as % of Income',
      type: 'percentage',
      explanation: 'Property tax as percentage of annual income'
    },
    {
      id: 'taxPerSquareFoot',
      label: 'Tax per Square Foot ($)',
      type: 'currency',
      explanation: 'Property tax per square foot of living space'
    },
    {
      id: 'taxPerBedroom',
      label: 'Tax per Bedroom ($)',
      type: 'currency',
      explanation: 'Property tax per bedroom'
    },
    {
      id: 'neighborhoodAverageTax',
      label: 'Neighborhood Average Tax ($)',
      type: 'currency',
      explanation: 'Average property tax in neighborhood'
    },
    {
      id: 'cityAverageTax',
      label: 'City Average Tax ($)',
      type: 'currency',
      explanation: 'Average property tax in city'
    },
    {
      id: 'stateAverageTax',
      label: 'State Average Tax ($)',
      type: 'currency',
      explanation: 'Average property tax in state'
    },
    {
      id: 'taxImpactOnPropertyValue',
      label: 'Tax Impact on Property Value ($)',
      type: 'currency',
      explanation: 'Impact of taxes on property market value'
    },
    {
      id: 'taxEfficiencyRating',
      label: 'Tax Efficiency Rating',
      type: 'text',
      explanation: 'Letter grade for tax efficiency'
    },
    {
      id: 'afterTaxCashFlow',
      label: 'After-Tax Cash Flow ($)',
      type: 'currency',
      explanation: 'Cash flow after property taxes'
    },
    {
      id: 'taxAdjustedROI',
      label: 'Tax-Adjusted ROI (%)',
      type: 'percentage',
      explanation: 'Return on investment after tax considerations'
    },
    {
      id: 'taxLeverageEffect',
      label: 'Tax Leverage Effect ($)',
      type: 'currency',
      explanation: 'Tax benefits from property ownership leverage'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Single Family Home Tax Calculation',
      description: 'Property tax calculation for a typical single family home with homestead exemption',
      inputs: {
        propertyValue: 350000,
        assessedValue: 320000,
        propertyType: 'Residential',
        propertyAddress: '123 Main Street',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        taxRate: 1.25,
        homesteadExemption: 7000,
        paymentFrequency: 'Annual',
        paymentDueDate: '2024-12-01',
        lastPaymentDate: '2023-12-01',
        previousYearTax: 3875,
        assessmentYear: 2023,
        householdIncome: 85000,
        ageOfHomeowner: 45,
        averageTaxRate: 1.15,
        medianTaxRate: 1.20,
        localTaxRateRange: { low: 0.80, high: 1.80 },
        expectedValueChange: 3,
        expectedRateChange: 0.5,
        projectionYears: 5
      },
      expectedOutputs: {
        annualPropertyTax: 3937.50,
        taxableValue: 313000,
        totalExemptions: 7000,
        exemptionSavings: 87.50,
        taxBurdenRatio: 1.13,
        effectiveTaxRate: 1.23,
        projectedTax5Years: 4540,
        recommendedActions: 'Monitor assessment changes'
      }
    },
    {
      title: 'Senior Citizen Tax Relief Analysis',
      description: 'Property tax analysis for senior homeowner eligible for multiple exemptions',
      inputs: {
        propertyValue: 275000,
        assessedValue: 250000,
        propertyType: 'Residential',
        propertyAddress: '456 Oak Avenue',
        city: 'Sometown',
        state: 'FL',
        zipCode: '67890',
        taxRate: 1.85,
        homesteadExemption: 25000,
        seniorExemption: 500,
        veteranExemption: 0,
        paymentFrequency: 'Semi-Annual',
        paymentDueDate: '2024-11-01',
        lastPaymentDate: '2024-05-01',
        previousYearTax: 3375,
        assessmentYear: 2023,
        circuitBreakerProgram: true,
        propertyTaxRelief: true,
        householdIncome: 45000,
        ageOfHomeowner: 72,
        veteranStatus: false,
        averageTaxRate: 1.75,
        medianTaxRate: 1.80,
        localTaxRateRange: { low: 1.20, high: 2.50 },
        expectedValueChange: 2.5,
        expectedRateChange: 0.3,
        projectionYears: 5
      },
      expectedOutputs: {
        annualPropertyTax: 4181.25,
        taxableValue: 224500,
        totalExemptions: 25500,
        exemptionSavings: 471.25,
        totalTaxRelief: 625,
        circuitBreakerSavings: 375,
        propertyTaxReliefSavings: 250,
        taxBurdenRatio: 1.52,
        recommendedActions: 'Apply for additional senior relief programs'
      }
    }
  ]
};