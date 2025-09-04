import { Formula } from '../../../types/calculator';

export const netOperatingIncomeFormulas: Formula[] = [
  {
    id: 'gross-income-calculation',
    name: 'Gross Income Calculation',
    description: 'Calculate total gross income from all sources',
    calculate: (inputs: Record<string, any>) => {
      const { baseRent = 0, additionalIncome = 0 } = inputs;
      
      const grossIncome = baseRent + additionalIncome;
      
      return {
        outputs: {
          grossIncome: Math.round(grossIncome),
          baseRent: Math.round(baseRent),
          additionalIncome: Math.round(additionalIncome)
        },
        explanation: `Total gross income: $${grossIncome.toLocaleString()} (Base rent: $${baseRent.toLocaleString()}, Additional income: $${additionalIncome.toLocaleString()})`,
        intermediateSteps: {
          baseRent,
          additionalIncome
        }
      };
    }
  },
  {
    id: 'effective-gross-income-calculation',
    name: 'Effective Gross Income Calculation',
    description: 'Calculate effective gross income after vacancy losses',
    calculate: (inputs: Record<string, any>) => {
      const { baseRent = 0, additionalIncome = 0, vacancyRate = 0 } = inputs;
      
      const grossIncome = baseRent + additionalIncome;
      const vacancyLoss = grossIncome * (vacancyRate / 100);
      const effectiveGrossIncome = grossIncome - vacancyLoss;
      
      return {
        outputs: {
          grossIncome: Math.round(grossIncome),
          vacancyLoss: Math.round(vacancyLoss),
          effectiveGrossIncome: Math.round(effectiveGrossIncome),
          vacancyRate
        },
        explanation: `Effective gross income: $${effectiveGrossIncome.toLocaleString()} after ${vacancyRate}% vacancy loss of $${vacancyLoss.toLocaleString()}`,
        intermediateSteps: {
          grossIncome,
          vacancyRate,
          vacancyLoss
        }
      };
    }
  },
  {
    id: 'operating-expenses-calculation',
    name: 'Operating Expenses Calculation',
    description: 'Calculate total operating expenses',
    calculate: (inputs: Record<string, any>) => {
      const {
        propertyManagementFee = 0,
        maintenanceCosts = 0,
        propertyTaxes = 0,
        propertyInsurance = 0,
        utilities = 0,
        hoaFees = 0,
        legalFees = 0,
        accountingFees = 0,
        advertisingCosts = 0,
        otherExpenses = 0
      } = inputs;
      
      const baseRent = inputs.baseRent || 0;
      const additionalIncome = inputs.additionalIncome || 0;
      const vacancyRate = inputs.vacancyRate || 0;
      const effectiveGrossIncome = (baseRent + additionalIncome) * (1 - vacancyRate / 100);
      
      const propertyManagementCost = effectiveGrossIncome * (propertyManagementFee / 100);
      const monthlyPropertyTaxes = propertyTaxes / 12;
      const monthlyPropertyInsurance = propertyInsurance / 12;
      
      const totalOperatingExpenses = propertyManagementCost + maintenanceCosts + monthlyPropertyTaxes + monthlyPropertyInsurance + utilities + hoaFees + legalFees + accountingFees + advertisingCosts + otherExpenses;
      
      return {
        outputs: {
          propertyManagementCost: Math.round(propertyManagementCost),
          maintenanceCosts: Math.round(maintenanceCosts),
          monthlyPropertyTaxes: Math.round(monthlyPropertyTaxes),
          monthlyPropertyInsurance: Math.round(monthlyPropertyInsurance),
          utilities: Math.round(utilities),
          hoaFees: Math.round(hoaFees),
          legalFees: Math.round(legalFees),
          accountingFees: Math.round(accountingFees),
          advertisingCosts: Math.round(advertisingCosts),
          otherExpenses: Math.round(otherExpenses),
          totalOperatingExpenses: Math.round(totalOperatingExpenses)
        },
        explanation: `Total operating expenses: $${totalOperatingExpenses.toLocaleString()} per month`,
        intermediateSteps: {
          effectiveGrossIncome,
          propertyManagementFee,
          propertyTaxes,
          propertyInsurance
        }
      };
    }
  },
  {
    id: 'noi-calculation',
    name: 'NOI Calculation',
    description: 'Calculate Net Operating Income',
    calculate: (inputs: Record<string, any>) => {
      const { baseRent = 0, additionalIncome = 0, vacancyRate = 0 } = inputs;
      
      const grossIncome = baseRent + additionalIncome;
      const vacancyLoss = grossIncome * (vacancyRate / 100);
      const effectiveGrossIncome = grossIncome - vacancyLoss;
      
      const totalOperatingExpenses = calculateTotalExpenses(inputs);
      const netOperatingIncome = effectiveGrossIncome - totalOperatingExpenses;
      
      return {
        outputs: {
          effectiveGrossIncome: Math.round(effectiveGrossIncome),
          totalOperatingExpenses: Math.round(totalOperatingExpenses),
          netOperatingIncome: Math.round(netOperatingIncome)
        },
        explanation: `Net Operating Income: $${netOperatingIncome.toLocaleString()} per month`,
        intermediateSteps: {
          grossIncome,
          vacancyLoss,
          effectiveGrossIncome
        }
      };
    }
  },
  {
    id: 'financial-metrics-calculation',
    name: 'Financial Metrics Calculation',
    description: 'Calculate key financial ratios and metrics',
    calculate: (inputs: Record<string, any>) => {
      const { baseRent = 0, additionalIncome = 0, vacancyRate = 0, propertyValue = 0 } = inputs;
      
      const grossIncome = baseRent + additionalIncome;
      const vacancyLoss = grossIncome * (vacancyRate / 100);
      const effectiveGrossIncome = grossIncome - vacancyLoss;
      
      const totalOperatingExpenses = calculateTotalExpenses(inputs);
      const netOperatingIncome = effectiveGrossIncome - totalOperatingExpenses;
      
      const operatingExpenseRatio = effectiveGrossIncome > 0 ? (totalOperatingExpenses / effectiveGrossIncome) * 100 : 0;
      const profitMargin = effectiveGrossIncome > 0 ? (netOperatingIncome / effectiveGrossIncome) * 100 : 0;
      const capRate = propertyValue > 0 ? (netOperatingIncome * 12 / propertyValue) * 100 : 0;
      
      return {
        outputs: {
          operatingExpenseRatio: Math.round(operatingExpenseRatio * 100) / 100,
          profitMargin: Math.round(profitMargin * 100) / 100,
          capRate: Math.round(capRate * 100) / 100
        },
        explanation: `Operating expense ratio: ${operatingExpenseRatio.toFixed(1)}%, Profit margin: ${profitMargin.toFixed(1)}%, Cap rate: ${capRate.toFixed(1)}%`,
        intermediateSteps: {
          effectiveGrossIncome,
          totalOperatingExpenses,
          netOperatingIncome,
          propertyValue
        }
      };
    }
  }
];

// Helper function for calculating total expenses
function calculateTotalExpenses(inputs: Record<string, any>): number {
  const {
    propertyManagementFee = 0,
    maintenanceCosts = 0,
    propertyTaxes = 0,
    propertyInsurance = 0,
    utilities = 0,
    hoaFees = 0,
    legalFees = 0,
    accountingFees = 0,
    advertisingCosts = 0,
    otherExpenses = 0
  } = inputs;
  
  const baseRent = inputs.baseRent || 0;
  const additionalIncome = inputs.additionalIncome || 0;
  const vacancyRate = inputs.vacancyRate || 0;
  const effectiveGrossIncome = (baseRent + additionalIncome) * (1 - vacancyRate / 100);
  
  const propertyManagementCost = effectiveGrossIncome * (propertyManagementFee / 100);
  
  return propertyManagementCost + maintenanceCosts + (propertyTaxes / 12) + (propertyInsurance / 12) + utilities + hoaFees + legalFees + accountingFees + advertisingCosts + otherExpenses;
}