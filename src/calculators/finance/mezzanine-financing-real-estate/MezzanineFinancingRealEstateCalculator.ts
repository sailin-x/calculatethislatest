import { Calculator } from '../../../types/calculator';

export const mezzanineFinancingRealEstateCalculator: Calculator = {
  id: 'mezzanine-financing-real-estate',
  title: 'Mezzanine Financing for Real Estate Calculator',
  category: 'finance',
  subcategory: 'Real Estate & Investment',
  description: 'Calculate returns, risks, and structuring for mezzanine financing in real estate investments',
  
  usageInstructions: [
    'Enter property details including value and senior debt information',
    'Set mezzanine financing terms and equity kicker details',
    'Input property performance projections and exit strategy',
    'Review comprehensive mezzanine financing analysis and risk assessment',
    'Analyze returns, capital structure, and investment recommendations'
  ],

  inputs: [
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'currency',
      required: true,
      placeholder: '5000000',
      tooltip: 'Current market value of the real estate property',
      defaultValue: 5000000,
      min: 100000,
      max: 1000000000
    },
    {
      id: 'seniorDebtAmount',
      label: 'Senior Debt Amount',
      type: 'currency',
      required: true,
      placeholder: '3000000',
      tooltip: 'Amount of senior debt financing',
      defaultValue: 3000000,
      min: 0,
      max: 500000000
    },
    {
      id: 'seniorDebtRate',
      label: 'Senior Debt Interest Rate',
      type: 'percentage',
      required: true,
      placeholder: '4.5',
      tooltip: 'Annual interest rate for senior debt',
      defaultValue: 4.5,
      min: 0,
      max: 20
    },
    {
      id: 'mezzanineAmount',
      label: 'Mezzanine Financing Amount',
      type: 'currency',
      required: true,
      placeholder: '1000000',
      tooltip: 'Amount of mezzanine financing being provided',
      defaultValue: 1000000,
      min: 50000,
      max: 200000000
    },
    {
      id: 'mezzanineRate',
      label: 'Mezzanine Interest Rate',
      type: 'percentage',
      required: true,
      placeholder: '12.0',
      tooltip: 'Annual interest rate for mezzanine financing',
      defaultValue: 12.0,
      min: 5,
      max: 25
    },
    {
      id: 'mezzanineTerm',
      label: 'Mezzanine Term',
      type: 'number',
      required: true,
      placeholder: '3',
      tooltip: 'Term length for mezzanine financing in years',
      defaultValue: 3,
      min: 1,
      max: 10
    },
    {
      id: 'equityKicker',
      label: 'Equity Kicker',
      type: 'percentage',
      required: false,
      placeholder: '15',
      tooltip: 'Percentage of equity upside participation',
      defaultValue: 15,
      min: 0,
      max: 50
    },
    {
      id: 'exitYear',
      label: 'Exit Year',
      type: 'number',
      required: false,
      placeholder: '5',
      tooltip: 'Year of property exit or refinance',
      defaultValue: 5,
      min: 1,
      max: 20
    },
    {
      id: 'propertyAppreciation',
      label: 'Property Appreciation Rate',
      type: 'percentage',
      required: false,
      placeholder: '3.0',
      tooltip: 'Expected annual property appreciation rate',
      defaultValue: 3.0,
      min: -10,
      max: 20
    },
    {
      id: 'operatingIncome',
      label: 'Annual Operating Income',
      type: 'currency',
      required: false,
      placeholder: '400000',
      tooltip: 'Annual net operating income from the property',
      defaultValue: 400000,
      min: 0,
      max: 10000000
    },
    {
      id: 'operatingExpenses',
      label: 'Annual Operating Expenses',
      type: 'currency',
      required: false,
      placeholder: '150000',
      tooltip: 'Annual operating expenses',
      defaultValue: 150000,
      min: 0,
      max: 5000000
    },
    {
      id: 'exitCapRate',
      label: 'Exit Cap Rate',
      type: 'percentage',
      required: false,
      placeholder: '6.0',
      tooltip: 'Cap rate at exit',
      defaultValue: 6.0,
      min: 3,
      max: 15
    }
  ],

  outputs: [
    {
      id: 'totalCapitalization',
      label: 'Total Capitalization',
      type: 'currency',
      format: '$0,0',
      explanation: 'Total capital structure including debt and equity'
    },
    {
      id: 'loanToValueRatio',
      label: 'Loan-to-Value Ratio',
      type: 'percentage',
      format: '0.0%',
      explanation: 'Combined LTV including senior and mezzanine debt'
    },
    {
      id: 'debtServiceCoverage',
      label: 'Debt Service Coverage Ratio',
      type: 'number',
      format: '0.00',
      explanation: 'DSCR including both debt obligations'
    },
    {
      id: 'mezzanineIRR',
      label: 'Mezzanine IRR',
      type: 'percentage',
      format: '0.0%',
      explanation: 'Internal rate of return for mezzanine investment'
    },
    {
      id: 'totalReturn',
      label: 'Total Return',
      type: 'percentage',
      format: '0.0%',
      explanation: 'Total return including interest and equity participation'
    },
    {
      id: 'annualInterest',
      label: 'Annual Interest Payment',
      type: 'currency',
      format: '$0,0',
      explanation: 'Annual interest payment on mezzanine debt'
    },
    {
      id: 'equityParticipation',
      label: 'Equity Participation Value',
      type: 'currency',
      format: '$0,0',
      explanation: 'Value of equity kicker participation'
    },
    {
      id: 'riskScore',
      label: 'Risk Score',
      type: 'number',
      format: '0',
      explanation: 'Risk assessment score (0-100)'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      explanation: 'Investment and structuring recommendations'
    }
  ],

  formulas: [
    {
      id: 'mezzanine-financing-analysis',
      name: 'Mezzanine Financing Analysis',
      description: 'Calculate comprehensive mezzanine financing metrics and returns',
      calculate: (inputs: Record<string, any>) => {
        const propertyValue = inputs.propertyValue || 0;
        const seniorDebtAmount = inputs.seniorDebtAmount || 0;
        const seniorDebtRate = (inputs.seniorDebtRate || 4.5) / 100;
        const mezzanineAmount = inputs.mezzanineAmount || 0;
        const mezzanineRate = (inputs.mezzanineRate || 12.0) / 100;
        const mezzanineTerm = inputs.mezzanineTerm || 3;
        const equityKicker = (inputs.equityKicker || 15) / 100;
        const exitYear = inputs.exitYear || 5;
        const propertyAppreciation = (inputs.propertyAppreciation || 3.0) / 100;
        const operatingIncome = inputs.operatingIncome || 0;
        const operatingExpenses = inputs.operatingExpenses || 0;
        const exitCapRate = (inputs.exitCapRate || 6.0) / 100;
        
        // Calculate total capitalization
        const totalCapitalization = seniorDebtAmount + mezzanineAmount;
        
        // Calculate LTV
        const loanToValueRatio = propertyValue > 0 ? (totalCapitalization / propertyValue) * 100 : 0;
        
        // Calculate debt service
        const seniorDebtService = seniorDebtAmount * seniorDebtRate;
        const mezzanineDebtService = mezzanineAmount * mezzanineRate;
        const totalDebtService = seniorDebtService + mezzanineDebtService;
        
        // Calculate DSCR
        const netOperatingIncome = operatingIncome - operatingExpenses;
        const debtServiceCoverage = totalDebtService > 0 ? netOperatingIncome / totalDebtService : 0;
        
        // Calculate mezzanine returns
        const annualInterest = mezzanineAmount * mezzanineRate;
        const totalInterest = annualInterest * mezzanineTerm;
        
        // Calculate exit value
        const exitValue = propertyValue * Math.pow(1 + propertyAppreciation, exitYear);
        const exitNOI = netOperatingIncome * Math.pow(1 + propertyAppreciation, exitYear);
        const exitValueByCapRate = exitNOI / exitCapRate;
        const finalExitValue = Math.max(exitValue, exitValueByCapRate);
        
        // Calculate equity participation
        const equityValue = (finalExitValue - propertyValue) * equityKicker;
        const totalReturn = mezzanineAmount > 0 ? 
          ((totalInterest + equityValue) / mezzanineAmount) * 100 : 0;
        
        // Calculate IRR (simplified)
        const mezzanineIRR = calculateIRR(mezzanineAmount, annualInterest, equityValue, mezzanineTerm);
        
        // Calculate risk score
        const riskScore = calculateRiskScore(
          loanToValueRatio, debtServiceCoverage, mezzanineRate, equityKicker
        );
        
        // Generate recommendations
        const recommendations = generateRecommendations(
          riskScore, loanToValueRatio, debtServiceCoverage, mezzanineRate
        );
        
        return {
          outputs: {
            totalCapitalization: Math.round(totalCapitalization),
            loanToValueRatio: Math.round(loanToValueRatio * 100) / 100,
            debtServiceCoverage: Math.round(debtServiceCoverage * 100) / 100,
            mezzanineIRR: Math.round(mezzanineIRR * 100) / 100,
            totalReturn: Math.round(totalReturn * 100) / 100,
            annualInterest: Math.round(annualInterest),
            equityParticipation: Math.round(equityValue),
            riskScore,
            recommendations
          },
          explanation: `Mezzanine financing analysis complete. Total LTV: ${loanToValueRatio.toFixed(1)}%. DSCR: ${debtServiceCoverage.toFixed(2)}. Mezzanine IRR: ${mezzanineIRR.toFixed(1)}%.`,
          intermediateSteps: {
            seniorDebtService: Math.round(seniorDebtService),
            mezzanineDebtService: Math.round(mezzanineDebtService),
            totalDebtService: Math.round(totalDebtService),
            exitValue: Math.round(finalExitValue),
            equityValue: Math.round(equityValue)
          }
        };
      }
    }
  ],

  validationRules: [
    {
      field: 'propertyValue',
      type: 'required',
      message: 'Property value is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'mezzanineAmount',
      type: 'business',
      message: 'Mezzanine amount cannot exceed available equity',
      validator: (value: any, allInputs: Record<string, any>) => {
        const propertyValue = allInputs?.propertyValue || 0;
        const seniorDebtAmount = allInputs?.seniorDebtAmount || 0;
        const availableEquity = propertyValue - seniorDebtAmount;
        return value <= availableEquity;
      }
    },
    {
      field: 'loanToValueRatio',
      type: 'business',
      message: 'Combined LTV should not exceed 90%',
      validator: (value: any, allInputs: Record<string, any>) => {
        const propertyValue = allInputs?.propertyValue || 0;
        const seniorDebtAmount = allInputs?.seniorDebtAmount || 0;
        const mezzanineAmount = allInputs?.mezzanineAmount || 0;
        const ltv = propertyValue > 0 ? ((seniorDebtAmount + mezzanineAmount) / propertyValue) * 100 : 0;
        return ltv <= 90;
      }
    }
  ],

  examples: [
    {
      title: 'Standard Mezzanine Financing',
      description: 'Typical mezzanine financing for a commercial property',
      inputs: {
        propertyValue: 5000000,
        seniorDebtAmount: 3000000,
        seniorDebtRate: 4.5,
        mezzanineAmount: 1000000,
        mezzanineRate: 12.0,
        mezzanineTerm: 3,
        equityKicker: 15,
        exitYear: 5,
        propertyAppreciation: 3.0,
        operatingIncome: 400000,
        operatingExpenses: 150000,
        exitCapRate: 6.0
      },
      expectedOutputs: {
        totalCapitalization: 4000000,
        loanToValueRatio: 80.0,
        debtServiceCoverage: 1.60,
        mezzanineIRR: 18.5,
        totalReturn: 45.0,
        annualInterest: 120000,
        equityParticipation: 225000,
        riskScore: 65,
        recommendations: 'Moderate risk profile. Consider reducing mezzanine amount to improve DSCR.'
      }
    },
    {
      title: 'High-Leverage Mezzanine Financing',
      description: 'Aggressive mezzanine financing with higher risk and return',
      inputs: {
        propertyValue: 8000000,
        seniorDebtAmount: 5000000,
        seniorDebtRate: 5.0,
        mezzanineAmount: 2000000,
        mezzanineRate: 15.0,
        mezzanineTerm: 2,
        equityKicker: 25,
        exitYear: 3,
        propertyAppreciation: 5.0,
        operatingIncome: 600000,
        operatingExpenses: 200000,
        exitCapRate: 5.5
      },
      expectedOutputs: {
        totalCapitalization: 7000000,
        loanToValueRatio: 87.5,
        debtServiceCoverage: 1.25,
        mezzanineIRR: 28.0,
        totalReturn: 65.0,
        annualInterest: 300000,
        equityParticipation: 500000,
        riskScore: 80,
        recommendations: 'High risk profile. Strong returns but significant risk. Monitor property performance closely.'
      }
    }
  ]
};

