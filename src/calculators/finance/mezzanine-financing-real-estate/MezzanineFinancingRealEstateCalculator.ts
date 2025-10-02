import { Calculator } from '../../types/calculator';
import { MezzanineFinancingRealEstateInputs, MezzanineFinancingRealEstateOutputs } from './types';
import { validateMezzanineFinancingRealEstateInputs } from './validation';
import { 
  calculateMezzanineFinancingMetrics,
  generateMezzanineFinancingReport
} from './formulas';

export class MezzanineFinancingRealEstateCalculator implements Calculator<MezzanineFinancingRealEstateInputs, MezzanineFinancingRealEstateOutputs> {
  readonly id = 'mezzanine-financing-real-estate';
  readonly name = 'Mezzanine Financing for Real Estate Calculator';
  readonly description = 'Calculate returns, risks, and structuring for mezzanine financing in real estate investments';
  readonly category = 'finance';
  readonly tags = ['real-estate', 'financing', 'mezzanine', 'investment', 'returns'];

  readonly inputs = {
    // Property Details
    propertyValue: {
      type: 'number' as const,
      label: 'Property Value',
      description: 'Current market value of the real estate property',
      min: 100000,
      max: 1000000000,
      step: 10000,
      placeholder: 'e.g., 5000000',
      unit: '$',
      category: 'Property Details'
    },
    
    seniorDebtAmount: {
      type: 'number' as const,
      label: 'Senior Debt Amount',
      description: 'Amount of senior debt financing',
      min: 0,
      max: 500000000,
      step: 10000,
      placeholder: 'e.g., 3000000',
      unit: '$',
      category: 'Property Details'
    },

    seniorDebtRate: {
      type: 'number' as const,
      label: 'Senior Debt Interest Rate',
      description: 'Annual interest rate for senior debt',
      min: 0,
      max: 20,
      step: 0.01,
      placeholder: 'e.g., 4.5',
      unit: '%',
      category: 'Property Details'
    },

    // Mezzanine Financing
    mezzanineAmount: {
      type: 'number' as const,
      label: 'Mezzanine Financing Amount',
      description: 'Amount of mezzanine financing being provided',
      min: 50000,
      max: 200000000,
      step: 10000,
      placeholder: 'e.g., 1000000',
      unit: '$',
      category: 'Mezzanine Financing'
    },

    mezzanineRate: {
      type: 'number' as const,
      label: 'Mezzanine Interest Rate',
      description: 'Annual interest rate for mezzanine financing',
      min: 5,
      max: 25,
      step: 0.1,
      placeholder: 'e.g., 12.0',
      unit: '%',
      category: 'Mezzanine Financing'
    },

    mezzanineTerm: {
      type: 'number' as const,
      label: 'Mezzanine Term',
      description: 'Term length for mezzanine financing in years',
      min: 1,
      max: 10,
      step: 0.5,
      placeholder: 'e.g., 3',
      unit: 'years',
      category: 'Mezzanine Financing'
    },

    equityKicker: {
      type: 'number' as const,
      label: 'Equity Kicker',
      description: 'Percentage of equity upside participation',
      min: 0,
      max: 50,
      step: 0.5,
      placeholder: 'e.g., 15',
      unit: '%',
      category: 'Mezzanine Financing'
    },

    // Property Performance
    netOperatingIncome: {
      type: 'number' as const,
      label: 'Net Operating Income (NOI)',
      description: 'Annual net operating income from the property',
      min: 0,
      max: 50000000,
      step: 1000,
      placeholder: 'e.g., 400000',
      unit: '$',
      category: 'Property Performance'
    },

    projectedValueIncrease: {
      type: 'number' as const,
      label: 'Projected Value Increase',
      description: 'Expected annual property value appreciation',
      min: 0,
      max: 20,
      step: 0.1,
      placeholder: 'e.g., 3.5',
      unit: '%',
      category: 'Property Performance'
    },

    // Risk Factors
    marketRiskAdjustment: {
      type: 'number' as const,
      label: 'Market Risk Adjustment',
      description: 'Risk adjustment factor for market conditions',
      min: 0,
      max: 10,
      step: 0.1,
      placeholder: 'e.g., 2.0',
      unit: '%',
      category: 'Risk Factors'
    },

    exitStrategy: {
      type: 'select' as const,
      label: 'Exit Strategy',
      description: 'Expected exit strategy for the investment',
      options: [
        { value: 'sale', label: 'Property Sale' },
        { value: 'refinance', label: 'Refinancing' },
        { value: 'extension', label: 'Loan Extension' }
      ],
      defaultValue: 'sale',
      category: 'Risk Factors'
    }
  };

