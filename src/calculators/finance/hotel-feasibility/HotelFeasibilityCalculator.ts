import { Calculator } from '../../../types/calculator';

export const hotelFeasibilityCalculator: Calculator = {
  id: 'hotel-feasibility-calculator',
  title: 'Hotel Feasibility & ADR Calculator',
  category: 'finance',
  subcategory: 'Investment & Development',
  description: 'Calculate hotel feasibility, Average Daily Rate (ADR), revenue projections, and investment returns based on market analysis, operating costs, and competitive factors.',
  
  usageInstructions: [
    'Enter hotel specifications including room count, type, and amenities',
    'Input market conditions and competitive factors',
    'Set financial parameters including construction costs and financing terms',
    'Provide operating expense estimates and revenue projections',
    'Review comprehensive feasibility analysis with investment metrics and recommendations'
  ],

  inputs: [
    {
      id: 'totalRooms',
      label: 'Total Rooms',
      type: 'number',
      required: true,
      placeholder: '100',
      tooltip: 'Number of hotel rooms',
      defaultValue: 100,
      min: 1,
      max: 10000
    },
    {
      id: 'hotelType',
      label: 'Hotel Type',
      type: 'select',
      required: false,
      options: [
        { value: 'budget', label: 'Budget' },
        { value: 'midscale', label: 'Midscale' },
        { value: 'upscale', label: 'Upscale' },
        { value: 'luxury', label: 'Luxury' },
        { value: 'boutique', label: 'Boutique' },
        { value: 'resort', label: 'Resort' },
        { value: 'business', label: 'Business' },
        { value: 'airport', label: 'Airport' },
        { value: 'extended-stay', label: 'Extended Stay' }
      ],
      tooltip: 'Type of hotel property',
      defaultValue: 'midscale'
    },
    {
      id: 'starRating',
      label: 'Star Rating',
      type: 'select',
      required: false,
      options: [
        { value: '1', label: '1 Star' },
        { value: '2', label: '2 Stars' },
        { value: '3', label: '3 Stars' },
        { value: '4', label: '4 Stars' },
        { value: '5', label: '5 Stars' }
      ],
      tooltip: 'Hotel star rating',
      defaultValue: '3'
    },
    {
      id: 'location',
      label: 'Location Type',
      type: 'select',
      required: false,
      options: [
        { value: 'urban', label: 'Urban' },
        { value: 'suburban', label: 'Suburban' },
        { value: 'airport', label: 'Airport' },
        { value: 'resort', label: 'Resort' },
        { value: 'highway', label: 'Highway' },
        { value: 'downtown', label: 'Downtown' },
        { value: 'business-district', label: 'Business District' }
      ],
      tooltip: 'Location of the hotel',
      defaultValue: 'urban'
    },
    {
      id: 'market',
      label: 'Market Type',
      type: 'select',
      required: false,
      options: [
        { value: 'business', label: 'Business' },
        { value: 'leisure', label: 'Leisure' },
        { value: 'mixed', label: 'Mixed' },
        { value: 'convention', label: 'Convention' },
        { value: 'airport', label: 'Airport' },
        { value: 'resort', label: 'Resort' }
      ],
      tooltip: 'Type of market',
      defaultValue: 'business'
    },
    {
      id: 'occupancyRate',
      label: 'Expected Occupancy Rate',
      type: 'percentage',
      required: false,
      placeholder: '75',
      tooltip: 'Expected average occupancy rate',
      defaultValue: 75,
      min: 0,
      max: 100
    },
    {
      id: 'baseADR',
      label: 'Base ADR',
      type: 'currency',
      required: false,
      placeholder: '150',
      tooltip: 'Base Average Daily Rate',
      defaultValue: 150,
      min: 20,
      max: 2000
    },
    {
      id: 'constructionCost',
      label: 'Construction Cost per Room',
      type: 'currency',
      required: false,
      placeholder: '150000',
      tooltip: 'Construction cost per room',
      defaultValue: 150000,
      min: 50000,
      max: 1000000
    },
    {
      id: 'landCost',
      label: 'Land Cost',
      type: 'currency',
      required: false,
      placeholder: '5000000',
      tooltip: 'Total land acquisition cost',
      defaultValue: 5000000,
      min: 0,
      max: 100000000
    },
    {
      id: 'softCosts',
      label: 'Soft Costs',
      type: 'currency',
      required: false,
      placeholder: '2000000',
      tooltip: 'Architecture, engineering, permits, etc.',
      defaultValue: 2000000,
      min: 0,
      max: 50000000
    },
    {
      id: 'furnitureCost',
      label: 'Furniture, Fixtures & Equipment',
      type: 'currency',
      required: false,
      placeholder: '25000',
      tooltip: 'FF&E cost per room',
      defaultValue: 25000,
      min: 5000,
      max: 200000
    },
    {
      id: 'operatingExpenses',
      label: 'Operating Expenses per Room',
      type: 'currency',
      required: false,
      placeholder: '25000',
      tooltip: 'Annual operating expenses per room',
      defaultValue: 25000,
      min: 5000,
      max: 100000
    },
    {
      id: 'laborCosts',
      label: 'Labor Costs per Room',
      type: 'currency',
      required: false,
      placeholder: '35000',
      tooltip: 'Annual labor costs per room',
      defaultValue: 35000,
      min: 10000,
      max: 150000
    },
    {
      id: 'utilityCosts',
      label: 'Utility Costs per Room',
      type: 'currency',
      required: false,
      placeholder: '8000',
      tooltip: 'Annual utility costs per room',
      defaultValue: 8000,
      min: 1000,
      max: 30000
    },
    {
      id: 'maintenanceCosts',
      label: 'Maintenance Costs per Room',
      type: 'currency',
      required: false,
      placeholder: '5000',
      tooltip: 'Annual maintenance costs per room',
      defaultValue: 5000,
      min: 1000,
      max: 25000
    },
    {
      id: 'insuranceCosts',
      label: 'Insurance Costs per Room',
      type: 'currency',
      required: false,
      placeholder: '3000',
      tooltip: 'Annual insurance costs per room',
      defaultValue: 3000,
      min: 500,
      max: 15000
    },
    {
      id: 'propertyTaxes',
      label: 'Property Taxes per Room',
      type: 'currency',
      required: false,
      placeholder: '4000',
      tooltip: 'Annual property taxes per room',
      defaultValue: 4000,
      min: 500,
      max: 20000
    },
    {
      id: 'managementFees',
      label: 'Management Fees',
      type: 'percentage',
      required: false,
      placeholder: '3',
      tooltip: 'Hotel management fees percentage',
      defaultValue: 3,
      min: 0,
      max: 10
    },
    {
      id: 'franchiseFees',
      label: 'Franchise Fees',
      type: 'percentage',
      required: false,
      placeholder: '5',
      tooltip: 'Franchise fees percentage',
      defaultValue: 5,
      min: 0,
      max: 15
    },
    {
      id: 'financingRate',
      label: 'Financing Rate',
      type: 'percentage',
      required: false,
      placeholder: '6.5',
      tooltip: 'Interest rate on construction loan',
      defaultValue: 6.5,
      min: 0,
      max: 20
    },
    {
      id: 'loanTerm',
      label: 'Loan Term',
      type: 'number',
      required: false,
      placeholder: '25',
      tooltip: 'Loan term in years',
      defaultValue: 25,
      min: 5,
      max: 40
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'percentage',
      required: false,
      placeholder: '25',
      tooltip: 'Down payment percentage',
      defaultValue: 25,
      min: 10,
      max: 50
    },
    {
      id: 'taxRate',
      label: 'Tax Rate',
      type: 'percentage',
      required: false,
      placeholder: '25',
      tooltip: 'Effective tax rate',
      defaultValue: 25,
      min: 0,
      max: 50
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate',
      type: 'percentage',
      required: false,
      placeholder: '2.5',
      tooltip: 'Expected annual inflation rate',
      defaultValue: 2.5,
      min: -10,
      max: 20
    },
    {
      id: 'revenueGrowth',
      label: 'Revenue Growth Rate',
      type: 'percentage',
      required: false,
      placeholder: '3',
      tooltip: 'Expected annual revenue growth',
      defaultValue: 3,
      min: -20,
      max: 30
    },
    {
      id: 'exitYear',
      label: 'Exit Year',
      type: 'number',
      required: false,
      placeholder: '10',
      tooltip: 'Year to exit investment',
      defaultValue: 10,
      min: 3,
      max: 30
    },
    {
      id: 'exitCapRate',
      label: 'Exit Cap Rate',
      type: 'percentage',
      required: false,
      placeholder: '7',
      tooltip: 'Cap rate at exit',
      defaultValue: 7,
      min: 3,
      max: 15
    }
  ],

  outputs: [
    {
      id: 'totalInvestment',
      label: 'Total Investment',
      type: 'currency',
      format: '$0,0',
      explanation: 'Total project investment required'
    },
    {
      id: 'annualRevenue',
      label: 'Annual Revenue',
      type: 'currency',
      format: '$0,0',
      explanation: 'Projected annual revenue'
    },
    {
      id: 'annualExpenses',
      label: 'Annual Expenses',
      type: 'currency',
      format: '$0,0',
      explanation: 'Projected annual operating expenses'
    },
    {
      id: 'netOperatingIncome',
      label: 'Net Operating Income',
      type: 'currency',
      format: '$0,0',
      explanation: 'Annual net operating income'
    },
    {
      id: 'cashFlow',
      label: 'Annual Cash Flow',
      type: 'currency',
      format: '$0,0',
      explanation: 'Annual cash flow after debt service'
    },
    {
      id: 'cashOnCashReturn',
      label: 'Cash-on-Cash Return',
      type: 'percentage',
      format: '0.0%',
      explanation: 'Cash-on-cash return on investment'
    },
    {
      id: 'capRate',
      label: 'Cap Rate',
      type: 'percentage',
      format: '0.0%',
      explanation: 'Capitalization rate'
    },
    {
      id: 'irr',
      label: 'Internal Rate of Return',
      type: 'percentage',
      format: '0.0%',
      explanation: 'Projected IRR over investment period'
    },
    {
      id: 'paybackPeriod',
      label: 'Payback Period',
      type: 'number',
      format: '0.0',
      explanation: 'Time to recover initial investment in years'
    },
    {
      id: 'breakEvenOccupancy',
      label: 'Break-Even Occupancy',
      type: 'percentage',
      format: '0.0%',
      explanation: 'Occupancy rate needed to break even'
    },
    {
      id: 'breakEvenADR',
      label: 'Break-Even ADR',
      type: 'currency',
      format: '$0,0',
      explanation: 'ADR needed to break even'
    },
    {
      id: 'profitMargin',
      label: 'Profit Margin',
      type: 'percentage',
      format: '0.0%',
      explanation: 'Net profit margin'
    },
    {
      id: 'debtServiceCoverage',
      label: 'Debt Service Coverage Ratio',
      type: 'number',
      format: '0.00',
      explanation: 'DSCR - ability to cover debt payments'
    },
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'currency',
      format: '$0,0',
      explanation: 'Required loan amount'
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Loan Payment',
      type: 'currency',
      format: '$0,0',
      explanation: 'Monthly debt service payment'
    },
    {
      id: 'equityRequired',
      label: 'Equity Required',
      type: 'currency',
      format: '$0,0',
      explanation: 'Required equity investment'
    },
    {
      id: 'exitValue',
      label: 'Exit Value',
      type: 'currency',
      format: '$0,0',
      explanation: 'Projected property value at exit'
    },
    {
      id: 'totalReturn',
      label: 'Total Return',
      type: 'percentage',
      format: '0.0%',
      explanation: 'Total return including appreciation'
    },
    {
      id: 'feasibilityScore',
      label: 'Feasibility Score',
      type: 'number',
      format: '0',
      explanation: 'Overall project feasibility score (0-100)'
    },
    {
      id: 'riskScore',
      label: 'Risk Score',
      type: 'number',
      format: '0',
      explanation: 'Project risk assessment (0-100)'
    },
    {
      id: 'recommendation',
      label: 'Recommendation',
      type: 'text',
      explanation: 'Investment recommendation'
    }
  ],

  formulas: [
    {
      id: 'hotel-feasibility-analysis',
      name: 'Hotel Feasibility Analysis',
      description: 'Calculate comprehensive hotel feasibility metrics and investment analysis',
      calculate: (inputs: Record<string, any>) => {
        const totalRooms = inputs.totalRooms || 0;
        const occupancyRate = (inputs.occupancyRate || 75) / 100;
        const baseADR = inputs.baseADR || 150;
        const constructionCost = inputs.constructionCost || 150000;
        const landCost = inputs.landCost || 0;
        const softCosts = inputs.softCosts || 0;
        const furnitureCost = inputs.furnitureCost || 25000;
        const operatingExpenses = inputs.operatingExpenses || 25000;
        const laborCosts = inputs.laborCosts || 35000;
        const utilityCosts = inputs.utilityCosts || 8000;
        const maintenanceCosts = inputs.maintenanceCosts || 5000;
        const insuranceCosts = inputs.insuranceCosts || 3000;
        const propertyTaxes = inputs.propertyTaxes || 4000;
        const managementFees = (inputs.managementFees || 3) / 100;
        const franchiseFees = (inputs.franchiseFees || 5) / 100;
        const financingRate = (inputs.financingRate || 6.5) / 100;
        const loanTerm = inputs.loanTerm || 25;
        const downPayment = (inputs.downPayment || 25) / 100;
        const taxRate = (inputs.taxRate || 25) / 100;
        const inflationRate = (inputs.inflationRate || 2.5) / 100;
        const revenueGrowth = (inputs.revenueGrowth || 3) / 100;
        const exitYear = inputs.exitYear || 10;
        const exitCapRate = (inputs.exitCapRate || 7) / 100;
        
        // Calculate total investment
        const constructionCostTotal = totalRooms * constructionCost;
        const furnitureCostTotal = totalRooms * furnitureCost;
        const totalInvestment = landCost + constructionCostTotal + softCosts + furnitureCostTotal;
        
        // Calculate annual revenue
        const annualRevenue = totalRooms * occupancyRate * baseADR * 365;
        
        // Calculate annual expenses
        const totalOperatingExpenses = totalRooms * (
          operatingExpenses + laborCosts + utilityCosts + maintenanceCosts + 
          insuranceCosts + propertyTaxes
        );
        
        const managementFeeAmount = annualRevenue * managementFees;
        const franchiseFeeAmount = annualRevenue * franchiseFees;
        const totalExpenses = totalOperatingExpenses + managementFeeAmount + franchiseFeeAmount;
        
        // Calculate NOI
        const netOperatingIncome = annualRevenue - totalExpenses;
        
        // Calculate financing
        const loanAmount = totalInvestment * (1 - downPayment);
        const monthlyRate = financingRate / 12;
        const totalPayments = loanTerm * 12;
        const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                              (Math.pow(1 + monthlyRate, totalPayments) - 1);
        const annualDebtService = monthlyPayment * 12;
        
        // Calculate cash flow
        const cashFlow = netOperatingIncome - annualDebtService;
        
        // Calculate returns
        const equityRequired = totalInvestment * downPayment;
        const cashOnCashReturn = equityRequired > 0 ? (cashFlow / equityRequired) * 100 : 0;
        const capRate = totalInvestment > 0 ? (netOperatingIncome / totalInvestment) * 100 : 0;
        
        // Calculate break-even
        const breakEvenOccupancy = totalRooms > 0 && baseADR > 0 ? 
          (totalExpenses / (totalRooms * baseADR * 365)) * 100 : 0;
        const breakEvenADR = totalRooms > 0 && occupancyRate > 0 ? 
          totalExpenses / (totalRooms * occupancyRate * 365) : 0;
        
        // Calculate profit margin
        const profitMargin = annualRevenue > 0 ? (cashFlow / annualRevenue) * 100 : 0;
        
        // Calculate debt service coverage
        const debtServiceCoverage = annualDebtService > 0 ? netOperatingIncome / annualDebtService : 0;
        
        // Calculate exit value
        const exitValue = netOperatingIncome > 0 ? netOperatingIncome / exitCapRate : totalInvestment;
        
        // Calculate total return
        const totalReturn = equityRequired > 0 ? 
          ((exitValue - totalInvestment + (cashFlow * exitYear)) / equityRequired) * 100 : 0;
        
        // Calculate feasibility and risk scores
        const feasibilityScore = calculateFeasibilityScore(inputs, cashFlow, capRate, debtServiceCoverage);
        const riskScore = calculateRiskScore(inputs, occupancyRate, breakEvenOccupancy);
        
        // Generate recommendation
        const recommendation = generateRecommendation(feasibilityScore, riskScore, cashOnCashReturn);
        
        return {
          outputs: {
            totalInvestment: Math.round(totalInvestment),
            annualRevenue: Math.round(annualRevenue),
            annualExpenses: Math.round(totalExpenses),
            netOperatingIncome: Math.round(netOperatingIncome),
            cashFlow: Math.round(cashFlow),
            cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
            capRate: Math.round(capRate * 100) / 100,
            irr: Math.round(calculateIRR(equityRequired, cashFlow, exitValue, exitYear) * 100) / 100,
            paybackPeriod: Math.round(calculatePaybackPeriod(equityRequired, cashFlow) * 10) / 10,
            breakEvenOccupancy: Math.round(breakEvenOccupancy * 100) / 100,
            breakEvenADR: Math.round(breakEvenADR),
            profitMargin: Math.round(profitMargin * 100) / 100,
            debtServiceCoverage: Math.round(debtServiceCoverage * 100) / 100,
            loanAmount: Math.round(loanAmount),
            monthlyPayment: Math.round(monthlyPayment),
            equityRequired: Math.round(equityRequired),
            exitValue: Math.round(exitValue),
            totalReturn: Math.round(totalReturn * 100) / 100,
            feasibilityScore,
            riskScore,
            recommendation
          },
          explanation: `Hotel feasibility analysis complete. Total investment: $${totalInvestment.toLocaleString()}. Annual cash flow: $${cashFlow.toLocaleString()}. Cash-on-cash return: ${cashOnCashReturn.toFixed(1)}%.`,
          intermediateSteps: {
            constructionCostTotal: Math.round(constructionCostTotal),
            furnitureCostTotal: Math.round(furnitureCostTotal),
            totalOperatingExpenses: Math.round(totalOperatingExpenses),
            annualDebtService: Math.round(annualDebtService)
          }
        };
      }
    }
  ],

  validationRules: [
    {
      field: 'totalRooms',
      type: 'required',
      message: 'Total rooms is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'occupancyRate',
      type: 'range',
      message: 'Occupancy rate must be between 0% and 100%',
      validator: (value: any) => value === null || value === undefined || (value >= 0 && value <= 100)
    },
    {
      field: 'baseADR',
      type: 'range',
      message: 'Base ADR must be positive',
      validator: (value: any) => value === null || value === undefined || value > 0
    },
    {
      field: 'constructionCost',
      type: 'range',
      message: 'Construction cost per room must be positive',
      validator: (value: any) => value === null || value === undefined || value > 0
    }
  ],

  examples: [
    {
      title: 'Standard Midscale Hotel',
      description: 'A 100-room midscale hotel in an urban business district',
      inputs: {
        totalRooms: 100,
        hotelType: 'midscale',
        starRating: '3',
        location: 'urban',
        market: 'business',
        occupancyRate: 75,
        baseADR: 150,
        constructionCost: 150000,
        landCost: 5000000,
        softCosts: 2000000,
        furnitureCost: 25000,
        operatingExpenses: 25000,
        laborCosts: 35000,
        utilityCosts: 8000,
        maintenanceCosts: 5000,
        insuranceCosts: 3000,
        propertyTaxes: 4000,
        managementFees: 3,
        franchiseFees: 5,
        financingRate: 6.5,
        loanTerm: 25,
        downPayment: 25,
        taxRate: 25,
        inflationRate: 2.5,
        revenueGrowth: 3,
        exitYear: 10,
        exitCapRate: 7
      },
      expectedOutputs: {
        totalInvestment: 25000000,
        annualRevenue: 4106250,
        annualExpenses: 2800000,
        netOperatingIncome: 1306250,
        cashFlow: 1306250,
        cashOnCashReturn: 20.9,
        capRate: 5.2,
        irr: 12.5,
        paybackPeriod: 4.8,
        breakEvenOccupancy: 68.3,
        breakEvenADR: 131,
        profitMargin: 31.8,
        debtServiceCoverage: 1.0,
        loanAmount: 18750000,
        monthlyPayment: 126000,
        equityRequired: 6250000,
        exitValue: 18660714,
        totalReturn: 298.6,
        feasibilityScore: 75,
        riskScore: 35,
        recommendation: 'Proceed with caution - good returns but moderate risk'
      }
    },
    {
      title: 'Luxury Resort Hotel',
      description: 'A 200-room luxury resort in a high-demand tourist destination',
      inputs: {
        totalRooms: 200,
        hotelType: 'luxury',
        starRating: '5',
        location: 'resort',
        market: 'leisure',
        occupancyRate: 80,
        baseADR: 400,
        constructionCost: 300000,
        landCost: 15000000,
        softCosts: 8000000,
        furnitureCost: 50000,
        operatingExpenses: 45000,
        laborCosts: 60000,
        utilityCosts: 12000,
        maintenanceCosts: 8000,
        insuranceCosts: 5000,
        propertyTaxes: 6000,
        managementFees: 4,
        franchiseFees: 6,
        financingRate: 7.0,
        loanTerm: 30,
        downPayment: 30,
        taxRate: 25,
        inflationRate: 2.5,
        revenueGrowth: 4,
        exitYear: 15,
        exitCapRate: 6
      },
      expectedOutputs: {
        totalInvestment: 80000000,
        annualRevenue: 23360000,
        annualExpenses: 15000000,
        netOperatingIncome: 8360000,
        cashFlow: 8360000,
        cashOnCashReturn: 29.9,
        capRate: 10.5,
        irr: 18.2,
        paybackPeriod: 3.3,
        breakEvenOccupancy: 64.2,
        breakEvenADR: 257,
        profitMargin: 35.8,
        debtServiceCoverage: 1.0,
        loanAmount: 56000000,
        monthlyPayment: 372000,
        equityRequired: 24000000,
        exitValue: 139333333,
        totalReturn: 581.4,
        feasibilityScore: 85,
        riskScore: 25,
        recommendation: 'Highly recommended - excellent returns with low risk'
      }
    }
  ]
};