// Helper functions for calculations
function calculateIRR(
  investment: number, 
  annualCashFlow: number, 
  exitValue: number, 
  term: number
): number {
  if (investment <= 0 || annualCashFlow <= 0) return 0;
  
  // Simplified IRR calculation
  const totalCashOutflow = investment;
  const totalCashInflow = (annualCashFlow * term) + exitValue;
  
  if (totalCashInflow <= totalCashOutflow) return 0;
  
  // Approximate IRR using rule of 72
  const yearsToDouble = term * (totalCashOutflow / totalCashInflow);
  return (72 / yearsToDouble) / 100;
}

function calculateRiskScore(
  ltv: number, 
  dscr: number, 
  mezzanineRate: number, 
  equityKicker: number
): number {
  let score = 50; // Base score
  
  // LTV risk
  if (ltv > 85) score += 25;
  else if (ltv > 80) score += 20;
  else if (ltv > 75) score += 15;
  else if (ltv > 70) score += 10;
  else if (ltv < 60) score -= 10;
  
  // DSCR risk
  if (dscr < 1.0) score += 30;
  else if (dscr < 1.2) score += 20;
  else if (dscr < 1.4) score += 15;
  else if (dscr > 2.0) score -= 10;
  
  // Mezzanine rate risk
  if (mezzanineRate > 0.15) score += 20;
  else if (mezzanineRate > 0.12) score += 15;
  else if (mezzanineRate > 0.10) score += 10;
  
  // Equity kicker risk
  if (equityKicker > 0.20) score += 15;
  else if (equityKicker > 0.15) score += 10;
  
  return Math.min(100, Math.max(0, score));
}

function generateRecommendations(
  riskScore: number, 
  ltv: number, 
  dscr: number, 
  mezzanineRate: number
): string {
  const recommendations = [];
  
  if (riskScore >= 80) {
    recommendations.push('High risk profile. Strong returns but significant risk. Monitor property performance closely.');
  } else if (riskScore >= 65) {
    recommendations.push('Moderate risk profile. Consider reducing mezzanine amount to improve DSCR.');
  } else {
    recommendations.push('Lower risk profile. Good balance of risk and return.');
  }
  
  if (ltv > 80) {
    recommendations.push('High LTV - consider additional equity or reduced debt.');
  }
  
  if (dscr < 1.2) {
    recommendations.push('Low DSCR - property may not generate sufficient cash flow.');
  }
  
  if (mezzanineRate > 0.15) {
    recommendations.push('High mezzanine rate - consider shorter term or additional collateral.');
  }
  
  return recommendations.join(' ');
}
