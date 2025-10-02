import { Calculator } from '../../types/calculator';
import { MortgageQualificationInputs, MortgageQualificationOutputs, MortgageQualificationMetrics } from './types';
import {
  calculateTotalIncome,
  calculateQualifyingIncome,
  calculateIncomeStability,
  calculateIncomeGrowth,
  calculateTotalDebt,
  calculateMonthlyDebtPayments,
  calculateDebtToIncomeRatio,
  calculateHousingExpenseRatio,
  calculateTotalAssets,
  calculateTotalLiquidity,
  calculateAssetToDebtRatio,
  calculateReserveRequirements,
  calculateAverageCreditScore,
  calculateCreditScoreRating,
  calculateCreditRisk,
  calculateCreditUtilization,
  calculateMonthlyPayment,
  calculateTotalMonthlyPayment,
  calculatePaymentToIncomeRatio,
  calculateLoanToValueRatio,
  calculateQualificationScore,
  calculateQualificationStatus,
  calculateQualificationFactors,
  calculateRiskScore,
  calculateProbabilityOfApproval,
  calculateProbabilityOfDefault,
  calculateRiskFactors,
  calculateMaxAffordablePayment,
  calculateMaxAffordableLoan,
  calculateMaxAffordableProperty,
  calculateAffordabilityMargin,
  calculateSensitivityMatrix,
  calculateScenarios,
  calculateComparisonAnalysis,
  calculateTimelineAnalysis,
  generateMortgageQualificationAnalysis
} from './formulas';

