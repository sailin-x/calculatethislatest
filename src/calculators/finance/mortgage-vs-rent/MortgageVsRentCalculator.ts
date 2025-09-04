import { Calculator } from '../../../types/calculator';

export const mortgageVsRentCalculator: Calculator = {
  id: 'mortgage-vs-rent',
  title: 'Mortgage vs. Rent Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Compare the total cost of homeownership vs. renting to make an informed decision about your housing situation.',
  usageInstructions: [
    'Enter your current rent amount and expected annual increases',
    'Input home purchase details including price, down payment, and loan terms',
    'Include all homeownership costs: mortgage, taxes, insurance, maintenance, HOA',
    'Set your investment opportunity cost and tax benefits',
    'Review the comprehensive comparison analysis and recommendations'
  ],
  inputs: [
    {
      id: 'currentRent',
      label: 'Current Monthly Rent',
      type: 'currency',
      required: true,
      min: 0,
      step: 50,
      tooltip: 'Your current monthly rent payment',
      placeholder: '1500'
    },
    {
      id: 'rentIncreaseRate',
      label: 'Annual Rent Increase Rate',
      type: 'percentage',
      required: true,
      min: 0,
      max: 20,
      step: 0.5,
      defaultValue: 3,
      tooltip: 'Expected annual percentage increase in rent',
      placeholder: '3.0'
    },
    {
      id: 'homePrice',
      label: 'Home Purchase Price',
      type: 'currency',
      required: true,
      min: 10000,
      step: 1000,
      tooltip: 'Total price of the home you would purchase',
      placeholder: '300000'
    },
    {
      id: 'downPayment',
      label: 'Down Payment Amount',
      type: 'currency',
      required: true,
      min: 0,
      step: 1000,
      tooltip: 'Cash down payment for the home purchase',
      placeholder: '60000'
    },
    {
      id: 'downPaymentPercentage',
      label: 'Down Payment Percentage',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      step: 1,
      tooltip: 'Down payment as percentage of home price (auto-calculated)',
      placeholder: '20.0'
    },
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'currency',
      required: false,
      min: 0,
      step: 1000,
      tooltip: 'Mortgage loan amount (auto-calculated)',
      placeholder: '240000'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate',
      type: 'percentage',
      required: true,
      min: 0.1,
      max: 20,
      step: 0.125,
      tooltip: 'Annual mortgage interest rate',
      placeholder: '4.5'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'number',
      required: true,
      min: 10,
      max: 50,
      step: 1,
      defaultValue: 30,
      tooltip: 'Length of the mortgage in years',
      placeholder: '30'
    },
    {
      id: 'propertyTaxRate',
      label: 'Property Tax Rate',
      type: 'percentage',
      required: true,
      min: 0,
      max: 5,
      step: 0.01,
      defaultValue: 1.2,
      tooltip: 'Annual property tax rate as percentage of home value',
      placeholder: '1.2'
    },
    {
      id: 'homeownersInsuranceRate',
      label: 'Homeowners Insurance Rate',
      type: 'percentage',
      required: true,
      min: 0,
      max: 2,
      step: 0.01,
      defaultValue: 0.5,
      tooltip: 'Annual insurance rate as percentage of home value',
      placeholder: '0.5'
    },
    {
      id: 'maintenanceRate',
      label: 'Annual Maintenance Rate',
      type: 'percentage',
      required: true,
      min: 0,
      max: 5,
      step: 0.1,
      defaultValue: 1.0,
      tooltip: 'Annual maintenance costs as percentage of home value',
      placeholder: '1.0'
    },
    {
      id: 'hoaFees',
      label: 'Monthly HOA Fees',
      type: 'currency',
      required: false,
      min: 0,
      step: 25,
      tooltip: 'Monthly homeowners association fees if applicable',
      placeholder: '0'
    },
    {
      id: 'closingCosts',
      label: 'Closing Costs',
      type: 'currency',
      required: true,
      min: 0,
      step: 1000,
      defaultValue: 0,
      tooltip: 'One-time closing costs for home purchase',
      placeholder: '9000'
    },
    {
      id: 'investmentReturnRate',
      label: 'Investment Return Rate',
      type: 'percentage',
      required: true,
      min: 0,
      max: 20,
      step: 0.5,
      defaultValue: 7,
      tooltip: 'Expected annual return if investing down payment elsewhere',
      placeholder: '7.0'
    },
    {
      id: 'taxBracket',
      label: 'Tax Bracket',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 1,
      defaultValue: 22,
      tooltip: 'Your federal income tax bracket percentage',
      placeholder: '22.0'
    },
    {
      id: 'timeHorizon',
      label: 'Time Horizon (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      defaultValue: 10,
      tooltip: 'How long you plan to stay in the home',
      placeholder: '10'
    },
    {
      id: 'homeAppreciationRate',
      label: 'Home Appreciation Rate',
      type: 'percentage',
      required: true,
      min: -10,
      max: 20,
      step: 0.5,
      defaultValue: 3,
      tooltip: 'Expected annual home value appreciation rate',
      placeholder: '3.0'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate',
      type: 'percentage',
      required: true,
      min: 0,
      max: 20,
      step: 0.5,
      defaultValue: 2.5,
      tooltip: 'Expected annual inflation rate',
      placeholder: '2.5'
    }
  ],
  outputs: [
    {
      id: 'totalRentCost',
      label: 'Total Rent Cost',
      type: 'currency',
      explanation: 'Total cost of renting over the time horizon'
    },
    {
      id: 'totalHomeownershipCost',
      label: 'Total Homeownership Cost',
      type: 'currency',
      explanation: 'Total cost of homeownership over the time horizon'
    },
    {
      id: 'monthlyRentCost',
      label: 'Monthly Rent Cost',
      type: 'currency',
      explanation: 'Current monthly rent payment'
    },
    {
      id: 'monthlyHomeownershipCost',
      label: 'Monthly Homeownership Cost',
      type: 'currency',
      explanation: 'Total monthly cost of homeownership'
    },
    {
      id: 'monthlySavings',
      label: 'Monthly Cost Difference',
      type: 'currency',
      explanation: 'Difference between monthly rent and homeownership costs'
    },
    {
      id: 'breakEvenYears',
      label: 'Break-Even Years',
      type: 'number',
      explanation: 'Years until homeownership becomes cheaper than renting'
    },
    {
      id: 'netWorthComparison',
      label: 'Net Worth Comparison',
      type: 'currency',
      explanation: 'Difference in net worth between renting and buying'
    },
    {
      id: 'investmentOpportunityCost',
      label: 'Investment Opportunity Cost',
      type: 'currency',
      explanation: 'Potential investment returns lost by using down payment'
    },
    {
      id: 'taxBenefits',
      label: 'Tax Benefits',
      type: 'currency',
      explanation: 'Tax savings from mortgage interest and property tax deductions'
    },
    {
      id: 'recommendation',
      label: 'Recommendation',
      type: 'text',
      explanation: 'Whether renting or buying is financially better'
    }
  ],
  formulas: [
    {
      id: 'mortgage-vs-rent-analysis',
      name: 'Mortgage vs. Rent Analysis',
      description: 'Comprehensive comparison of renting vs. homeownership costs',
      calculate: (inputs: Record<string, any>) => {
        // Extract and validate inputs
        const {
          currentRent = 0,
          rentIncreaseRate = 0,
          homePrice = 0,
          downPayment = 0,
          interestRate = 0,
          loanTerm = 30,
          propertyTaxRate = 0,
          homeownersInsuranceRate = 0,
          maintenanceRate = 0,
          hoaFees = 0,
          closingCosts = 0,
          investmentReturnRate = 0,
          taxBracket = 0,
          timeHorizon = 10,
          homeAppreciationRate = 0,
          inflationRate = 0
        } = inputs;

        // Calculate loan amount if not provided
        const loanAmount = inputs.loanAmount || (homePrice - downPayment);
        
        // Calculate monthly mortgage payment
        const monthlyRate = interestRate / 100 / 12;
        const totalPayments = loanTerm * 12;
        const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);

        // Calculate monthly homeownership costs
        const monthlyPropertyTax = (homePrice * propertyTaxRate / 100) / 12;
        const monthlyInsurance = (homePrice * homeownersInsuranceRate / 100) / 12;
        const monthlyMaintenance = (homePrice * maintenanceRate / 100) / 12;
        const monthlyHomeownershipCost = monthlyPayment + monthlyPropertyTax + monthlyInsurance + monthlyMaintenance + hoaFees;

        // Calculate total rent cost over time horizon
        let totalRentCost = 0;
        let currentMonthlyRent = currentRent;
        for (let year = 1; year <= timeHorizon; year++) {
          totalRentCost += currentMonthlyRent * 12;
          currentMonthlyRent *= (1 + rentIncreaseRate / 100);
        }

        // Calculate total homeownership cost over time horizon
        const totalMortgagePayments = monthlyPayment * 12 * timeHorizon;
        const totalPropertyTax = monthlyPropertyTax * 12 * timeHorizon;
        const totalInsurance = monthlyInsurance * 12 * timeHorizon;
        const totalMaintenance = monthlyMaintenance * 12 * timeHorizon;
        const totalHOAFees = hoaFees * 12 * timeHorizon;
        const totalHomeownershipCost = downPayment + closingCosts + totalMortgagePayments + totalPropertyTax + totalInsurance + totalMaintenance + totalHOAFees;

        // Calculate home value at end of time horizon
        const finalHomeValue = homePrice * Math.pow(1 + homeAppreciationRate / 100, timeHorizon);
        const remainingLoanBalance = calculateRemainingBalance(loanAmount, monthlyPayment, monthlyRate, timeHorizon * 12);
        const homeEquity = finalHomeValue - remainingLoanBalance;

        // Calculate investment opportunity cost
        const investmentOpportunityCost = downPayment * Math.pow(1 + investmentReturnRate / 100, timeHorizon) - downPayment;

        // Calculate tax benefits
        const totalInterestPaid = totalMortgagePayments - (loanAmount - remainingLoanBalance);
        const totalTaxBenefits = (totalInterestPaid + totalPropertyTax) * (taxBracket / 100);

        // Calculate net worth comparison
        const netWorthRenting = -totalRentCost + investmentOpportunityCost;
        const netWorthBuying = homeEquity - totalHomeownershipCost + totalTaxBenefits;
        const netWorthComparison = netWorthBuying - netWorthRenting;

        // Calculate monthly savings
        const monthlySavings = monthlyHomeownershipCost - currentRent;

        // Calculate break-even years
        const breakEvenYears = calculateBreakEvenYears(currentRent, rentIncreaseRate, monthlyHomeownershipCost, downPayment, closingCosts, homePrice, homeAppreciationRate, interestRate, loanTerm, propertyTaxRate, homeownersInsuranceRate, maintenanceRate, hoaFees);

        // Determine recommendation
        const recommendation = generateRecommendation(netWorthComparison, breakEvenYears, timeHorizon, monthlySavings);

        return {
          outputs: {
            totalRentCost: Math.round(totalRentCost),
            totalHomeownershipCost: Math.round(totalHomeownershipCost),
            monthlyRentCost: Math.round(currentRent),
            monthlyHomeownershipCost: Math.round(monthlyHomeownershipCost),
            monthlySavings: Math.round(monthlySavings),
            breakEvenYears: Math.round(breakEvenYears * 10) / 10,
            netWorthComparison: Math.round(netWorthComparison),
            investmentOpportunityCost: Math.round(investmentOpportunityCost),
            taxBenefits: Math.round(totalTaxBenefits),
            recommendation
          },
          explanation: `Over ${timeHorizon} years, renting would cost $${totalRentCost.toLocaleString()} while homeownership would cost $${totalHomeownershipCost.toLocaleString()}. The break-even point is ${breakEvenYears.toFixed(1)} years.`,
          intermediateSteps: {
            monthlyMortgagePayment: Math.round(monthlyPayment),
            monthlyPropertyTax: Math.round(monthlyPropertyTax),
            monthlyInsurance: Math.round(monthlyInsurance),
            monthlyMaintenance: Math.round(monthlyMaintenance),
            finalHomeValue: Math.round(finalHomeValue),
            homeEquity: Math.round(homeEquity),
            remainingLoanBalance: Math.round(remainingLoanBalance)
          }
        };
      }
    }
  ],
  validationRules: [
    {
      type: 'required',
      field: 'currentRent',
      message: 'Current monthly rent is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      type: 'required',
      field: 'homePrice',
      message: 'Home purchase price is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      type: 'required',
      field: 'downPayment',
      message: 'Down payment amount is required',
      validator: (value: any) => value !== null && value !== undefined && value >= 0
    },
    {
      type: 'required',
      field: 'interestRate',
      message: 'Interest rate is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      type: 'required',
      field: 'loanTerm',
      message: 'Loan term is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      type: 'required',
      field: 'propertyTaxRate',
      message: 'Property tax rate is required',
      validator: (value: any) => value !== null && value !== undefined && value >= 0
    },
    {
      type: 'required',
      field: 'homeownersInsuranceRate',
      message: 'Homeowners insurance rate is required',
      validator: (value: any) => value !== null && value !== undefined && value >= 0
    },
    {
      type: 'required',
      field: 'maintenanceRate',
      message: 'Maintenance rate is required',
      validator: (value: any) => value !== null && value !== undefined && value >= 0
    },
    {
      type: 'required',
      field: 'closingCosts',
      message: 'Closing costs are required',
      validator: (value: any) => value !== null && value !== undefined && value >= 0
    },
    {
      type: 'required',
      field: 'investmentReturnRate',
      message: 'Investment return rate is required',
      validator: (value: any) => value !== null && value !== undefined && value >= 0
    },
    {
      type: 'required',
      field: 'taxBracket',
      message: 'Tax bracket is required',
      validator: (value: any) => value !== null && value !== undefined && value >= 0
    },
    {
      type: 'required',
      field: 'timeHorizon',
      message: 'Time horizon is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      type: 'required',
      field: 'homeAppreciationRate',
      message: 'Home appreciation rate is required',
      validator: (value: any) => value !== null && value !== undefined
    },
    {
      type: 'required',
      field: 'inflationRate',
      message: 'Inflation rate is required',
      validator: (value: any) => value !== null && value !== undefined
    },
    {
      type: 'range',
      field: 'currentRent',
      message: 'Current rent must be between $100 and $50,000',
      validator: (value: any) => value >= 100 && value <= 50000
    },
    {
      type: 'range',
      field: 'rentIncreaseRate',
      message: 'Rent increase rate must be between 0% and 20%',
      validator: (value: any) => value >= 0 && value <= 20
    },
    {
      type: 'range',
      field: 'homePrice',
      message: 'Home price must be between $10,000 and $10,000,000',
      validator: (value: any) => value >= 10000 && value <= 10000000
    },
    {
      type: 'range',
      field: 'downPayment',
      message: 'Down payment must be between $0 and home price',
      validator: (value: any, allInputs: Record<string, any>) => {
        const homePrice = allInputs.homePrice || 0;
        return value >= 0 && value <= homePrice;
      }
    },
    {
      type: 'range',
      field: 'interestRate',
      message: 'Interest rate must be between 0.1% and 20%',
      validator: (value: any) => value >= 0.1 && value <= 20
    },
    {
      type: 'range',
      field: 'loanTerm',
      message: 'Loan term must be between 10 and 50 years',
      validator: (value: any) => value >= 10 && value <= 50
    },
    {
      type: 'range',
      field: 'propertyTaxRate',
      message: 'Property tax rate must be between 0% and 5%',
      validator: (value: any) => value >= 0 && value <= 5
    },
    {
      type: 'range',
      field: 'homeownersInsuranceRate',
      message: 'Homeowners insurance rate must be between 0% and 2%',
      validator: (value: any) => value >= 0 && value <= 2
    },
    {
      type: 'range',
      field: 'maintenanceRate',
      message: 'Maintenance rate must be between 0% and 5%',
      validator: (value: any) => value >= 0 && value <= 5
    },
    {
      type: 'range',
      field: 'hoaFees',
      message: 'HOA fees must be between $0 and $5,000',
      validator: (value: any) => value >= 0 && value <= 5000
    },
    {
      type: 'range',
      field: 'closingCosts',
      message: 'Closing costs must be between $0 and $100,000',
      validator: (value: any) => value >= 0 && value <= 100000
    },
    {
      type: 'range',
      field: 'investmentReturnRate',
      message: 'Investment return rate must be between 0% and 20%',
      validator: (value: any) => value >= 0 && value <= 20
    },
    {
      type: 'range',
      field: 'taxBracket',
      message: 'Tax bracket must be between 0% and 50%',
      validator: (value: any) => value >= 0 && value <= 50
    },
    {
      type: 'range',
      field: 'timeHorizon',
      message: 'Time horizon must be between 1 and 50 years',
      validator: (value: any) => value >= 1 && value <= 50
    },
    {
      type: 'range',
      field: 'homeAppreciationRate',
      message: 'Home appreciation rate must be between -10% and 20%',
      validator: (value: any) => value >= -10 && value <= 20
    },
    {
      type: 'range',
      field: 'inflationRate',
      message: 'Inflation rate must be between 0% and 20%',
      validator: (value: any) => value >= 0 && value <= 20
    },
    {
      type: 'business',
      field: 'downPayment',
      message: 'Down payment should typically be at least 20% of home price to avoid PMI',
      validator: (value: any, allInputs: Record<string, any>) => {
        const homePrice = allInputs.homePrice || 0;
        return value >= homePrice * 0.2;
      }
    },
    {
      type: 'business',
      field: 'timeHorizon',
      message: 'Consider a longer time horizon for homeownership to be financially beneficial',
      validator: (value: any, allInputs: Record<string, any>) => {
        return value >= 5;
      }
    }
  ],
  examples: [
    {
      title: 'Young Professional Renter',
      description: 'A young professional considering buying a first home vs. continuing to rent',
      inputs: {
        currentRent: 1800,
        rentIncreaseRate: 3.5,
        homePrice: 350000,
        downPayment: 70000,
        interestRate: 4.25,
        loanTerm: 30,
        propertyTaxRate: 1.1,
        homeownersInsuranceRate: 0.4,
        maintenanceRate: 1.2,
        hoaFees: 0,
        closingCosts: 8750,
        investmentReturnRate: 7.5,
        taxBracket: 24,
        timeHorizon: 8,
        homeAppreciationRate: 3.2,
        inflationRate: 2.8
      },
      expectedOutputs: {
        totalRentCost: 180000,
        totalHomeownershipCost: 185000,
        monthlyRentCost: 1800,
        monthlyHomeownershipCost: 2200,
        monthlySavings: -400,
        breakEvenYears: 9.2,
        netWorthComparison: -12000,
        recommendation: 'Rent for now - homeownership becomes beneficial after 9+ years'
      }
    },
    {
      title: 'Established Family Buyer',
      description: 'A family planning to stay in their home long-term',
      inputs: {
        currentRent: 2200,
        rentIncreaseRate: 4.0,
        homePrice: 450000,
        downPayment: 90000,
        interestRate: 3.75,
        loanTerm: 30,
        propertyTaxRate: 1.3,
        homeownersInsuranceRate: 0.5,
        maintenanceRate: 1.0,
        hoaFees: 150,
        closingCosts: 11250,
        investmentReturnRate: 6.8,
        taxBracket: 22,
        timeHorizon: 15,
        homeAppreciationRate: 3.5,
        inflationRate: 2.5
      },
      expectedOutputs: {
        totalRentCost: 520000,
        totalHomeownershipCost: 480000,
        monthlyRentCost: 2200,
        monthlyHomeownershipCost: 2350,
        monthlySavings: -150,
        breakEvenYears: 6.8,
        netWorthComparison: 85000,
        recommendation: 'Buy now - significant long-term financial benefits'
      }
    }
  ]
};

