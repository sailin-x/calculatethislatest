import { Calculator } from '../../../types/calculator';

export const opportunityZoneInvestmentROICalculator: Calculator = {
  id: 'opportunity-zone-investment-roi',
  title: 'Opportunity Zone Investment ROI Calculator',
  category: 'finance',
  subcategory: 'real-estate',
  description: 'Calculate the return on investment for Opportunity Zone investments, including tax benefits and appreciation potential.',
  usageInstructions: [
    'Enter your initial investment amount and investment timeline',
    'Input expected appreciation rates and rental income projections',
    'Set your current tax bracket and capital gains tax rate',
    'Include any additional investment costs or fees',
    'Review the comprehensive ROI analysis with tax benefits'
  ],
  inputs: [
    {
      id: 'initialInvestment',
      label: 'Initial Investment Amount',
      type: 'currency',
      required: true,
      min: 10000,
      step: 10000,
      tooltip: 'Total amount invested in the Opportunity Zone project',
      placeholder: '100000'
    },
    {
      id: 'investmentTimeline',
      label: 'Investment Timeline (Years)',
      type: 'number',
      required: true,
      min: 5,
      max: 30,
      step: 1,
      defaultValue: 10,
      tooltip: 'How long you plan to hold the investment',
      placeholder: '10'
    },
    {
      id: 'annualAppreciationRate',
      label: 'Annual Appreciation Rate',
      type: 'percentage',
      required: true,
      min: 0,
      max: 25,
      step: 0.5,
      defaultValue: 5,
      tooltip: 'Expected annual property value appreciation',
      placeholder: '5.0'
    },
    {
      id: 'annualRentalIncome',
      label: 'Annual Rental Income',
      type: 'currency',
      required: false,
      min: 0,
      step: 1000,
      defaultValue: 0,
      tooltip: 'Expected annual rental income from the property',
      placeholder: '8000'
    },
    {
      id: 'rentalIncomeGrowthRate',
      label: 'Rental Income Growth Rate',
      type: 'percentage',
      required: false,
      min: 0,
      max: 15,
      step: 0.5,
      defaultValue: 3,
      tooltip: 'Expected annual growth in rental income',
      placeholder: '3.0'
    },
    {
      id: 'currentTaxBracket',
      label: 'Current Tax Bracket',
      type: 'percentage',
      required: true,
      min: 10,
      max: 37,
      step: 1,
      defaultValue: 24,
      tooltip: 'Your current federal income tax bracket',
      placeholder: '24.0'
    },
    {
      id: 'capitalGainsTaxRate',
      label: 'Capital Gains Tax Rate',
      type: 'percentage',
      required: true,
      min: 0,
      max: 25,
      step: 0.5,
      defaultValue: 15,
      tooltip: 'Your long-term capital gains tax rate',
      placeholder: '15.0'
    },
    {
      id: 'deferralPeriod',
      label: 'Tax Deferral Period (Years)',
      type: 'number',
      required: true,
      min: 5,
      max: 10,
      step: 1,
      defaultValue: 7,
      tooltip: 'Years until you plan to recognize deferred gains',
      placeholder: '7'
    },
    {
      id: 'annualOperatingExpenses',
      label: 'Annual Operating Expenses',
      type: 'currency',
      required: false,
      min: 0,
      step: 1000,
      defaultValue: 0,
      tooltip: 'Annual property management, maintenance, and other costs',
      placeholder: '5000'
    },
    {
      id: 'annualPropertyTaxes',
      label: 'Annual Property Taxes',
      type: 'currency',
      required: false,
      min: 0,
      step: 500,
      defaultValue: 0,
      tooltip: 'Annual property tax assessment',
      placeholder: '3000'
    },
    {
      id: 'annualInsurance',
      label: 'Annual Insurance',
      type: 'currency',
      required: false,
      min: 0,
      step: 500,
      defaultValue: 0,
      tooltip: 'Annual property and liability insurance',
      placeholder: '2000'
    },
    {
      id: 'acquisitionCosts',
      label: 'Acquisition Costs',
      type: 'currency',
      required: false,
      min: 0,
      step: 1000,
      defaultValue: 0,
      tooltip: 'One-time costs for purchasing the property',
      placeholder: '8000'
    },
    {
      id: 'exitCosts',
      label: 'Exit Costs',
      type: 'currency',
      required: false,
      min: 0,
      step: 1000,
      defaultValue: 0,
      tooltip: 'Estimated costs when selling the property',
      placeholder: '12000'
    },
    {
      id: 'alternativeInvestmentReturn',
      label: 'Alternative Investment Return',
      type: 'percentage',
      required: true,
      min: 0,
      max: 20,
      step: 0.5,
      defaultValue: 7,
      tooltip: 'Expected return if investing elsewhere (opportunity cost)',
      placeholder: '7.0'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate',
      type: 'percentage',
      required: true,
      min: 0,
      max: 10,
      step: 0.25,
      defaultValue: 2.5,
      tooltip: 'Expected annual inflation rate',
      placeholder: '2.5'
    }
  ],
  outputs: [
    {
      id: 'totalInvestment',
      label: 'Total Investment',
      type: 'currency',
      explanation: 'Total amount invested including acquisition costs'
    },
    {
      id: 'propertyValueAtExit',
      label: 'Property Value at Exit',
      type: 'currency',
      explanation: 'Projected property value at the end of investment period'
    },
    {
      id: 'totalRentalIncome',
      label: 'Total Rental Income',
      type: 'currency',
      explanation: 'Total rental income over the investment period'
    },
    {
      id: 'totalOperatingExpenses',
      label: 'Total Operating Expenses',
      type: 'currency',
      explanation: 'Total operating expenses over the investment period'
    },
    {
      id: 'netRentalIncome',
      label: 'Net Rental Income',
      type: 'currency',
      explanation: 'Total rental income minus operating expenses'
    },
    {
      id: 'taxDeferralBenefit',
      label: 'Tax Deferral Benefit',
      type: 'currency',
      explanation: 'Tax savings from deferring capital gains'
    },
    {
      id: 'taxReductionBenefit',
      label: 'Tax Reduction Benefit',
      type: 'currency',
      explanation: 'Tax savings from reduced capital gains rate'
    },
    {
      id: 'totalTaxBenefits',
      label: 'Total Tax Benefits',
      type: 'currency',
      explanation: 'Combined tax deferral and reduction benefits'
    },
    {
      id: 'totalReturn',
      label: 'Total Return',
      type: 'currency',
      explanation: 'Total return including appreciation, income, and tax benefits'
    },
    {
      id: 'roi',
      label: 'Return on Investment (ROI)',
      type: 'percentage',
      explanation: 'Total return as percentage of initial investment'
    },
    {
      id: 'annualizedROI',
      label: 'Annualized ROI',
      type: 'percentage',
      explanation: 'Average annual return on investment'
    },
    {
      id: 'opportunityCostComparison',
      label: 'Opportunity Cost Comparison',
      type: 'currency',
      explanation: 'Difference between OZ investment and alternative investment'
    },
    {
      id: 'breakEvenYears',
      label: 'Break-Even Years',
      type: 'number',
      explanation: 'Years until investment becomes profitable'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      explanation: 'Investment strategy recommendations based on analysis'
    }
  ],
  formulas: [
    {
      id: 'opportunity-zone-roi-analysis',
      name: 'Opportunity Zone ROI Analysis',
      description: 'Comprehensive analysis of Opportunity Zone investment returns including tax benefits',
      calculate: (inputs: Record<string, any>) => {
        // Extract and validate inputs
        const {
          initialInvestment = 0,
          investmentTimeline = 10,
          annualAppreciationRate = 0,
          annualRentalIncome = 0,
          rentalIncomeGrowthRate = 0,
          currentTaxBracket = 0,
          capitalGainsTaxRate = 0,
          deferralPeriod = 7,
          annualOperatingExpenses = 0,
          annualPropertyTaxes = 0,
          annualInsurance = 0,
          acquisitionCosts = 0,
          exitCosts = 0,
          alternativeInvestmentReturn = 0,
          inflationRate = 0
        } = inputs;

        // Calculate total investment
        const totalInvestment = initialInvestment + acquisitionCosts;
        
        // Calculate property value at exit
        const propertyValueAtExit = initialInvestment * Math.pow(1 + annualAppreciationRate / 100, investmentTimeline);
        
        // Calculate total rental income over timeline
        let totalRentalIncome = 0;
        let currentRentalIncome = annualRentalIncome;
        for (let year = 1; year <= investmentTimeline; year++) {
          totalRentalIncome += currentRentalIncome;
          currentRentalIncome *= (1 + rentalIncomeGrowthRate / 100);
        }
        
        // Calculate total operating expenses
        const totalOperatingExpenses = (annualOperatingExpenses + annualPropertyTaxes + annualInsurance) * investmentTimeline;
        
        // Calculate net rental income
        const netRentalIncome = totalRentalIncome - totalOperatingExpenses;
        
        // Calculate tax benefits
        const taxDeferralBenefit = calculateTaxDeferralBenefit(initialInvestment, currentTaxBracket, deferralPeriod, alternativeInvestmentReturn);
        const taxReductionBenefit = calculateTaxReductionBenefit(propertyValueAtExit - initialInvestment, capitalGainsTaxRate, currentTaxBracket);
        const totalTaxBenefits = taxDeferralBenefit + taxReductionBenefit;
        
        // Calculate total return
        const appreciationReturn = propertyValueAtExit - initialInvestment;
        const totalReturn = appreciationReturn + netRentalIncome + totalTaxBenefits - exitCosts;
        
        // Calculate ROI metrics
        const roi = (totalReturn / totalInvestment) * 100;
        const annualizedROI = Math.pow(1 + roi / 100, 1 / investmentTimeline) - 1;
        
        // Calculate opportunity cost comparison
        const alternativeInvestmentValue = totalInvestment * Math.pow(1 + alternativeInvestmentReturn / 100, investmentTimeline);
        const opportunityCostComparison = totalReturn - (alternativeInvestmentValue - totalInvestment);
        
        // Calculate break-even years
        const breakEvenYears = calculateBreakEvenYears(totalInvestment, annualRentalIncome, annualOperatingExpenses, annualAppreciationRate);
        
        // Generate recommendations
        const recommendations = generateRecommendations(roi, annualizedROI, opportunityCostComparison, breakEvenYears, investmentTimeline);

        return {
          outputs: {
            totalInvestment: Math.round(totalInvestment),
            propertyValueAtExit: Math.round(propertyValueAtExit),
            totalRentalIncome: Math.round(totalRentalIncome),
            totalOperatingExpenses: Math.round(totalOperatingExpenses),
            netRentalIncome: Math.round(netRentalIncome),
            taxDeferralBenefit: Math.round(taxDeferralBenefit),
            taxReductionBenefit: Math.round(taxReductionBenefit),
            totalTaxBenefits: Math.round(totalTaxBenefits),
            totalReturn: Math.round(totalReturn),
            roi: Math.round(roi * 100) / 100,
            annualizedROI: Math.round(annualizedROI * 10000) / 100,
            opportunityCostComparison: Math.round(opportunityCostComparison),
            breakEvenYears: Math.round(breakEvenYears * 10) / 10,
            recommendations
          },
          explanation: `Opportunity Zone Investment ROI: ${roi.toFixed(1)}% over ${investmentTimeline} years. Total return: $${totalReturn.toLocaleString()} including $${totalTaxBenefits.toLocaleString()} in tax benefits.`,
          intermediateSteps: {
            appreciationReturn: Math.round(appreciationReturn),
            currentTaxBracket,
            capitalGainsTaxRate,
            deferralPeriod,
            alternativeInvestmentReturn
          }
        };
      }
    }
  ],
  validationRules: [
    {
      type: 'required',
      field: 'initialInvestment',
      message: 'Initial investment amount is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      type: 'required',
      field: 'investmentTimeline',
      message: 'Investment timeline is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      type: 'required',
      field: 'annualAppreciationRate',
      message: 'Annual appreciation rate is required',
      validator: (value: any) => value !== null && value !== undefined
    },
    {
      type: 'required',
      field: 'currentTaxBracket',
      message: 'Current tax bracket is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      type: 'required',
      field: 'capitalGainsTaxRate',
      message: 'Capital gains tax rate is required',
      validator: (value: any) => value !== null && value !== undefined && value >= 0
    },
    {
      type: 'required',
      field: 'deferralPeriod',
      message: 'Tax deferral period is required',
      validator: (value: any) => value !== null && value !== undefined && value >= 5
    },
    {
      type: 'required',
      field: 'alternativeInvestmentReturn',
      message: 'Alternative investment return rate is required',
      validator: (value: any) => value !== null && value !== undefined && value >= 0
    },
    {
      type: 'required',
      field: 'inflationRate',
      message: 'Inflation rate is required',
      validator: (value: any) => value !== null && value !== undefined && value >= 0
    },
    {
      type: 'range',
      field: 'initialInvestment',
      message: 'Initial investment must be between $10,000 and $10,000,000',
      validator: (value: any) => value >= 10000 && value <= 10000000
    },
    {
      type: 'range',
      field: 'investmentTimeline',
      message: 'Investment timeline must be between 5 and 30 years',
      validator: (value: any) => value >= 5 && value <= 30
    },
    {
      type: 'range',
      field: 'annualAppreciationRate',
      message: 'Annual appreciation rate must be between 0% and 25%',
      validator: (value: any) => value >= 0 && value <= 25
    },
    {
      type: 'range',
      field: 'annualRentalIncome',
      message: 'Annual rental income must be between $0 and $500,000',
      validator: (value: any) => value >= 0 && value <= 500000
    },
    {
      type: 'range',
      field: 'rentalIncomeGrowthRate',
      message: 'Rental income growth rate must be between 0% and 15%',
      validator: (value: any) => value >= 0 && value <= 15
    },
    {
      type: 'range',
      field: 'currentTaxBracket',
      message: 'Current tax bracket must be between 10% and 37%',
      validator: (value: any) => value >= 10 && value <= 37
    },
    {
      type: 'range',
      field: 'capitalGainsTaxRate',
      message: 'Capital gains tax rate must be between 0% and 25%',
      validator: (value: any) => value >= 0 && value <= 25
    },
    {
      type: 'range',
      field: 'deferralPeriod',
      message: 'Tax deferral period must be between 5 and 10 years',
      validator: (value: any) => value >= 5 && value <= 10
    },
    {
      type: 'range',
      field: 'annualOperatingExpenses',
      message: 'Annual operating expenses must be between $0 and $100,000',
      validator: (value: any) => value >= 0 && value <= 100000
    },
    {
      type: 'range',
      field: 'annualPropertyTaxes',
      message: 'Annual property taxes must be between $0 and $50,000',
      validator: (value: any) => value >= 0 && value <= 50000
    },
    {
      type: 'range',
      field: 'annualInsurance',
      message: 'Annual insurance must be between $0 and $25,000',
      validator: (value: any) => value >= 0 && value <= 25000
    },
    {
      type: 'range',
      field: 'acquisitionCosts',
      message: 'Acquisition costs must be between $0 and $500,000',
      validator: (value: any) => value >= 0 && value <= 500000
    },
    {
      type: 'range',
      field: 'exitCosts',
      message: 'Exit costs must be between $0 and $500,000',
      validator: (value: any) => value >= 0 && value <= 500000
    },
    {
      type: 'range',
      field: 'alternativeInvestmentReturn',
      message: 'Alternative investment return must be between 0% and 20%',
      validator: (value: any) => value >= 0 && value <= 20
    },
    {
      type: 'range',
      field: 'inflationRate',
      message: 'Inflation rate must be between 0% and 10%',
      validator: (value: any) => value >= 0 && value <= 10
    },
    {
      type: 'business',
      field: 'investmentTimeline',
      message: 'Opportunity Zone investments typically require 10+ years for maximum tax benefits',
      validator: (value: any) => value >= 10
    },
    {
      type: 'business',
      field: 'deferralPeriod',
      message: 'Tax deferral period should align with your investment timeline',
      validator: (value: any, allInputs: Record<string, any>) => {
        const investmentTimeline = allInputs.investmentTimeline || 10;
        return value <= investmentTimeline;
      }
    }
  ],
  examples: [
    {
      title: 'Conservative Opportunity Zone Investment',
      description: 'A conservative investment with moderate appreciation and rental income',
      inputs: {
        initialInvestment: 100000,
        investmentTimeline: 10,
        annualAppreciationRate: 4,
        annualRentalIncome: 8000,
        rentalIncomeGrowthRate: 2,
        currentTaxBracket: 24,
        capitalGainsTaxRate: 15,
        deferralPeriod: 7,
        annualOperatingExpenses: 5000,
        annualPropertyTaxes: 3000,
        annualInsurance: 2000,
        acquisitionCosts: 8000,
        exitCosts: 12000,
        alternativeInvestmentReturn: 7,
        inflationRate: 2.5
      },
      expectedOutputs: {
        totalInvestment: 108000,
        propertyValueAtExit: 148000,
        totalRentalIncome: 88000,
        totalOperatingExpenses: 100000,
        netRentalIncome: -12000,
        totalTaxBenefits: 15000,
        totalReturn: 43000,
        roi: 39.8,
        annualizedROI: 3.4
      }
    },
    {
      title: 'Aggressive Opportunity Zone Investment',
      description: 'An aggressive investment with high appreciation potential',
      inputs: {
        initialInvestment: 250000,
        investmentTimeline: 15,
        annualAppreciationRate: 8,
        annualRentalIncome: 20000,
        rentalIncomeGrowthRate: 4,
        currentTaxBracket: 32,
        capitalGainsTaxRate: 20,
        deferralPeriod: 10,
        annualOperatingExpenses: 12000,
        annualPropertyTaxes: 8000,
        annualInsurance: 4000,
        acquisitionCosts: 20000,
        exitCosts: 30000,
        alternativeInvestmentReturn: 8,
        inflationRate: 2.5
      },
      expectedOutputs: {
        totalInvestment: 270000,
        propertyValueAtExit: 793000,
        totalRentalIncome: 400000,
        totalOperatingExpenses: 360000,
        netRentalIncome: 40000,
        totalTaxBenefits: 45000,
        totalReturn: 598000,
        roi: 221.5,
        annualizedROI: 8.1
      }
    }
  ]
};

