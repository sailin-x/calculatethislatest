import { Calculator } from '../../types/calculator';
import { personalInjuryCalculatorFormula } from './formulas';
import { getPersonalInjuryValidationRules } from './validation';

/**
 * Professional personal injury settlement calculator with legal accuracy
 */
export const personalInjuryCalculator: Calculator = {
  id: 'PersonalInjuryCalculator',
  title: 'Personal Injury Settlement Calculator',
  category: 'legal',
  subcategory: 'Personal Injury',
  description: 'Calculate personal injury settlements with jurisdiction-specific multipliers, medical cost projections, lost wage analysis, and comparative negligence adjustments.',
  
  usageInstructions: [
    'Enter all past and future medical costs related to the injury',
    'Input past and future lost wages with career progression details',
    'Select the injury severity level and whether it is permanent',
    'Choose your jurisdiction for state-specific legal calculations',
    'Add any comparative negligence percentage if applicable',
    'Include insurance policy limits and economic factors',
    'Review comprehensive settlement breakdown and legal considerations'
  ],

  inputs: [
    {
      id: 'pastMedicalCosts',
      label: 'Past Medical Costs',
      type: 'currency',
      required: true,
      placeholder: '50000',
      tooltip: 'All medical expenses incurred from injury date to present',
      defaultValue: 50000
    },
    {
      id: 'futureMedicalCosts',
      label: 'Future Medical Costs (Annual)',
      type: 'currency',
      required: true,
      placeholder: '25000',
      tooltip: 'Estimated annual future medical expenses',
      defaultValue: 25000
    },
    {
      id: 'lifeCareCost',
      label: 'Life Care Plan Cost - Optional',
      type: 'currency',
      required: false,
      placeholder: '500000',
      tooltip: 'Total cost of comprehensive life care plan for catastrophic injuries'
    },
    {
      id: 'pastLostWages',
      label: 'Past Lost Wages',
      type: 'currency',
      required: true,
      placeholder: '75000',
      tooltip: 'Total wages lost from injury date to present',
      defaultValue: 75000
    },
    {
      id: 'futureLostWages',
      label: 'Future Lost Wages (Annual)',
      type: 'currency',
      required: true,
      placeholder: '60000',
      tooltip: 'Annual wages that will be lost due to injury',
      defaultValue: 60000
    },
    {
      id: 'ageAtInjury',
      label: 'Age at Time of Injury',
      type: 'number',
      required: true,
      placeholder: '35',
      tooltip: 'Age when the injury occurred',
      defaultValue: 35,
      min: 0,
      max: 120
    },
    {
      id: 'retirementAge',
      label: 'Expected Retirement Age',
      type: 'number',
      required: true,
      placeholder: '65',
      tooltip: 'Age at which person would have retired',
      defaultValue: 65,
      min: 50,
      max: 85
    },
    {
      id: 'annualSalary',
      label: 'Annual Salary at Injury',
      type: 'currency',
      required: true,
      placeholder: '75000',
      tooltip: 'Annual salary at the time of injury',
      defaultValue: 75000
    },
    {
      id: 'careerGrowthRate',
      label: 'Career Growth Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '3.0',
      tooltip: 'Expected annual salary growth rate',
      defaultValue: 3.0,
      step: 0.1
    },
    {
      id: 'injurySeverity',
      label: 'Injury Severity',
      type: 'select',
      required: true,
      options: [
        { value: 'minor', label: 'Minor (Temporary, full recovery)' },
        { value: 'moderate', label: 'Moderate (Significant treatment needed)' },
        { value: 'severe', label: 'Severe (Long-term impact)' },
        { value: 'catastrophic', label: 'Catastrophic (Life-altering permanent)' }
      ],
      tooltip: 'Severity level of the injury for pain and suffering calculations',
      defaultValue: 'moderate'
    },
    {
      id: 'isPermanent',
      label: 'Is Injury Permanent?',
      type: 'boolean',
      required: true,
      tooltip: 'Whether the injury results in permanent disability or impairment',
      defaultValue: false
    },
    {
      id: 'disabilityPercentage',
      label: 'Disability Percentage - Optional',
      type: 'percentage',
      required: false,
      placeholder: '25',
      tooltip: 'Percentage of disability for partial disability cases'
    },
    {
      id: 'jurisdiction',
      label: 'Jurisdiction (State)',
      type: 'select',
      required: true,
      options: [
        { value: 'california', label: 'California' },
        { value: 'texas', label: 'Texas' },
        { value: 'florida', label: 'Florida' },
        { value: 'new-york', label: 'New York' },
        { value: 'illinois', label: 'Illinois' },
        { value: 'pennsylvania', label: 'Pennsylvania' },
        { value: 'ohio', label: 'Ohio' },
        { value: 'georgia', label: 'Georgia' },
        { value: 'north-carolina', label: 'North Carolina' },
        { value: 'michigan', label: 'Michigan' },
        { value: 'default', label: 'Other State' }
      ],
      tooltip: 'State where the case will be tried (affects multipliers and negligence rules)',
      defaultValue: 'california'
    },
    {
      id: 'comparativeNegligence',
      label: 'Comparative Negligence % - Optional',
      type: 'percentage',
      required: false,
      placeholder: '20',
      tooltip: 'Percentage of fault attributed to the injured party'
    },
    {
      id: 'insurancePolicyLimit',
      label: 'Insurance Policy Limit - Optional',
      type: 'currency',
      required: false,
      placeholder: '1000000',
      tooltip: 'Maximum insurance coverage available'
    },
    {
      id: 'discountRate',
      label: 'Discount Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '3.0',
      tooltip: 'Rate used for present value calculations',
      defaultValue: 3.0,
      step: 0.1
    },
    {
      id: 'medicalInflationRate',
      label: 'Medical Inflation Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '4.2',
      tooltip: 'Expected annual increase in medical costs',
      defaultValue: 4.2,
      step: 0.1
    },
    {
      id: 'wageInflationRate',
      label: 'Wage Inflation Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '2.5',
      tooltip: 'Expected annual increase in wages',
      defaultValue: 2.5,
      step: 0.1
    },
    {
      id: 'lifeExpectancy',
      label: 'Life Expectancy (Years)',
      type: 'number',
      required: true,
      placeholder: '45',
      tooltip: 'Expected remaining years of life from injury date',
      defaultValue: 45,
      min: 1,
      max: 100
    }
  ],

  outputs: [
    {
      id: 'totalEconomicDamages',
      label: 'Total Economic Damages',
      type: 'currency',
      explanation: 'Sum of all past and future medical costs and lost wages'
    },
    {
      id: 'totalNonEconomicDamages',
      label: 'Total Non-Economic Damages',
      type: 'currency',
      explanation: 'Pain and suffering, loss of consortium, and loss of enjoyment'
    },
    {
      id: 'painAndSuffering',
      label: 'Pain and Suffering',
      type: 'currency',
      explanation: 'Compensation for physical pain and emotional distress'
    },
    {
      id: 'grossSettlement',
      label: 'Gross Settlement Value',
      type: 'currency',
      explanation: 'Total settlement before comparative negligence and fees'
    },
    {
      id: 'netSettlement',
      label: 'Net Settlement Value',
      type: 'currency',
      explanation: 'Settlement after comparative negligence and policy limits'
    },
    {
      id: 'clientReceives',
      label: 'Client Receives',
      type: 'currency',
      explanation: 'Amount client receives after attorney fees and expenses'
    },
    {
      id: 'attorneyFees',
      label: 'Attorney Fees (33.33%)',
      type: 'currency',
      explanation: 'Standard contingency fee for personal injury cases'
    },
    {
      id: 'isLimitedByPolicy',
      label: 'Limited by Insurance Policy',
      type: 'text',
      explanation: 'Whether settlement is capped by insurance policy limits'
    },
    {
      id: 'excessAmount',
      label: 'Excess Over Policy',
      type: 'currency',
      explanation: 'Amount of calculated damages exceeding insurance coverage'
    },
    {
      id: 'isBarredByNegligence',
      label: 'Barred by Comparative Negligence',
      type: 'text',
      explanation: 'Whether recovery is barred due to high comparative negligence'
    }
  ],

  formulas: [personalInjuryCalculatorFormula],
  
  validationRules: getPersonalInjuryValidationRules(),

  examples: [
    {
      title: 'Moderate Car Accident Injury',
      description: 'Typical car accident with moderate injuries and partial fault',
      inputs: {
        pastMedicalCosts: 45000,
        futureMedicalCosts: 15000,
        pastLostWages: 25000,
        futureLostWages: 0,
        ageAtInjury: 32,
        retirementAge: 65,
        annualSalary: 65000,
        careerGrowthRate: 3.0,
        injurySeverity: 'moderate',
        isPermanent: false,
        jurisdiction: 'california',
        comparativeNegligence: 20,
        discountRate: 3.0,
        medicalInflationRate: 4.2,
        wageInflationRate: 2.5,
        lifeExpectancy: 45
      },
      expectedOutputs: {
        totalEconomicDamages: 95000,
        painAndSuffering: 180000,
        grossSettlement: 275000,
        netSettlement: 220000
      }
    },
    {
      title: 'Catastrophic Workplace Injury',
      description: 'Severe permanent injury with significant future care needs',
      inputs: {
        pastMedicalCosts: 250000,
        futureMedicalCosts: 75000,
        lifeCareCost: 2000000,
        pastLostWages: 150000,
        futureLostWages: 85000,
        ageAtInjury: 28,
        retirementAge: 65,
        annualSalary: 85000,
        careerGrowthRate: 4.0,
        injurySeverity: 'catastrophic',
        isPermanent: true,
        disabilityPercentage: 100,
        jurisdiction: 'texas',
        comparativeNegligence: 0,
        insurancePolicyLimit: 5000000,
        discountRate: 3.0,
        medicalInflationRate: 4.2,
        wageInflationRate: 2.5,
        lifeExpectancy: 50
      },
      expectedOutputs: {
        totalEconomicDamages: 4500000,
        painAndSuffering: 2400000,
        grossSettlement: 7200000,
        netSettlement: 5000000
      }
    },
    {
      title: 'Medical Malpractice Case',
      description: 'Severe injury from medical negligence with high damages',
      inputs: {
        pastMedicalCosts: 180000,
        futureMedicalCosts: 50000,
        pastLostWages: 75000,
        futureLostWages: 60000,
        ageAtInjury: 45,
        retirementAge: 67,
        annualSalary: 95000,
        careerGrowthRate: 2.5,
        injurySeverity: 'severe',
        isPermanent: true,
        disabilityPercentage: 60,
        jurisdiction: 'new-york',
        comparativeNegligence: 0,
        discountRate: 3.0,
        medicalInflationRate: 4.2,
        wageInflationRate: 2.5,
        lifeExpectancy: 35
      },
      expectedOutputs: {
        totalEconomicDamages: 1200000,
        painAndSuffering: 1500000,
        grossSettlement: 2900000,
        clientReceives: 1940000
      }
    }
  ]
};