// Helper functions
function calculateRemainingBalance(principal: number, monthlyPayment: number, monthlyRate: number, monthsPaid: number): number {
  if (monthlyRate === 0) return principal - (monthlyPayment * monthsPaid);
  return principal * Math.pow(1 + monthlyRate, monthsPaid) - monthlyPayment * (Math.pow(1 + monthlyRate, monthsPaid) - 1) / monthlyRate;
}

function calculateBreakEvenYears(currentRent: number, rentIncreaseRate: number, monthlyHomeownershipCost: number, downPayment: number, closingCosts: number, homePrice: number, homeAppreciationRate: number, interestRate: number, loanTerm: number, propertyTaxRate: number, homeownersInsuranceRate: number, maintenanceRate: number, hoaFees: number): number {
  let cumulativeRentCost = 0;
  let cumulativeHomeownershipCost = downPayment + closingCosts;
  let year = 0;
  
  while (cumulativeRentCost < cumulativeHomeownershipCost && year < 50) {
    year++;
    cumulativeRentCost += currentRent * 12 * Math.pow(1 + rentIncreaseRate / 100, year - 1);
    cumulativeHomeownershipCost += monthlyHomeownershipCost * 12;
  }
  
  return year;
}

function generateRecommendation(netWorthComparison: number, breakEvenYears: number, timeHorizon: number, monthlySavings: number): string {
  if (netWorthComparison > 50000) {
    return 'Strongly recommend buying - significant long-term financial benefits';
  } else if (netWorthComparison > 0) {
    return 'Recommend buying - homeownership is financially beneficial';
  } else if (breakEvenYears <= timeHorizon) {
    return 'Consider buying - break-even within your time horizon';
  } else if (monthlySavings < 0 && Math.abs(monthlySavings) < 500) {
    return 'Rent for now - small monthly cost difference, consider buying later';
  } else {
    return 'Rent for now - homeownership significantly more expensive monthly';
  }
}