// Helper functions
function calculateTaxDeferralBenefit(initialInvestment: number, currentTaxBracket: number, deferralPeriod: number, alternativeReturn: number): number {
  const deferredTax = initialInvestment * (currentTaxBracket / 100);
  const alternativeInvestmentValue = initialInvestment * Math.pow(1 + alternativeReturn / 100, deferralPeriod);
  const alternativeTax = (alternativeInvestmentValue - initialInvestment) * (currentTaxBracket / 100);
  
  return deferredTax - alternativeTax;
}

function calculateTaxReductionBenefit(capitalGain: number, ozTaxRate: number, regularTaxRate: number): number {
  const regularTax = capitalGain * (regularTaxRate / 100);
  const ozTax = capitalGain * (ozTaxRate / 100);
  
  return regularTax - ozTax;
}

function calculateBreakEvenYears(totalInvestment: number, annualRentalIncome: number, annualOperatingExpenses: number, annualAppreciationRate: number): number {
  if (annualRentalIncome <= annualOperatingExpenses) {
    return totalInvestment / (annualAppreciationRate / 100 * totalInvestment);
  }
  
  const netAnnualIncome = annualRentalIncome - annualOperatingExpenses;
  const annualAppreciation = totalInvestment * (annualAppreciationRate / 100);
  
  if (netAnnualIncome + annualAppreciation <= 0) {
    return Infinity;
  }
  
  return totalInvestment / (netAnnualIncome + annualAppreciation);
}

function generateRecommendations(roi: number, annualizedROI: number, opportunityCostComparison: number, breakEvenYears: number, investmentTimeline: number): string {
  const recommendations = [];
  
  if (roi > 100) {
    recommendations.push('Excellent investment opportunity with strong returns');
  } else if (roi > 50) {
    recommendations.push('Good investment with solid return potential');
  } else if (roi > 20) {
    recommendations.push('Moderate investment with acceptable returns');
  } else {
    recommendations.push('Consider reviewing investment strategy or timeline');
  }
  
  if (opportunityCostComparison > 0) {
    recommendations.push('OZ investment outperforms alternative investments');
  } else {
    recommendations.push('Alternative investments may provide better returns');
  }
  
  if (breakEvenYears < investmentTimeline * 0.5) {
    recommendations.push('Early break-even suggests strong investment');
  } else if (breakEvenYears > investmentTimeline) {
    recommendations.push('Extended break-even period - consider longer timeline');
  }
  
  if (investmentTimeline >= 10) {
    recommendations.push('Long-term hold maximizes tax benefits');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Investment shows balanced risk-return profile');
  }
  
  return recommendations.join('. ');
}