export const MortgageQualificationCalculator: Calculator = {
  id: 'mortgage-qualification-calculator',
  title: 'Mortgage Qualification Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Comprehensive mortgage qualification analysis including debt-to-income ratios, credit scoring, and affordability assessment.',
  usageInstructions: [
    'Enter borrower and co-borrower income information',
    'Input credit scores and employment details',
    'Provide property and loan information',
    'Review qualification score and approval probability',
    'Analyze debt-to-income ratios and affordability',
    'Compare different loan scenarios and options'
  ],

  inputs: [
    {
      id: 'borrowerIncome',
      label: 'Borrower Annual Income ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      tooltip: 'Annual gross income of the primary borrower'
    },
    {
      id: 'coBorrowerIncome',
      label: 'Co-Borrower Annual Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 1000000,
      step: 1000,
      tooltip: 'Annual gross income of the co-borrower'
    },
    {
      id: 'borrowerCreditScore',
      label: 'Borrower Credit Score',
      type: 'number',
      required: true,
      min: 300,
      max: 850,
      step: 1,
      tooltip: 'FICO credit score of the primary borrower'
    },
    {
      id: 'coBorrowerCreditScore',
      label: 'Co-Borrower Credit Score',
      type: 'number',
      required: false,
      min: 300,
      max: 850,
      step: 1,
      tooltip: 'FICO credit score of the co-borrower'
    },
    {
      id: 'borrowerEmploymentType',
      label: 'Borrower Employment Type',
      type: 'select',
      required: true,
      options: [
        { value: 'employed', label: 'Employed' },
        { value: 'self_employed', label: 'Self-Employed' },
        { value: 'retired', label: 'Retired' },
        { value: 'business_owner', label: 'Business Owner' },
        { value: 'unemployed', label: 'Unemployed' }
      ],
      tooltip: 'Employment status of the primary borrower'
    },
    {
      id: 'coBorrowerEmploymentType',
      label: 'Co-Borrower Employment Type',
      type: 'select',
      required: false,
      options: [
        { value: 'employed', label: 'Employed' },
        { value: 'self_employed', label: 'Self-Employed' },
        { value: 'retired', label: 'Retired' },
        { value: 'business_owner', label: 'Business Owner' },
        { value: 'unemployed', label: 'Unemployed' }
      ],
      tooltip: 'Employment status of the co-borrower'
    },
    {
      id: 'borrowerEmploymentLength',
      label: 'Borrower Employment Length (years)',
      type: 'number',
      required: true,
      min: 0,
      max: 50,
      step: 0.5,
      tooltip: 'Years of continuous employment'
    },
    {
      id: 'coBorrowerEmploymentLength',
      label: 'Co-Borrower Employment Length (years)',
      type: 'number',
      required: false,
      min: 0,
      max: 50,
      step: 0.5,
      tooltip: 'Years of continuous employment for co-borrower'
    },
    {
      id: 'baseSalary',
      label: 'Base Salary ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      tooltip: 'Base annual salary'
    },
    {
      id: 'overtimeIncome',
      label: 'Overtime Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 200000,
      step: 1000,
      tooltip: 'Annual overtime income'
    },
    {
      id: 'bonusIncome',
      label: 'Bonus Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 200000,
      step: 1000,
      tooltip: 'Annual bonus income'
    },
    {
      id: 'commissionIncome',
      label: 'Commission Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 200000,
      step: 1000,
      tooltip: 'Annual commission income'
    },
    {
      id: 'rentalIncome',
      label: 'Rental Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 100000,
      step: 1000,
      tooltip: 'Annual rental income'
    },
    {
      id: 'investmentIncome',
      label: 'Investment Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 100000,
      step: 1000,
      tooltip: 'Annual investment income'
    },
    {
      id: 'otherIncome',
      label: 'Other Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 50000,
      step: 1000,
      tooltip: 'Other annual income sources'
    },
    {
      id: 'borrowerAssets',
      label: 'Borrower Assets ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      tooltip: 'Total assets of the primary borrower'
    },
    {
      id: 'coBorrowerAssets',
      label: 'Co-Borrower Assets ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 10000000,
      step: 1000,
      tooltip: 'Total assets of the co-borrower'
    },
    {
      id: 'borrowerLiquidity',
      label: 'Borrower Liquid Assets ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      tooltip: 'Liquid assets available to the borrower'
    },
    {
      id: 'coBorrowerLiquidity',
      label: 'Co-Borrower Liquid Assets ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 1000000,
      step: 1000,
      tooltip: 'Liquid assets available to the co-borrower'
    },
    {
      id: 'borrowerDebts',
      label: 'Borrower Total Debts ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      tooltip: 'Total debts of the primary borrower'
    },
    {
      id: 'coBorrowerDebts',
      label: 'Co-Borrower Total Debts ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 1000000,
      step: 1000,
      tooltip: 'Total debts of the co-borrower'
    },
    {
      id: 'propertyValue',
      label: 'Property Value ($)',
      type: 'currency',
      required: true,
      min: 50000,
      max: 10000000,
      step: 1000,
      tooltip: 'Current market value of the property'
    },
    {
      id: 'loanAmount',
      label: 'Requested Loan Amount ($)',
      type: 'currency',
      required: true,
      min: 25000,
      max: 10000000,
      step: 1000,
      tooltip: 'Total loan amount requested'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0.1,
      max: 20,
      step: 0.01,
      tooltip: 'Annual interest rate for the loan'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (years)',
      type: 'number',
      required: true,
      min: 5,
      max: 50,
      step: 1,
      tooltip: 'Length of the loan in years'
    },
    {
      id: 'loanType',
      label: 'Loan Type',
      type: 'select',
      required: true,
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'fha', label: 'FHA' },
        { value: 'va', label: 'VA' },
        { value: 'usda', label: 'USDA' },
        { value: 'jumbo', label: 'Jumbo' },
        { value: 'hard_money', label: 'Hard Money' },
        { value: 'private', label: 'Private' }
      ],
      tooltip: 'Type of mortgage loan'
    },
    {
      id: 'downPayment',
      label: 'Down Payment ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      tooltip: 'Down payment amount'
    },
    {
      id: 'propertyInsurance',
      label: 'Annual Property Insurance ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      tooltip: 'Annual homeowners insurance premium'
    },
    {
      id: 'propertyTaxes',
      label: 'Annual Property Taxes ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
      tooltip: 'Annual property tax amount'
    },
    {
      id: 'creditCardDebt',
      label: 'Credit Card Debt ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      tooltip: 'Outstanding credit card debt'
    },
    {
      id: 'autoLoanDebt',
      label: 'Auto Loan Debt ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      tooltip: 'Outstanding auto loan debt'
    },
    {
      id: 'studentLoanDebt',
      label: 'Student Loan Debt ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 200000,
      step: 100,
      tooltip: 'Outstanding student loan debt'
    },
    {
      id: 'otherDebt',
      label: 'Other Debt ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 50000,
      step: 100,
      tooltip: 'Other outstanding debts'
    }
  ],

  outputs: [
    {
      id: 'qualificationScore',
      label: 'Qualification Score (%)',
      type: 'percentage',
      explanation: 'Overall qualification score based on income, credit, and debt factors'
    },
    {
      id: 'qualificationStatus',
      label: 'Qualification Status',
      type: 'text',
      explanation: 'Overall qualification status (approved, conditional, denied, requires review)'
    },
    {
      id: 'debtToIncomeRatio',
      label: 'Debt-to-Income Ratio (%)',
      type: 'percentage',
      explanation: 'Total debt payments as percentage of gross income'
    },
    {
      id: 'housingExpenseRatio',
      label: 'Housing Expense Ratio (%)',
      type: 'percentage',
      explanation: 'Housing expenses as percentage of gross income'
    },
    {
      id: 'averageCreditScore',
      label: 'Average Credit Score',
      type: 'number',
      explanation: 'Average FICO credit score of all borrowers'
    },
    {
      id: 'maxAffordableLoan',
      label: 'Max Affordable Loan ($)',
      type: 'currency',
      explanation: 'Maximum loan amount borrower can afford'
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment ($)',
      type: 'currency',
      explanation: 'Estimated monthly mortgage payment'
    },
    {
      id: 'probabilityOfApproval',
      label: 'Approval Probability (%)',
      type: 'percentage',
      explanation: 'Estimated probability of loan approval'
    },
    {
      id: 'totalIncome',
      label: 'Total Income ($)',
      type: 'currency',
      explanation: 'Total annual income of all borrowers'
    },
    {
      id: 'qualifyingIncome',
      label: 'Qualifying Income ($)',
      type: 'currency',
      explanation: 'Income used for qualification purposes'
    },
    {
      id: 'incomeStability',
      label: 'Income Stability Score',
      type: 'number',
      explanation: 'Score indicating income stability (0-100)'
    },
    {
      id: 'totalDebt',
      label: 'Total Debt ($)',
      type: 'currency',
      explanation: 'Total outstanding debt of all borrowers'
    },
    {
      id: 'monthlyDebtPayments',
      label: 'Monthly Debt Payments ($)',
      type: 'currency',
      explanation: 'Monthly payments for all debts'
    },
    {
      id: 'totalAssets',
      label: 'Total Assets ($)',
      type: 'currency',
      explanation: 'Total assets of all borrowers'
    },
    {
      id: 'totalLiquidity',
      label: 'Total Liquidity ($)',
      type: 'currency',
      explanation: 'Liquid assets available to borrowers'
    },
    {
      id: 'creditScoreRating',
      label: 'Credit Score Rating',
      type: 'text',
      explanation: 'Credit score rating (excellent, good, fair, poor, very poor)'
    },
    {
      id: 'creditRisk',
      label: 'Credit Risk Score',
      type: 'number',
      explanation: 'Credit risk assessment score (0-100)'
    },
    {
      id: 'totalMonthlyPayment',
      label: 'Total Monthly Payment ($)',
      type: 'currency',
      explanation: 'Total monthly housing payment including taxes and insurance'
    },
    {
      id: 'paymentToIncomeRatio',
      label: 'Payment-to-Income Ratio (%)',
      type: 'percentage',
      explanation: 'Monthly payment as percentage of income'
    },
    {
      id: 'loanToValueRatio',
      label: 'Loan-to-Value Ratio (%)',
      type: 'percentage',
      explanation: 'Loan amount as percentage of property value'
    },
    {
      id: 'riskScore',
      label: 'Risk Score',
      type: 'number',
      explanation: 'Overall loan risk assessment (0-100)'
    },
    {
      id: 'probabilityOfDefault',
      label: 'Default Probability (%)',
      type: 'percentage',
      explanation: 'Estimated probability of loan default'
    },
    {
      id: 'maxAffordablePayment',
      label: 'Max Affordable Payment ($)',
      type: 'currency',
      explanation: 'Maximum affordable monthly payment'
    },
    {
      id: 'maxAffordableProperty',
      label: 'Max Affordable Property ($)',
      type: 'currency',
      explanation: 'Maximum affordable property value'
    },
    {
      id: 'affordabilityMargin',
      label: 'Affordability Margin (%)',
      type: 'percentage',
      explanation: 'Margin between current and maximum affordable payment'
    }
  ],

  formulas: [],

  validationRules: [],

  examples: [
    {
      title: 'First-Time Homebuyer Qualification',
      description: 'Comprehensive qualification analysis for first-time homebuyer',
      inputs: {
        borrowerIncome: 75000,
        coBorrowerIncome: 50000,
        borrowerCreditScore: 720,
        coBorrowerCreditScore: 680,
        borrowerEmploymentType: 'employed',
        coBorrowerEmploymentType: 'employed',
        borrowerEmploymentLength: 4,
        coBorrowerEmploymentLength: 2,
        baseSalary: 60000,
        overtimeIncome: 10000,
        bonusIncome: 5000,
        rentalIncome: 12000,
        borrowerAssets: 150000,
        coBorrowerAssets: 50000,
        borrowerLiquidity: 75000,
        coBorrowerLiquidity: 25000,
        borrowerDebts: 25000,
        coBorrowerDebts: 10000,
        propertyValue: 400000,
        loanAmount: 320000,
        interestRate: 6.5,
        loanTerm: 30,
        loanType: 'conventional',
        downPayment: 80000,
        propertyInsurance: 1200,
        propertyTaxes: 4800,
        creditCardDebt: 5000,
        autoLoanDebt: 15000,
        studentLoanDebt: 25000
      },
      expectedOutputs: {
        qualificationScore: 78,
        qualificationStatus: 'approved',
        debtToIncomeRatio: 38.5,
        housingExpenseRatio: 26.2,
        averageCreditScore: 700,
        maxAffordableLoan: 340000,
        monthlyPayment: 2028,
        probabilityOfApproval: 85,
        totalIncome: 125000,
        qualifyingIncome: 118750,
        incomeStability: 75,
        totalDebt: 35000,
        monthlyDebtPayments: 400,
        totalAssets: 200000,
        totalLiquidity: 100000,
        creditScoreRating: 'good',
        creditRisk: 25,
        totalMonthlyPayment: 2798,
        paymentToIncomeRatio: 26.8,
        loanToValueRatio: 80,
        riskScore: 28,
        probabilityOfDefault: 3.2,
        maxAffordablePayment: 3125,
        maxAffordableProperty: 437500,
        affordabilityMargin: 35
      }
    },
    {
      title: 'Investment Property Qualification',
      description: 'Qualification analysis for investment property purchase',
      inputs: {
        borrowerIncome: 120000,
        borrowerCreditScore: 780,
        borrowerEmploymentType: 'self_employed',
        borrowerEmploymentLength: 8,
        baseSalary: 95000,
        commissionIncome: 25000,
        rentalIncome: 20000,
        borrowerAssets: 500000,
        borrowerLiquidity: 200000,
        borrowerDebts: 150000,
        propertyValue: 600000,
        loanAmount: 450000,
        interestRate: 7.0,
        loanTerm: 25,
        loanType: 'conventional',
        downPayment: 150000,
        propertyInsurance: 1800,
        propertyTaxes: 7200,
        creditCardDebt: 8000,
        autoLoanDebt: 35000
      },
      expectedOutputs: {
        qualificationScore: 82,
        qualificationStatus: 'approved',
        debtToIncomeRatio: 42.1,
        housingExpenseRatio: 31.5,
        averageCreditScore: 780,
        maxAffordableLoan: 480000,
        monthlyPayment: 3167,
        probabilityOfApproval: 88,
        totalIncome: 120000,
        qualifyingIncome: 114000,
        incomeStability: 65,
        totalDebt: 150000,
        monthlyDebtPayments: 420,
        totalAssets: 500000,
        totalLiquidity: 200000,
        creditScoreRating: 'excellent',
        creditRisk: 15,
        totalMonthlyPayment: 4367,
        paymentToIncomeRatio: 43.5,
        loanToValueRatio: 75,
        riskScore: 32,
        probabilityOfDefault: 2.8,
        maxAffordablePayment: 3600,
        maxAffordableProperty: 720000,
        affordabilityMargin: 17
      }
    }
  ]
};