  readonly outputs = {
    // Financial Metrics
    totalLeverageRatio: {
      type: 'number' as const,
      label: 'Total Leverage Ratio',
      description: 'Combined senior and mezzanine debt as percentage of property value',
      unit: '%',
      precision: 2
    },

    mezzanineLTV: {
      type: 'number' as const,
      label: 'Mezzanine LTV',
      description: 'Mezzanine financing as percentage of property value',
      unit: '%',
      precision: 2
    },

    // Returns
    mezzanineCurrentYield: {
      type: 'number' as const,
      label: 'Current Yield',
      description: 'Annual interest income as percentage of mezzanine investment',
      unit: '%',
      precision: 2
    },

    mezzanineIRR: {
      type: 'number' as const,
      label: 'Mezzanine IRR',
      description: 'Internal rate of return including equity kicker',
      unit: '%',
      precision: 2
    },

    totalReturn: {
      type: 'number' as const,
      label: 'Total Return',
      description: 'Total cash return over the investment period',
      unit: '$',
      precision: 0
    },

    // Coverage Ratios
    debtServiceCoverage: {
      type: 'number' as const,
      label: 'Debt Service Coverage Ratio',
      description: 'NOI coverage of total debt service',
      unit: 'x',
      precision: 2
    },

    interestCoverage: {
      type: 'number' as const,
      label: 'Interest Coverage Ratio',
      description: 'NOI coverage of interest payments',
      unit: 'x',
      precision: 2
    },

    // Risk Metrics
    loanToValueRatio: {
      type: 'number' as const,
      label: 'Combined LTV Ratio',
      description: 'Total debt as percentage of property value',
      unit: '%',
      precision: 2
    },

    equityBuffer: {
      type: 'number' as const,
      label: 'Equity Buffer',
      description: 'Equity cushion protecting mezzanine position',
      unit: '%',
      precision: 2
    },

    breakEvenOccupancy: {
      type: 'number' as const,
      label: 'Break-even Occupancy',
      description: 'Minimum occupancy rate to cover debt service',
      unit: '%',
      precision: 1
    },

    // Summary
    recommendationScore: {
      type: 'number' as const,
      label: 'Investment Score',
      description: 'Overall investment attractiveness score (0-100)',
      unit: 'points',
      precision: 0
    },

    riskLevel: {
      type: 'text' as const,
      label: 'Risk Level',
      description: 'Overall risk assessment'
    },

    report: {
      type: 'text' as const,
      label: 'Detailed Analysis Report',
      description: 'Comprehensive mezzanine financing analysis'
    }
  };

  calculate(inputs: MezzanineFinancingRealEstateInputs): MezzanineFinancingRealEstateOutputs {
    const validation = validateMezzanineFinancingRealEstateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Invalid inputs: ${validation.errors.join(', ')}`);
    }

    const metrics = calculateMezzanineFinancingMetrics(inputs);
    const report = generateMezzanineFinancingReport(inputs, metrics);

    return {
      ...metrics,
      report
    };
  }
}

export const mezzanineFinancingRealEstateCalculator = new MezzanineFinancingRealEstateCalculator();