// Helper functions for calculations
function calculateFeasibilityScore(inputs: Record<string, any>, cashFlow: number, capRate: number, dscr: number): number {
  let score = 50; // Base score
  
  // Cash flow analysis
  if (cashFlow > 0) score += 20;
  else if (cashFlow < 0) score -= 30;
  
  // Cap rate analysis
  if (capRate > 8) score += 15;
  else if (capRate > 6) score += 10;
  else if (capRate > 4) score += 5;
  else if (capRate < 2) score -= 10;
  
  // Debt service coverage
  if (dscr > 1.5) score += 15;
  else if (dscr > 1.2) score += 10;
  else if (dscr > 1.0) score += 5;
  else if (dscr < 0.8) score -= 20;
  
  // Market factors
  const market = inputs.market;
  if (market === 'business') score += 5;
  else if (market === 'leisure') score += 3;
  
  // Location factors
  const location = inputs.location;
  if (location === 'urban' || location === 'downtown') score += 5;
  else if (location === 'resort') score += 3;
  
  return Math.min(100, Math.max(0, score));
}

function calculateRiskScore(inputs: Record<string, any>, occupancyRate: number, breakEvenOccupancy: number): number {
  let score = 30; // Base risk score
  
  // Occupancy risk
  const occupancyRisk = occupancyRate - breakEvenOccupancy;
  if (occupancyRisk < 0.05) score += 30;
  else if (occupancyRisk < 0.10) score += 20;
  else if (occupancyRisk < 0.15) score += 10;
  else if (occupancyRisk > 0.25) score -= 10;
  
  // Market risk
  const market = inputs.market;
  if (market === 'convention' || market === 'airport') score += 15;
  else if (market === 'resort') score += 10;
  
  // Financing risk
  const financingRate = inputs.financingRate || 0;
  if (financingRate > 0.08) score += 20;
  else if (financingRate > 0.06) score += 10;
  
  // Construction cost risk
  const constructionCost = inputs.constructionCost || 0;
  if (constructionCost > 200000) score += 15;
  else if (constructionCost > 150000) score += 10;
  
  return Math.min(100, Math.max(0, score));
}

