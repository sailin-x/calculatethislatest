import { Calculator } from '@/lib/Calculator';
import { MortgageAPRComparisonInputs, MortgageAPRComparisonResults } from './types';
import { calculateAPR } from './formulas';

export class MortgageAPRComparisonCalculator extends Calculator<
  MortgageAPRComparisonInputs,
  MortgageAPRComparisonResults
> {
  name = 'Mortgage APR Comparison Calculator';
  description = 'Compare mortgage offers by calculating their true Annual Percentage Rate (APR) including all closing costs and fees.';
  category = 'Finance';
  inputs = {
    loanAmount: {
      type: 'number',
      label: 'Loan Amount ($)',
      placeholder: '300000',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
    },
    loanTerm: {
      type: 'select',
      label: 'Loan Term',
      options: [
        { value: '15', label: '15 years' },
        { value: '20', label: '20 years' },
        { value: '30', label: '30 years' },
      ],
      required: true,
      defaultValue: '30',
    },
    // Mortgage Offer 1
    offer1Name: {
      type: 'text',
      label: 'Offer 1 Name',
      placeholder: 'Bank A 30yr Fixed',
      required: true,
    },
    offer1InterestRate: {
      type: 'number',
      label: 'Offer 1 Interest Rate (%)',
      placeholder: '6.5',
      required: true,
      min: 0.1,
      max: 20,
      step: 0.01,
    },
    offer1ClosingCosts: {
      type: 'number',
      label: 'Offer 1 Closing Costs ($)',
      placeholder: '5000',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
    },
    offer1Points: {
      type: 'number',
      label: 'Offer 1 Points ($)',
      placeholder: '2000',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
    },
    // Mortgage Offer 2
    offer2Name: {
      type: 'text',
      label: 'Offer 2 Name',
      placeholder: 'Credit Union 30yr Fixed',
      required: true,
    },
    offer2InterestRate: {
      type: 'number',
      label: 'Offer 2 Interest Rate (%)',
      placeholder: '6.25',
      required: true,
      min: 0.1,
      max: 20,
      step: 0.01,
    },
    offer2ClosingCosts: {
      type: 'number',
      label: 'Offer 2 Closing Costs ($)',
      placeholder: '3000',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
    },
    offer2Points: {
      type: 'number',
      label: 'Offer 2 Points ($)',
      placeholder: '1000',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
    },
    // Mortgage Offer 3 (Optional)
    offer3Name: {
      type: 'text',
      label: 'Offer 3 Name (Optional)',
      placeholder: 'Online Lender 30yr Fixed',
      required: false,
    },
    offer3InterestRate: {
      type: 'number',
      label: 'Offer 3 Interest Rate (%)',
      placeholder: '6.0',
      required: false,
      min: 0.1,
      max: 20,
      step: 0.01,
    },
    offer3ClosingCosts: {
      type: 'number',
      label: 'Offer 3 Closing Costs ($)',
      placeholder: '4000',
      required: false,
      min: 0,
      max: 50000,
      step: 100,
    },
    offer3Points: {
      type: 'number',
      label: 'Offer 3 Points ($)',
      placeholder: '1500',
      required: false,
      min: 0,
      max: 10000,
      step: 100,
    },
  };

  outputs = {
    offer1APR: {
      type: 'number',
      label: 'Offer 1 APR (%)',
      formatter: (value: number) => `${value.toFixed(3)}%`,
    },
    offer1MonthlyPayment: {
      type: 'number',
      label: 'Offer 1 Monthly Payment ($)',
      formatter: (value: number) => `$${value.toFixed(2)}`,
    },
    offer1TotalCost: {
      type: 'number',
      label: 'Offer 1 Total Cost ($)',
      formatter: (value: number) => `$${value.toLocaleString()}`,
    },
    offer2APR: {
      type: 'number',
      label: 'Offer 2 APR (%)',
      formatter: (value: number) => `${value.toFixed(3)}%`,
    },
    offer2MonthlyPayment: {
      type: 'number',
      label: 'Offer 2 Monthly Payment ($)',
      formatter: (value: number) => `$${value.toFixed(2)}`,
    },
    offer2TotalCost: {
      type: 'number',
      label: 'Offer 2 Total Cost ($)',
      formatter: (value: number) => `$${value.toLocaleString()}`,
    },
    offer3APR: {
      type: 'number',
      label: 'Offer 3 APR (%)',
      formatter: (value: number) => `${value.toFixed(3)}%`,
    },
    offer3MonthlyPayment: {
      type: 'number',
      label: 'Offer 3 Monthly Payment ($)',
      formatter: (value: number) => `$${value.toFixed(2)}`,
    },
    offer3TotalCost: {
      type: 'number',
      label: 'Offer 3 Total Cost ($)',
      formatter: (value: number) => `$${value.toLocaleString()}`,
    },
    bestOffer: {
      type: 'text',
      label: 'Best Offer (Lowest APR)',
    },
    savings: {
      type: 'number',
      label: 'Potential Monthly Savings ($)',
      formatter: (value: number) => `$${value.toFixed(2)}`,
    },
    totalSavings: {
      type: 'number',
      label: 'Potential Total Savings ($)',
      formatter: (value: number) => `$${value.toLocaleString()}`,
    },
  };

  examples = [
    {
      name: 'Compare Three Mortgage Offers',
      inputs: {
        loanAmount: 400000,
        loanTerm: '30',
        offer1Name: 'Bank A',
        offer1InterestRate: 6.5,
        offer1ClosingCosts: 5000,
        offer1Points: 2000,
        offer2Name: 'Credit Union',
        offer2InterestRate: 6.25,
        offer2ClosingCosts: 3000,
        offer2Points: 1000,
        offer3Name: 'Online Lender',
        offer3InterestRate: 6.0,
        offer3ClosingCosts: 4000,
        offer3Points: 1500,
      },
    },
  ];

  calculate(inputs: MortgageAPRComparisonInputs): MortgageAPRComparisonResults {
    const loanTermYears = parseInt(inputs.loanTerm);
    const loanTermMonths = loanTermYears * 12;

    // Calculate Offer 1
    const offer1APR = calculateAPR(
      inputs.loanAmount,
      inputs.offer1InterestRate / 100,
      loanTermMonths,
      inputs.offer1ClosingCosts + inputs.offer1Points
    );

    const offer1MonthlyRate = inputs.offer1InterestRate / 100 / 12;
    const offer1MonthlyPayment = (inputs.loanAmount * offer1MonthlyRate * Math.pow(1 + offer1MonthlyRate, loanTermMonths)) /
      (Math.pow(1 + offer1MonthlyRate, loanTermMonths) - 1);

    const offer1TotalCost = (offer1MonthlyPayment * loanTermMonths) + inputs.offer1ClosingCosts + inputs.offer1Points;

    // Calculate Offer 2
    const offer2APR = calculateAPR(
      inputs.loanAmount,
      inputs.offer2InterestRate / 100,
      loanTermMonths,
      inputs.offer2ClosingCosts + inputs.offer2Points
    );

    const offer2MonthlyRate = inputs.offer2InterestRate / 100 / 12;
    const offer2MonthlyPayment = (inputs.loanAmount * offer2MonthlyRate * Math.pow(1 + offer2MonthlyRate, loanTermMonths)) /
      (Math.pow(1 + offer2MonthlyRate, loanTermMonths) - 1);

    const offer2TotalCost = (offer2MonthlyPayment * loanTermMonths) + inputs.offer2ClosingCosts + inputs.offer2Points;

    // Calculate Offer 3 (if provided)
    let offer3APR = 0;
    let offer3MonthlyPayment = 0;
    let offer3TotalCost = 0;

    if (inputs.offer3Name && inputs.offer3InterestRate && inputs.offer3ClosingCosts !== undefined && inputs.offer3Points !== undefined) {
      offer3APR = calculateAPR(
        inputs.loanAmount,
        inputs.offer3InterestRate / 100,
        loanTermMonths,
        inputs.offer3ClosingCosts + inputs.offer3Points
      );

      const offer3MonthlyRate = inputs.offer3InterestRate / 100 / 12;
      offer3MonthlyPayment = (inputs.loanAmount * offer3MonthlyRate * Math.pow(1 + offer3MonthlyRate, loanTermMonths)) /
        (Math.pow(1 + offer3MonthlyRate, loanTermMonths) - 1);

      offer3TotalCost = (offer3MonthlyPayment * loanTermMonths) + inputs.offer3ClosingCosts + inputs.offer3Points;
    }

    // Determine best offer
    const offers = [
      { name: inputs.offer1Name, apr: offer1APR, monthly: offer1MonthlyPayment },
      { name: inputs.offer2Name, apr: offer2APR, monthly: offer2MonthlyPayment },
    ];

    if (offer3APR > 0) {
      offers.push({ name: inputs.offer3Name!, apr: offer3APR, monthly: offer3MonthlyPayment });
    }

    const bestOffer = offers.reduce((best, current) => current.apr < best.apr ? current : best);

    // Calculate savings compared to worst offer
    const worstOffer = offers.reduce((worst, current) => current.apr > worst.apr ? current : worst);
    const monthlySavings = worstOffer.monthly - bestOffer.monthly;
    const totalSavings = (worstOffer.monthly - bestOffer.monthly) * loanTermMonths;

    return {
      offer1APR: offer1APR * 100,
      offer1MonthlyPayment,
      offer1TotalCost,
      offer2APR: offer2APR * 100,
      offer2MonthlyPayment,
      offer2TotalCost,
      offer3APR: offer3APR * 100,
      offer3MonthlyPayment,
      offer3TotalCost,
      bestOffer: bestOffer.name,
      savings: monthlySavings,
      totalSavings,
    };
  }
}
