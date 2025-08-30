import { Calculator } from '@/types/calculator';
import { RealEstateDevelopmentProFormaCalculator } from './RealEstateDevelopmentProFormaCalculator';

export const realEstateDevelopmentProFormaCalculator: Calculator = {
  id: 'real-estate-development-pro-forma',
  name: 'Real Estate Development Pro-Forma Calculator',
  description: 'Comprehensive pro-forma analysis for real estate development projects including construction costs, revenue projections, financing analysis, risk assessment, and investment returns.',
  category: 'finance',
  tags: [
    'real-estate-development',
    'pro-forma',
    'construction-analysis',
    'development-financing',
    'irr',
    'npv',
    'cash-flow-projection',
    'risk-assessment',
    'break-even-analysis',
    'sensitivity-analysis',
    'stress-testing',
    'investment-analysis',
    'construction-costs',
    'revenue-projection',
    'market-analysis',
    'exit-strategy',
    'equity-returns',
    'debt-financing',
    'construction-timeline',
    'lease-up-analysis'
  ],
  component: RealEstateDevelopmentProFormaCalculator,
  inputs: {
    projectName: {
      type: 'string',
      label: 'Project Name',
      description: 'Name of the development project',
      required: true,
      placeholder: 'Enter project name'
    },
    projectType: {
      type: 'select',
      label: 'Project Type',
      description: 'Type of real estate development project',
      required: true,
      options: [
        { value: 'residential', label: 'Residential' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'mixed-use', label: 'Mixed-Use' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'retail', label: 'Retail' },
        { value: 'office', label: 'Office' },
        { value: 'hotel', label: 'Hotel' },
        { value: 'multifamily', label: 'Multifamily' },
        { value: 'single-family', label: 'Single Family' },
        { value: 'land-development', label: 'Land Development' }
      ]
    },
    projectPhase: {
      type: 'select',
      label: 'Project Phase',
      description: 'Current phase of the development project',
      required: true,
      options: [
        { value: 'concept', label: 'Concept' },
        { value: 'feasibility', label: 'Feasibility' },
        { value: 'design', label: 'Design' },
        { value: 'permitting', label: 'Permitting' },
        { value: 'construction', label: 'Construction' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'stabilization', label: 'Stabilization' },
        { value: 'operation', label: 'Operation' }
      ]
    },
    projectLocation: {
      type: 'string',
      label: 'Project Location',
      description: 'Location of the development project',
      required: true,
      placeholder: 'Enter project location'
    },
    projectSize: {
      type: 'number',
      label: 'Project Size (sq ft)',
      description: 'Total square footage of the development',
      required: true,
      min: 1,
      max: 10000000,
      step: 1000,
      placeholder: '50000'
    },
    landSize: {
      type: 'number',
      label: 'Land Size (acres)',
      description: 'Size of the land parcel in acres',
      required: true,
      min: 0.1,
      max: 10000,
      step: 0.1,
      placeholder: '5'
    },
    constructionCost: {
      type: 'number',
      label: 'Construction Cost ($/sq ft)',
      description: 'Construction cost per square foot',
      required: true,
      min: 50,
      max: 2000,
      step: 10,
      placeholder: '200'
    },
    landCost: {
      type: 'number',
      label: 'Land Cost',
      description: 'Total cost of land acquisition',
      required: true,
      min: 0,
      max: 1000000000,
      step: 10000,
      placeholder: '1000000'
    },
    loanAmount: {
      type: 'number',
      label: 'Loan Amount',
      description: 'Total loan amount for the project',
      required: true,
      min: 0,
      max: 1000000000,
      step: 100000,
      placeholder: '8000000'
    },
    interestRate: {
      type: 'number',
      label: 'Interest Rate (%)',
      description: 'Annual interest rate on the loan',
      required: true,
      min: 0,
      max: 25,
      step: 0.1,
      placeholder: '6.5'
    },
    equityContribution: {
      type: 'number',
      label: 'Equity Contribution',
      description: 'Total equity investment required',
      required: true,
      min: 0,
      max: 1000000000,
      step: 100000,
      placeholder: '3000000'
    },
    marketRent: {
      type: 'number',
      label: 'Market Rent ($/sq ft)',
      description: 'Market rental rate per square foot',
      required: true,
      min: 0.5,
      max: 100,
      step: 0.1,
      placeholder: '2.5'
    },
    marketCapRate: {
      type: 'number',
      label: 'Market Cap Rate (%)',
      description: 'Market capitalization rate',
      required: true,
      min: 3,
      max: 12,
      step: 0.1,
      placeholder: '6'
    },
    constructionDuration: {
      type: 'number',
      label: 'Construction Duration (months)',
      description: 'Expected construction timeline in months',
      required: true,
      min: 6,
      max: 120,
      step: 1,
      placeholder: '18'
    },
    holdPeriod: {
      type: 'number',
      label: 'Hold Period (years)',
      description: 'Expected hold period for the investment',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '5'
    },
    discountRate: {
      type: 'number',
      label: 'Discount Rate (%)',
      description: 'Discount rate for NPV calculations',
      required: true,
      min: 1,
      max: 50,
      step: 0.5,
      placeholder: '10'
    },
    vacancyRate: {
      type: 'number',
      label: 'Vacancy Rate (%)',
      description: 'Expected vacancy rate during operation',
      required: true,
      min: 0,
      max: 50,
      step: 0.5,
      placeholder: '5'
    },
    constructionRisk: {
      type: 'number',
      label: 'Construction Risk (1-10)',
      description: 'Risk level for construction delays and cost overruns',
      required: true,
      min: 1,
      max: 10,
      step: 1,
      placeholder: '5'
    },
    marketRisk: {
      type: 'number',
      label: 'Market Risk (1-10)',
      description: 'Risk level for market conditions and demand',
      required: true,
      min: 1,
      max: 10,
      step: 1,
      placeholder: '4'
    },
    financingRisk: {
      type: 'number',
      label: 'Financing Risk (1-10)',
      description: 'Risk level for financing availability and terms',
      required: true,
      min: 1,
      max: 10,
      step: 1,
      placeholder: '3'
    },
    exitStrategy: {
      type: 'select',
      label: 'Exit Strategy',
      description: 'Primary exit strategy for the investment',
      required: true,
      options: [
        { value: 'sale', label: 'Sale' },
        { value: 'refinance', label: 'Refinance' },
        { value: 'hold', label: 'Hold' },
        { value: 'partial-sale', label: 'Partial Sale' },
        { value: '1031-exchange', label: '1031 Exchange' }
      ]
    }
  },
  outputs: {
    metrics: {
      type: 'object',
      label: 'Development Metrics',
      description: 'Key financial metrics for the development project',
      schema: {
        totalProjectCost: { type: 'number', label: 'Total Project Cost' },
        totalRevenue: { type: 'number', label: 'Total Revenue' },
        totalProfit: { type: 'number', label: 'Total Profit' },
        profitMargin: { type: 'number', label: 'Profit Margin (%)' },
        internalRateOfReturn: { type: 'number', label: 'IRR (%)' },
        netPresentValue: { type: 'number', label: 'NPV' },
        returnOnEquity: { type: 'number', label: 'Return on Equity (%)' },
        equityMultiple: { type: 'number', label: 'Equity Multiple' },
        paybackPeriod: { type: 'number', label: 'Payback Period (years)' },
        breakEvenOccupancy: { type: 'number', label: 'Break-Even Occupancy (%)' },
        cashOnCashReturn: { type: 'number', label: 'Cash on Cash Return (%)' },
        debtServiceCoverageRatio: { type: 'number', label: 'Debt Service Coverage Ratio' },
        loanToCostRatio: { type: 'number', label: 'Loan to Cost Ratio (%)' },
        riskRating: { type: 'string', label: 'Risk Rating' }
      }
    },
    analysis: {
      type: 'object',
      label: 'Project Analysis',
      description: 'Comprehensive analysis of project viability and risks',
      schema: {
        projectViability: { type: 'string', label: 'Project Viability' },
        viabilityScore: { type: 'number', label: 'Viability Score (1-100)' },
        keyStrengths: { type: 'array', label: 'Key Strengths', items: { type: 'string' } },
        keyRisks: { type: 'array', label: 'Key Risks', items: { type: 'string' } },
        recommendations: { type: 'array', label: 'Recommendations', items: { type: 'string' } },
        financialSummary: { type: 'string', label: 'Financial Summary' },
        cashFlowAnalysis: { type: 'string', label: 'Cash Flow Analysis' },
        returnAnalysis: { type: 'string', label: 'Return Analysis' },
        riskAnalysis: { type: 'string', label: 'Risk Analysis' },
        marketAnalysis: { type: 'string', label: 'Market Analysis' }
      }
    },
    cashFlowProjections: {
      type: 'array',
      label: 'Cash Flow Projections',
      description: 'Monthly cash flow projections throughout the project timeline',
      items: {
        type: 'object',
        schema: {
          period: { type: 'string', label: 'Period' },
          date: { type: 'string', label: 'Date' },
          constructionCosts: { type: 'number', label: 'Construction Costs' },
          revenue: { type: 'number', label: 'Revenue' },
          operatingExpenses: { type: 'number', label: 'Operating Expenses' },
          debtService: { type: 'number', label: 'Debt Service' },
          cashFlow: { type: 'number', label: 'Cash Flow' },
          cumulativeCashFlow: { type: 'number', label: 'Cumulative Cash Flow' },
          occupancy: { type: 'number', label: 'Occupancy (%)' },
          noi: { type: 'number', label: 'Net Operating Income' }
        }
      }
    },
    sensitivityResults: {
      type: 'array',
      label: 'Sensitivity Analysis',
      description: 'Results of sensitivity analysis under different scenarios',
      items: {
        type: 'object',
        schema: {
          scenario: { type: 'string', label: 'Scenario' },
          npv: { type: 'number', label: 'NPV' },
          irr: { type: 'number', label: 'IRR (%)' },
          profitMargin: { type: 'number', label: 'Profit Margin (%)' },
          breakEvenOccupancy: { type: 'number', label: 'Break-Even Occupancy (%)' },
          impact: { type: 'string', label: 'Impact' }
        }
      }
    },
    stressTestResults: {
      type: 'array',
      label: 'Stress Test Results',
      description: 'Results of stress testing under adverse conditions',
      items: {
        type: 'object',
        schema: {
          test: { type: 'string', label: 'Test Name' },
          npv: { type: 'number', label: 'NPV' },
          irr: { type: 'number', label: 'IRR (%)' },
          cashFlow: { type: 'number', label: 'Cash Flow' },
          survivability: { type: 'string', label: 'Survivability' },
          description: { type: 'string', label: 'Description' }
        }
      }
    },
    breakEvenAnalysis: {
      type: 'object',
      label: 'Break-Even Analysis',
      description: 'Break-even analysis for occupancy and rent levels',
      schema: {
        breakEvenOccupancy: { type: 'number', label: 'Break-Even Occupancy (%)' },
        breakEvenRent: { type: 'number', label: 'Break-Even Rent ($/sq ft)' },
        breakEvenTimeline: { type: 'number', label: 'Break-Even Timeline (months)' },
        marginOfSafety: { type: 'number', label: 'Margin of Safety (%)' },
        sensitivityToRent: { type: 'number', label: 'Sensitivity to Rent' },
        sensitivityToCosts: { type: 'number', label: 'Sensitivity to Costs' }
      }
    },
    investmentSummary: {
      type: 'object',
      label: 'Investment Summary',
      description: 'Summary of investment requirements and expected returns',
      schema: {
        totalInvestment: { type: 'number', label: 'Total Investment' },
        expectedReturn: { type: 'number', label: 'Expected Return (%)' },
        timeline: { type: 'number', label: 'Timeline (years)' },
        riskLevel: { type: 'string', label: 'Risk Level' },
        summary: { type: 'string', label: 'Summary' }
      }
    },
    riskAssessment: {
      type: 'object',
      label: 'Risk Assessment',
      description: 'Detailed assessment of project risks and mitigation strategies',
      schema: {
        overallRisk: { type: 'string', label: 'Overall Risk' },
        constructionRisk: { type: 'object', label: 'Construction Risk' },
        marketRisk: { type: 'object', label: 'Market Risk' },
        financingRisk: { type: 'object', label: 'Financing Risk' },
        regulatoryRisk: { type: 'object', label: 'Regulatory Risk' },
        environmentalRisk: { type: 'object', label: 'Environmental Risk' }
      }
    },
    recommendations: {
      type: 'array',
      label: 'Recommendations',
      description: 'Strategic recommendations for project optimization',
      items: { type: 'string' }
    },
    keyMetrics: {
      type: 'object',
      label: 'Key Metrics',
      description: 'Summary of key performance indicators',
      schema: {
        totalProjectCost: { type: 'number', label: 'Total Project Cost' },
        totalRevenue: { type: 'number', label: 'Total Revenue' },
        totalProfit: { type: 'number', label: 'Total Profit' },
        irr: { type: 'number', label: 'IRR (%)' },
        npv: { type: 'number', label: 'NPV' },
        profitMargin: { type: 'number', label: 'Profit Margin (%)' },
        returnOnEquity: { type: 'number', label: 'Return on Equity (%)' },
        equityMultiple: { type: 'number', label: 'Equity Multiple' },
        paybackPeriod: { type: 'number', label: 'Payback Period (years)' },
        breakEvenOccupancy: { type: 'number', label: 'Break-Even Occupancy (%)' }
      }
    }
  },
  features: [
    'Comprehensive pro-forma analysis for real estate development projects',
    'Construction cost estimation and timeline planning',
    'Revenue projection and cash flow modeling',
    'Financing analysis with debt and equity structuring',
    'Risk assessment across multiple risk categories',
    'Sensitivity analysis for key variables',
    'Stress testing under adverse conditions',
    'Break-even analysis for occupancy and rent levels',
    'Investment return calculations (IRR, NPV, ROI)',
    'Market analysis and competitive positioning',
    'Exit strategy planning and valuation',
    'Timeline management and milestone tracking',
    'Multiple project type support (residential, commercial, mixed-use, etc.)',
    'Comprehensive validation and error checking',
    'Detailed reporting and analysis summaries',
    'Currency and display format options',
    'Cross-field validation and auto-calculations',
    'Real-time input validation and error feedback'
  ],
  examples: [
    {
      name: 'Downtown Mixed-Use Development',
      description: 'A 100,000 sq ft mixed-use development with retail, office, and residential components',
      inputs: {
        projectName: 'Downtown Mixed-Use Development',
        projectType: 'mixed-use',
        projectSize: 100000,
        landCost: 5000000,
        constructionCost: 250,
        loanAmount: 30000000,
        equityContribution: 10000000,
        marketRent: 3.5,
        constructionDuration: 24,
        holdPeriod: 7
      }
    },
    {
      name: 'Suburban Office Complex',
      description: 'A 75,000 sq ft office development in a growing suburban market',
      inputs: {
        projectName: 'Suburban Office Complex',
        projectType: 'office',
        projectSize: 75000,
        landCost: 3000000,
        constructionCost: 200,
        loanAmount: 20000000,
        equityContribution: 8000000,
        marketRent: 2.8,
        constructionDuration: 18,
        holdPeriod: 5
      }
    },
    {
      name: 'Urban Multifamily Project',
      description: 'A 150-unit multifamily development in an urban core location',
      inputs: {
        projectName: 'Urban Multifamily Project',
        projectType: 'multifamily',
        projectSize: 120000,
        landCost: 8000000,
        constructionCost: 280,
        loanAmount: 40000000,
        equityContribution: 15000000,
        marketRent: 4.2,
        constructionDuration: 30,
        holdPeriod: 8
      }
    },
    {
      name: 'Industrial Warehouse Development',
      description: 'A 200,000 sq ft industrial warehouse facility',
      inputs: {
        projectName: 'Industrial Warehouse Development',
        projectType: 'industrial',
        projectSize: 200000,
        landCost: 4000000,
        constructionCost: 120,
        loanAmount: 25000000,
        equityContribution: 7000000,
        marketRent: 1.8,
        constructionDuration: 12,
        holdPeriod: 6
      }
    },
    {
      name: 'Boutique Hotel Project',
      description: 'A 120-room boutique hotel in a tourist destination',
      inputs: {
        projectName: 'Boutique Hotel Project',
        projectType: 'hotel',
        projectSize: 80000,
        landCost: 6000000,
        constructionCost: 350,
        loanAmount: 35000000,
        equityContribution: 12000000,
        marketRent: 5.5,
        constructionDuration: 36,
        holdPeriod: 10
      }
    }
  ],
  relatedCalculators: [
    'mortgage-payment',
    'cash-flow',
    'cap-rate',
    'irr-calculator',
    'npv-calculator',
    'break-even-analysis',
    'real-estate-investment',
    'construction-loan',
    'property-valuation',
    'rental-property-analysis',
    'commercial-real-estate',
    'real-estate-crowdfunding',
    '1031-exchange',
    'real-estate-tax',
    'property-management'
  ]
};