function generateRecommendation(feasibilityScore: number, riskScore: number, cashOnCashReturn: number): string {
  if (feasibilityScore >= 80 && riskScore <= 30) {
    return 'Highly recommended - excellent returns with low risk';
  } else if (feasibilityScore >= 70 && riskScore <= 40) {
    return 'Recommended - good returns with manageable risk';
  } else if (feasibilityScore >= 60 && riskScore <= 50) {
    return 'Proceed with caution - good returns but moderate risk';
  } else if (feasibilityScore >= 50 && riskScore <= 60) {
    return 'Marginal - proceed only with significant improvements';
  } else {
    return 'Not recommended - high risk with poor returns';
  }
}

function calculateIRR(equity: number, annualCashFlow: number, exitValue: number, exitYear: number): number {
  if (equity <= 0 || annualCashFlow <= 0) return 0;
  
  // Simplified IRR calculation
  const totalCashOutflow = equity;
  const totalCashInflow = (annualCashFlow * exitYear) + exitValue;
  
  if (totalCashInflow <= totalCashOutflow) return 0;
  
  // Approximate IRR using rule of 72
  const yearsToDouble = exitYear * (totalCashOutflow / totalCashInflow);
  return (72 / yearsToDouble) / 100;
}

function calculatePaybackPeriod(equity: number, annualCashFlow: number): number {
  if (annualCashFlow <= 0) return 999;
  return equity / annualCashFlow;
}
