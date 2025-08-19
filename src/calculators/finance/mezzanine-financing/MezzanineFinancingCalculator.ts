import { Calculator } from '../../../types/calculator';
import { calculateMezzanineFinancing, generateMezzanineFinancingAnalysis } from './formulas';
import { validateMezzanineFinancingInputs } from './validation';

export const MezzanineFinancingCalculator: Calculator = {
  id: 'mezzanine-financing-calculator',
  name: 'Mezzanine Financing for Real Estate Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate mezzanine financing terms, costs, and returns for real estate projects including debt service coverage, exit strategies, and risk assessment.',
  inputs: [
    { id: 'projectValue', name: 'Project Value', type: 'number', unit: 'USD', required: true, description: 'Total project value upon completion', placeholder: '10000000', min: 100000, max: 1000000000 },
    { id: 'seniorLoanAmount', name: 'Senior Loan Amount', type: 'number', unit: 'USD', required: true, description: 'First mortgage loan amount', placeholder: '6000000', min: 100000, max: 500000000 },
    { id: 'mezzanineLoanAmount', name: 'Mezzanine Loan Amount', type: 'number', unit: 'USD', required: true, description: 'Mezzanine financing amount', placeholder: '2000000', min: 100000, max: 200000000 },
    { id: 'equityInvestment', name: 'Equity Investment', type: 'number', unit: 'USD', required: false, description: 'Equity contribution amount', placeholder: '2000000', min: 0, max: 500000000 },
    { id: 'seniorLoanRate', name: 'Senior Loan Rate', type: 'number', unit: '%/year', required: true, description: 'Senior loan interest rate', placeholder: '5.5', min: 1, max: 15 },
    { id: 'mezzanineLoanRate', name: 'Mezzanine Loan Rate', type: 'number', unit: '%/year', required: true, description: 'Mezzanine loan interest rate', placeholder: '12', min: 8, max: 25 },
    { id: 'seniorLoanTerm', name: 'Senior Loan Term', type: 'number', unit: 'years', required: true, description: 'Senior loan term in years', placeholder: '30', min: 1, max: 40 },
    { id: 'mezzanineLoanTerm', name: 'Mezzanine Loan Term', type: 'number', unit: 'years', required: true, description: 'Mezzanine loan term in years', placeholder: '5', min: 1, max: 10 },
    { id: 'projectTimeline', name: 'Project Timeline', type: 'number', unit: 'months', required: false, description: 'Expected project completion timeline', placeholder: '24', min: 6, max: 60 },
    { id: 'stabilizedNOI', name: 'Stabilized NOI', type: 'number', unit: 'USD/year', required: false, description: 'Expected stabilized net operating income', placeholder: '800000', min: 0, max: 50000000 },
    { id: 'exitValue', name: 'Exit Value', type: 'number', unit: 'USD', required: false, description: 'Expected exit value', placeholder: '12000000', min: 0, max: 1000000000 },
    { id: 'exitTimeline', name: 'Exit Timeline', type: 'number', unit: 'years', required: false, description: 'Expected exit timeline', placeholder: '5', min: 1, max: 15 },
    { id: 'projectType', name: 'Project Type', type: 'select', required: false, description: 'Type of real estate project', placeholder: 'Select project type', options: ['Residential', 'Commercial', 'Industrial', 'Mixed-Use', 'Hospitality', 'Healthcare', 'Educational', 'Retail', 'Office', 'Warehouse', 'Multifamily', 'Single Family', 'Land Development'] },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: false, description: 'Specific property type', placeholder: 'Select property type', options: ['Apartment Building', 'Office Building', 'Shopping Center', 'Hotel', 'Hospital', 'School', 'Factory', 'Warehouse', 'Mixed-Use Building', 'Single Family Home', 'Townhouse', 'Condominium', 'Land', 'Development Site'] },
    { id: 'location', name: 'Location', type: 'select', required: false, description: 'Project location type', placeholder: 'Select location', options: ['Urban', 'Suburban', 'Rural', 'Downtown', 'Airport Area', 'University Area', 'Medical District', 'Business District', 'Residential Area', 'Industrial Zone', 'Coastal', 'Mountain', 'Desert'] },
    { id: 'marketCondition', name: 'Market Condition', type: 'select', required: false, description: 'Current market conditions', placeholder: 'Select market condition', options: ['Strong', 'Stable', 'Weak', 'Recovering', 'Declining', 'Volatile'] },
    { id: 'lenderType', name: 'Lender Type', type: 'select', required: false, description: 'Type of mezzanine lender', placeholder: 'Select lender type', options: ['Private Equity', 'Hedge Fund', 'Real Estate Fund', 'Insurance Company', 'Pension Fund', 'Family Office', 'Commercial Bank', 'Investment Bank', 'Credit Union', 'Hard Money Lender'] },
    { id: 'borrowerCreditScore', name: 'Borrower Credit Score', type: 'number', required: false, description: 'Borrower credit score', placeholder: '750', min: 300, max: 850 },
    { id: 'borrowerExperience', name: 'Borrower Experience', type: 'select', required: false, description: 'Borrower experience level', placeholder: 'Select experience level', options: ['Novice', 'Experienced', 'Expert', 'Institutional'] },
    { id: 'preLeasing', name: 'Pre-Leasing Status', type: 'select', required: false, description: 'Pre-leasing status', placeholder: 'Select pre-leasing status', options: ['None', 'Partial', 'Substantial', 'Fully Leased'] },
    { id: 'preLeasingPercentage', name: 'Pre-Leasing Percentage', type: 'number', unit: '%', required: false, description: 'Percentage of space pre-leased', placeholder: '0', min: 0, max: 100 },
    { id: 'environmentalIssues', name: 'Environmental Issues', type: 'select', required: false, description: 'Environmental issues present', placeholder: 'Select environmental status', options: ['None', 'Minor', 'Moderate', 'Significant', 'Unknown'] },
    { id: 'zoningIssues', name: 'Zoning Issues', type: 'select', required: false, description: 'Zoning or entitlement issues', placeholder: 'Select zoning status', options: ['None', 'Minor', 'Moderate', 'Significant', 'Pending Approval'] },
    { id: 'constructionRisk', name: 'Construction Risk', type: 'select', required: false, description: 'Construction complexity and risk', placeholder: 'Select construction risk', options: ['Low', 'Moderate', 'High', 'Very High'] },
    { id: 'marketRisk', name: 'Market Risk', type: 'select', required: false, description: 'Market risk assessment', placeholder: 'Select market risk', options: ['Low', 'Moderate', 'High', 'Very High'] },
    { id: 'exitStrategy', name: 'Exit Strategy', type: 'select', required: false, description: 'Planned exit strategy', placeholder: 'Select exit strategy', options: ['Sale', 'Refinance', 'Hold', 'IPO', 'Merger', 'Joint Venture', '1031 Exchange'] },
    { id: 'seniorLenderApproval', name: 'Senior Lender Approval', type: 'select', required: false, description: 'Senior lender approval status', placeholder: 'Select approval status', options: ['Approved', 'Pending', 'Conditional', 'Denied', 'Not Required'] },
    { id: 'mezzanineFees', name: 'Mezzanine Fees', type: 'number', unit: 'USD', required: false, description: 'Upfront mezzanine financing fees', placeholder: '100000', min: 0, max: 10000000 },
    { id: 'mezzaninePoints', name: 'Mezzanine Points', type: 'number', unit: '%', required: false, description: 'Mezzanine loan origination points', placeholder: '2', min: 0, max: 10 },
    { id: 'prepaymentPenalty', name: 'Prepayment Penalalty', type: 'number', unit: '%', required: false, description: 'Prepayment penalty percentage', placeholder: '5', min: 0, max: 20 },
    { id: 'guaranteeRequired', name: 'Personal Guarantee Required', type: 'select', required: false, description: 'Personal guarantee requirement', placeholder: 'Select guarantee status', options: ['None', 'Partial', 'Full', 'Corporate Only'] }
  ],
  outputs: [
    { id: 'totalCapitalization', name: 'Total Capitalization', type: 'number', unit: 'USD', description: 'Total project capitalization' },
    { id: 'seniorLeverage', name: 'Senior Leverage', type: 'number', unit: '%', description: 'Senior loan as percentage of project value' },
    { id: 'mezzanineLeverage', name: 'Mezzanine Leverage', type: 'number', unit: '%', description: 'Mezzanine loan as percentage of project value' },
    { id: 'totalLeverage', name: 'Total Leverage', type: 'number', unit: '%', description: 'Total debt as percentage of project value' },
    { id: 'equityPercentage', name: 'Equity Percentage', type: 'number', unit: '%', description: 'Equity as percentage of project value' },
    { id: 'seniorMonthlyPayment', name: 'Senior Monthly Payment', type: 'number', unit: 'USD', description: 'Monthly senior loan payment' },
    { id: 'mezzanineMonthlyPayment', name: 'Mezzanine Monthly Payment', type: 'number', unit: 'USD', description: 'Monthly mezzanine loan payment' },
    { id: 'totalMonthlyPayment', name: 'Total Monthly Payment', type: 'number', unit: 'USD', description: 'Total monthly debt service' },
    { id: 'debtServiceCoverageRatio', name: 'Debt Service Coverage Ratio', type: 'number', description: 'DSCR based on stabilized NOI' },
    { id: 'interestCoverageRatio', name: 'Interest Coverage Ratio', type: 'number', description: 'Interest coverage ratio' },
    { id: 'loanToCostRatio', name: 'Loan to Cost Ratio', type: 'number', unit: '%', description: 'Total debt to total cost ratio' },
    { id: 'loanToValueRatio', name: 'Loan to Value Ratio', type: 'number', unit: '%', description: 'Total debt to project value ratio' },
    { id: 'mezzanineCost', name: 'Mezzanine Cost', type: 'number', unit: 'USD', description: 'Total mezzanine financing cost' },
    { id: 'mezzanineCostPercentage', name: 'Mezzanine Cost Percentage', type: 'number', unit: '%', description: 'Mezzanine cost as percentage of loan amount' },
    { id: 'totalFinancingCost', name: 'Total Financing Cost', type: 'number', unit: 'USD', description: 'Total cost of all financing' },
    { id: 'weightedAverageCost', name: 'Weighted Average Cost', type: 'number', unit: '%', description: 'Weighted average cost of capital' },
    { id: 'projectedIRR', name: 'Projected IRR', type: 'number', unit: '%', description: 'Projected internal rate of return' },
    { id: 'projectedROE', name: 'Projected ROE', type: 'number', unit: '%', description: 'Projected return on equity' },
    { id: 'projectedROI', name: 'Projected ROI', type: 'number', unit: '%', description: 'Projected return on investment' },
    { id: 'breakEvenAnalysis', name: 'Break-Even Analysis', type: 'object', description: 'Break-even analysis results' },
    { id: 'sensitivityAnalysis', name: 'Sensitivity Analysis', type: 'object', description: 'Sensitivity analysis results' },
    { id: 'riskScore', name: 'Risk Score', type: 'number', description: 'Project risk assessment score (0-100)' },
    { id: 'feasibilityScore', name: 'Feasibility Score', type: 'number', description: 'Project feasibility score (0-100)' },
    { id: 'approvalProbability', name: 'Approval Probability', type: 'number', unit: '%', description: 'Probability of mezzanine financing approval' },
    { id: 'recommendation', name: 'Recommendation', type: 'string', description: 'Project recommendation based on analysis' },
    { id: 'keyMetrics', name: 'Key Metrics', type: 'object', description: 'Key financial and risk metrics' },
    { id: 'mezzanineFinancingAnalysis', name: 'Mezzanine Financing Analysis', type: 'string', description: 'Comprehensive mezzanine financing analysis report' }
  ],
  calculate: (inputs) => {
    return calculateMezzanineFinancing(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateMezzanineFinancingAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Total Capitalization',
      formula: 'Total Capitalization = Senior Loan + Mezzanine Loan + Equity Investment',
      description: 'Calculates the total project capitalization'
    },
    {
      name: 'Senior Leverage',
      formula: 'Senior Leverage = (Senior Loan Amount / Project Value) × 100',
      description: 'Calculates senior loan as percentage of project value'
    },
    {
      name: 'Mezzanine Leverage',
      formula: 'Mezzanine Leverage = (Mezzanine Loan Amount / Project Value) × 100',
      description: 'Calculates mezzanine loan as percentage of project value'
    },
    {
      name: 'Total Leverage',
      formula: 'Total Leverage = Senior Leverage + Mezzanine Leverage',
      description: 'Calculates total debt as percentage of project value'
    },
    {
      name: 'Debt Service Coverage Ratio',
      formula: 'DSCR = Stabilized NOI / Total Annual Debt Service',
      description: 'Measures ability to cover debt payments with operating income'
    },
    {
      name: 'Weighted Average Cost of Capital',
      formula: 'WACC = (Senior Rate × Senior Loan + Mezzanine Rate × Mezzanine Loan) / Total Debt',
      description: 'Calculates weighted average cost of all debt financing'
    },
    {
      name: 'Projected IRR',
      formula: 'IRR = Rate that makes NPV of cash flows equal to zero',
      description: 'Calculates internal rate of return on equity investment'
    },
    {
      name: 'Loan to Cost Ratio',
      formula: 'LTC = (Total Debt / Total Project Cost) × 100',
      description: 'Measures total debt relative to total project cost'
    },
    {
      name: 'Loan to Value Ratio',
      formula: 'LTV = (Total Debt / Project Value) × 100',
      description: 'Measures total debt relative to project value'
    }
  ],
  examples: [
    {
      name: 'Mixed-Use Development',
      inputs: {
        projectValue: 15000000,
        seniorLoanAmount: 9000000,
        mezzanineLoanAmount: 3000000,
        equityInvestment: 3000000,
        seniorLoanRate: 5.5,
        mezzanineLoanRate: 12,
        seniorLoanTerm: 30,
        mezzanineLoanTerm: 5,
        projectType: 'Mixed-Use',
        location: 'Urban',
        marketCondition: 'Strong',
        exitStrategy: 'Sale'
      },
      description: 'Mixed-use development with 60% senior debt, 20% mezzanine, and 20% equity'
    },
    {
      name: 'Apartment Acquisition',
      inputs: {
        projectValue: 8000000,
        seniorLoanAmount: 4800000,
        mezzanineLoanAmount: 1600000,
        equityInvestment: 1600000,
        seniorLoanRate: 5.25,
        mezzanineLoanRate: 11.5,
        seniorLoanTerm: 30,
        mezzanineLoanTerm: 7,
        projectType: 'Residential',
        propertyType: 'Apartment Building',
        location: 'Suburban',
        marketCondition: 'Stable',
        exitStrategy: 'Refinance'
      },
      description: 'Apartment acquisition with 60% senior debt, 20% mezzanine, and 20% equity'
    },
    {
      name: 'Office Development',
      inputs: {
        projectValue: 25000000,
        seniorLoanAmount: 15000000,
        mezzanineLoanAmount: 5000000,
        equityInvestment: 5000000,
        seniorLoanRate: 5.75,
        mezzanineLoanRate: 13,
        seniorLoanTerm: 25,
        mezzanineLoanTerm: 5,
        projectType: 'Commercial',
        propertyType: 'Office Building',
        location: 'Downtown',
        marketCondition: 'Strong',
        exitStrategy: 'Sale'
      },
      description: 'Office development with 60% senior debt, 20% mezzanine, and 20% equity'
    }
  ]
};
