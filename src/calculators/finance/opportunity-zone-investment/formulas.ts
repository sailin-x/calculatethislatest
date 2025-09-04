import { Formula, CalculationResult } from '../../../types/calculator';

export const opportunityZoneInvestmentFormulas: Formula[] = [
  {
    id: 'total-investment-calculation',
    name: 'Total Investment Calculation',
    description: 'Calculate total investment including acquisition costs',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const { initialInvestment = 0, acquisitionCosts = 0 } = inputs;
      const totalInvestment = initialInvestment + acquisitionCosts;
      
      return {
        outputs: {
          totalInvestment: Math.round(totalInvestment)
        },
        explanation: `Total investment: $${initialInvestment.toLocaleString()} + $${acquisitionCosts.toLocaleString()} = $${totalInvestment.toLocaleString()}`,
        intermediateSteps: {
          initialInvestment,
          acquisitionCosts
        }
      };
    }
  },
  {
    id: 'property-value-calculation',
    name: 'Property Value at Exit',
    description: 'Calculate projected property value at the end of investment period',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const { initialInvestment = 0, annualAppreciationRate = 0, investmentTimeline = 10 } = inputs;
      const propertyValueAtExit = initialInvestment * Math.pow(1 + annualAppreciationRate / 100, investmentTimeline);
      
      return {
        outputs: {
          propertyValueAtExit: Math.round(propertyValueAtExit)
        },
        explanation: `Property value after ${investmentTimeline} years: $${initialInvestment.toLocaleString()} × (1 + ${annualAppreciationRate}%)^${investmentTimeline} = $${propertyValueAtExit.toLocaleString()}`,
        intermediateSteps: {
          initialInvestment,
          annualAppreciationRate,
          investmentTimeline,
          appreciationFactor: Math.pow(1 + annualAppreciationRate / 100, investmentTimeline)
        }
      };
    }
  },
  {
    id: 'rental-income-calculation',
    name: 'Total Rental Income Calculation',
    description: 'Calculate total rental income over the investment timeline with growth',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const { annualRentalIncome = 0, rentalIncomeGrowthRate = 0, investmentTimeline = 10 } = inputs;
      
      let totalRentalIncome = 0;
      let currentRentalIncome = annualRentalIncome;
      const yearlyIncome = [];
      
      for (let year = 1; year <= investmentTimeline; year++) {
        yearlyIncome.push({
          year,
          income: currentRentalIncome
        });
        totalRentalIncome += currentRentalIncome;
        currentRentalIncome *= (1 + rentalIncomeGrowthRate / 100);
      }
      
      return {
        outputs: {
          totalRentalIncome: Math.round(totalRentalIncome)
        },
        explanation: `Total rental income over ${investmentTimeline} years: $${totalRentalIncome.toLocaleString()} (with ${rentalIncomeGrowthRate}% annual growth)`,
        intermediateSteps: {
          annualRentalIncome,
          rentalIncomeGrowthRate,
          investmentTimeline,
          yearlyIncome
        }
      };
    }
  },
  {
    id: 'operating-expenses-calculation',
    name: 'Operating Expenses Calculation',
    description: 'Calculate total operating expenses over the investment timeline',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const {
        annualOperatingExpenses = 0,
        annualPropertyTaxes = 0,
        annualInsurance = 0,
        investmentTimeline = 10
      } = inputs;
      
      const totalOperatingExpenses = (annualOperatingExpenses + annualPropertyTaxes + annualInsurance) * investmentTimeline;
      
      return {
        outputs: {
          totalOperatingExpenses: Math.round(totalOperatingExpenses)
        },
        explanation: `Total operating expenses over ${investmentTimeline} years: ($${annualOperatingExpenses.toLocaleString()} + $${annualPropertyTaxes.toLocaleString()} + $${annualInsurance.toLocaleString()}) × ${investmentTimeline} = $${totalOperatingExpenses.toLocaleString()}`,
        intermediateSteps: {
          annualOperatingExpenses,
          annualPropertyTaxes,
          annualInsurance,
          investmentTimeline,
          annualTotal: annualOperatingExpenses + annualPropertyTaxes + annualInsurance
        }
      };
    }
  },
  {
    id: 'tax-benefits-calculation',
    name: 'Tax Benefits Calculation',
    description: 'Calculate tax deferral and reduction benefits for Opportunity Zone investments',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const {
        initialInvestment = 0,
        currentTaxBracket = 0,
        deferralPeriod = 7,
        alternativeInvestmentReturn = 0,
        propertyValueAtExit = 0,
        capitalGainsTaxRate = 0
      } = inputs;
      
      // Tax deferral benefit
      const deferredTax = initialInvestment * (currentTaxBracket / 100);
      const alternativeInvestmentValue = initialInvestment * Math.pow(1 + alternativeInvestmentReturn / 100, deferralPeriod);
      const alternativeTax = (alternativeInvestmentValue - initialInvestment) * (currentTaxBracket / 100);
      const taxDeferralBenefit = deferredTax - alternativeTax;
      
      // Tax reduction benefit
      const capitalGain = propertyValueAtExit - initialInvestment;
      const regularTax = capitalGain * (currentTaxBracket / 100);
      const ozTax = capitalGain * (capitalGainsTaxRate / 100);
      const taxReductionBenefit = regularTax - ozTax;
      
      const totalTaxBenefits = taxDeferralBenefit + taxReductionBenefit;
      
      return {
        outputs: {
          taxDeferralBenefit: Math.round(taxDeferralBenefit),
          taxReductionBenefit: Math.round(taxReductionBenefit),
          totalTaxBenefits: Math.round(totalTaxBenefits)
        },
        explanation: `Total tax benefits: $${taxDeferralBenefit.toLocaleString()} deferral + $${taxReductionBenefit.toLocaleString()} reduction = $${totalTaxBenefits.toLocaleString()}`,
        intermediateSteps: {
          deferredTax,
          alternativeInvestmentValue,
          alternativeTax,
          capitalGain,
          regularTax,
          ozTax
        }
      };
    }
  },
  {
    id: 'roi-calculation',
    name: 'ROI and Return Calculations',
    description: 'Calculate comprehensive return on investment metrics',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const {
        totalInvestment = 0,
        propertyValueAtExit = 0,
        initialInvestment = 0,
        netRentalIncome = 0,
        totalTaxBenefits = 0,
        exitCosts = 0,
        investmentTimeline = 10,
        alternativeInvestmentReturn = 0
      } = inputs;
      
      // Calculate total return
      const appreciationReturn = propertyValueAtExit - initialInvestment;
      const totalReturn = appreciationReturn + netRentalIncome + totalTaxBenefits - exitCosts;
      
      // Calculate ROI metrics
      const roi = (totalReturn / totalInvestment) * 100;
      const annualizedROI = Math.pow(1 + roi / 100, 1 / investmentTimeline) - 1;
      
      // Calculate opportunity cost comparison
      const alternativeInvestmentValue = totalInvestment * Math.pow(1 + alternativeInvestmentReturn / 100, investmentTimeline);
      const opportunityCostComparison = totalReturn - (alternativeInvestmentValue - totalInvestment);
      
      return {
        outputs: {
          totalReturn: Math.round(totalReturn),
          roi: Math.round(roi * 100) / 100,
          annualizedROI: Math.round(annualizedROI * 10000) / 100,
          opportunityCostComparison: Math.round(opportunityCostComparison)
        },
        explanation: `ROI: ${roi.toFixed(1)}% over ${investmentTimeline} years. Annualized: ${(annualizedROI * 100).toFixed(1)}%`,
        intermediateSteps: {
          appreciationReturn,
          netRentalIncome,
          totalTaxBenefits,
          exitCosts,
          alternativeInvestmentValue
        }
      };
    }
  }
];

// Helper function for calculating break-even years
export function calculateBreakEvenYears(
  totalInvestment: number,
  annualRentalIncome: number,
  annualOperatingExpenses: number,
  annualAppreciationRate: number
): number {
  if (annualRentalIncome <= annualOperatingExpenses) {
    // Only appreciation can provide returns
    if (annualAppreciationRate <= 0) {
      return Infinity;
    }
    return totalInvestment / (annualAppreciationRate / 100 * totalInvestment);
  }
  
  const netAnnualIncome = annualRentalIncome - annualOperatingExpenses;
  const annualAppreciation = totalInvestment * (annualAppreciationRate / 100);
  
  if (netAnnualIncome + annualAppreciation <= 0) {
    return Infinity;
  }
  
  return totalInvestment / (netAnnualIncome + annualAppreciation);
}