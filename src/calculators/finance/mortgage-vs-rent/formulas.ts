import { Formula } from '../../../types/calculator';

export const mortgageVsRentFormulas: Formula[] = [
  {
    id: 'rent-cost-calculation',
    name: 'Rent Cost Calculation',
    description: 'Calculate total rent cost over time horizon with annual increases',
    calculate: (inputs: Record<string, any>) => {
      const { currentRent = 0, rentIncreaseRate = 0, timeHorizon = 10 } = inputs;
      
      let totalRentCost = 0;
      let currentMonthlyRent = currentRent;
      
      for (let year = 1; year <= timeHorizon; year++) {
        totalRentCost += currentMonthlyRent * 12;
        currentMonthlyRent *= (1 + rentIncreaseRate / 100);
      }
      
      return {
        outputs: {
          totalRentCost: Math.round(totalRentCost),
          finalMonthlyRent: Math.round(currentMonthlyRent)
        },
        explanation: `Total rent cost over ${timeHorizon} years with ${rentIncreaseRate}% annual increases: $${totalRentCost.toLocaleString()}`,
        intermediateSteps: {
          initialMonthlyRent: currentRent,
          annualIncreaseRate: rentIncreaseRate,
          timeHorizon
        }
      };
    }
  },
  {
    id: 'mortgage-payment-calculation',
    name: 'Mortgage Payment Calculation',
    description: 'Calculate monthly mortgage payment using standard amortization formula',
    calculate: (inputs: Record<string, any>) => {
      const { loanAmount = 0, interestRate = 0, loanTerm = 30 } = inputs;
      
      const monthlyRate = interestRate / 100 / 12;
      const totalPayments = loanTerm * 12;
      
      let monthlyPayment = 0;
      if (monthlyRate > 0) {
        monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
      } else {
        monthlyPayment = loanAmount / totalPayments;
      }
      
      return {
        outputs: {
          monthlyPayment: Math.round(monthlyPayment),
          totalPayments: totalPayments,
          totalInterest: Math.round((monthlyPayment * totalPayments) - loanAmount)
        },
        explanation: `Monthly mortgage payment: $${monthlyPayment.toLocaleString()} for ${loanTerm} years at ${interestRate}% interest`,
        intermediateSteps: {
          loanAmount,
          monthlyRate: monthlyRate * 100,
          totalPayments
        }
      };
    }
  },
  {
    id: 'homeownership-cost-calculation',
    name: 'Homeownership Cost Calculation',
    description: 'Calculate total monthly and annual homeownership costs',
    calculate: (inputs: Record<string, any>) => {
      const {
        homePrice = 0,
        propertyTaxRate = 0,
        homeownersInsuranceRate = 0,
        maintenanceRate = 0,
        hoaFees = 0,
        monthlyPayment = 0
      } = inputs;
      
      const monthlyPropertyTax = (homePrice * propertyTaxRate / 100) / 12;
      const monthlyInsurance = (homePrice * homeownersInsuranceRate / 100) / 12;
      const monthlyMaintenance = (homePrice * maintenanceRate / 100) / 12;
      const totalMonthlyCost = monthlyPayment + monthlyPropertyTax + monthlyInsurance + monthlyMaintenance + hoaFees;
      
      return {
        outputs: {
          monthlyPropertyTax: Math.round(monthlyPropertyTax),
          monthlyInsurance: Math.round(monthlyInsurance),
          monthlyMaintenance: Math.round(monthlyMaintenance),
          monthlyHOAFees: Math.round(hoaFees),
          totalMonthlyCost: Math.round(totalMonthlyCost)
        },
        explanation: `Total monthly homeownership cost: $${totalMonthlyCost.toLocaleString()} (mortgage: $${monthlyPayment.toLocaleString()}, taxes: $${monthlyPropertyTax.toLocaleString()}, insurance: $${monthlyInsurance.toLocaleString()}, maintenance: $${monthlyMaintenance.toLocaleString()}, HOA: $${hoaFees.toLocaleString()})`,
        intermediateSteps: {
          homePrice,
          propertyTaxRate,
          insuranceRate: homeownersInsuranceRate,
          maintenanceRate
        }
      };
    }
  },
  {
    id: 'break-even-analysis',
    name: 'Break-Even Analysis',
    description: 'Calculate years until homeownership becomes cheaper than renting',
    calculate: (inputs: Record<string, any>) => {
      const {
        currentRent = 0,
        rentIncreaseRate = 0,
        monthlyHomeownershipCost = 0,
        downPayment = 0,
        closingCosts = 0
      } = inputs;
      
      let cumulativeRentCost = 0;
      let cumulativeHomeownershipCost = downPayment + closingCosts;
      let year = 0;
      
      while (cumulativeRentCost < cumulativeHomeownershipCost && year < 50) {
        year++;
        cumulativeRentCost += currentRent * 12 * Math.pow(1 + rentIncreaseRate / 100, year - 1);
        cumulativeHomeownershipCost += monthlyHomeownershipCost * 12;
      }
      
      return {
        outputs: {
          breakEvenYears: Math.round(year * 10) / 10,
          cumulativeRentCost: Math.round(cumulativeRentCost),
          cumulativeHomeownershipCost: Math.round(cumulativeHomeownershipCost)
        },
        explanation: `Break-even point: ${year.toFixed(1)} years. After this point, homeownership becomes cheaper than renting.`,
        intermediateSteps: {
          initialRent: currentRent,
          rentIncreaseRate,
          monthlyHomeownershipCost,
          upfrontCosts: downPayment + closingCosts
        }
      };
    }
  },
  {
    id: 'net-worth-comparison',
    name: 'Net Worth Comparison',
    description: 'Compare net worth impact of renting vs. buying over time horizon',
    calculate: (inputs: Record<string, any>) => {
      const {
        totalRentCost = 0,
        totalHomeownershipCost = 0,
        downPayment = 0,
        investmentReturnRate = 0,
        timeHorizon = 10,
        homePrice = 0,
        homeAppreciationRate = 0,
        remainingLoanBalance = 0,
        totalTaxBenefits = 0
      } = inputs;
      
      // Investment opportunity cost (what down payment could earn if invested)
      const investmentOpportunityCost = downPayment * Math.pow(1 + investmentReturnRate / 100, timeHorizon) - downPayment;
      
      // Home equity at end of time horizon
      const finalHomeValue = homePrice * Math.pow(1 + homeAppreciationRate / 100, timeHorizon);
      const homeEquity = finalHomeValue - remainingLoanBalance;
      
      // Net worth comparison
      const netWorthRenting = -totalRentCost + investmentOpportunityCost;
      const netWorthBuying = homeEquity - totalHomeownershipCost + totalTaxBenefits;
      const netWorthDifference = netWorthBuying - netWorthRenting;
      
      return {
        outputs: {
          investmentOpportunityCost: Math.round(investmentOpportunityCost),
          finalHomeValue: Math.round(finalHomeValue),
          homeEquity: Math.round(homeEquity),
          netWorthRenting: Math.round(netWorthRenting),
          netWorthBuying: Math.round(netWorthBuying),
          netWorthDifference: Math.round(netWorthDifference)
        },
        explanation: `Net worth comparison: Renting results in $${netWorthRenting.toLocaleString()}, buying results in $${netWorthBuying.toLocaleString()}. Difference: $${netWorthDifference.toLocaleString()}.`,
        intermediateSteps: {
          downPayment,
          investmentReturnRate,
          timeHorizon,
          homeAppreciationRate,
          totalTaxBenefits
        }
      };
    }
  }
];

// Helper function for calculating remaining loan balance
export function calculateRemainingBalance(principal: number, monthlyPayment: number, monthlyRate: number, monthsPaid: number): number {
  if (monthlyRate === 0) return principal - (monthlyPayment * monthsPaid);
  return principal * Math.pow(1 + monthlyRate, monthsPaid) - monthlyPayment * (Math.pow(1 + monthlyRate, monthsPaid) - 1) / monthlyRate;
}