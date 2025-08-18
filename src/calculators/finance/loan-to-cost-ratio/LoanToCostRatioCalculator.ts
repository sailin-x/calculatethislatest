import { Calculator } from '../../../types/calculator';
import { calculateLoanToCostRatio, generateLoanToCostRatioAnalysis } from './formulas';
import { validateLoanToCostRatioInputs } from './validation';

export const LoanToCostRatioCalculator: Calculator = {
  id: 'loan-to-cost-ratio-calculator',
  name: 'Loan to Cost (LTC) Ratio Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate Loan to Cost (LTC) ratio for real estate projects, determining maximum loan amount based on total project costs and lender requirements.',
  inputs: [
    { id: 'landCost', name: 'Land Cost', type: 'number', unit: 'USD', required: true, description: 'Cost of the land', placeholder: '500000', min: 10000, max: 10000000 },
    { id: 'constructionCost', name: 'Construction Cost', type: 'number', unit: 'USD', required: true, description: 'Total construction costs', placeholder: '2000000', min: 10000, max: 50000000 },
    { id: 'softCosts', name: 'Soft Costs', type: 'number', unit: 'USD', required: false, description: 'Architectural, engineering, permits, etc.', placeholder: '300000', min: 0, max: 10000000 },
    { id: 'furnitureFixturesEquipment', name: 'Furniture, Fixtures & Equipment', type: 'number', unit: 'USD', required: false, description: 'FF&E costs', placeholder: '100000', min: 0, max: 5000000 },
    { id: 'contingency', name: 'Contingency', type: 'number', unit: 'USD', required: false, description: 'Contingency reserve', placeholder: '150000', min: 0, max: 5000000 },
    { id: 'ltcRatio', name: 'LTC Ratio', type: 'number', unit: '%', required: true, description: 'Maximum loan-to-cost ratio allowed by lender', placeholder: '75', min: 50, max: 95 },
    { id: 'projectType', name: 'Project Type', type: 'select', required: false, description: 'Type of real estate project', placeholder: 'Select project type', options: ['Residential', 'Commercial', 'Industrial', 'Mixed-Use', 'Hospitality', 'Healthcare', 'Educational', 'Retail', 'Office', 'Warehouse'] },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: false, description: 'Specific property type', placeholder: 'Select property type', options: ['Single Family', 'Multi-Family', 'Apartment', 'Condominium', 'Townhouse', 'Office Building', 'Shopping Center', 'Hotel', 'Hospital', 'School', 'Factory', 'Warehouse', 'Mixed-Use Building'] },
    { id: 'location', name: 'Location', type: 'select', required: false, description: 'Project location type', placeholder: 'Select location', options: ['Urban', 'Suburban', 'Rural', 'Downtown', 'Airport Area', 'University Area', 'Medical District', 'Business District', 'Residential Area', 'Industrial Zone'] },
    { id: 'marketCondition', name: 'Market Condition', type: 'select', required: false, description: 'Current market conditions', placeholder: 'Select market condition', options: ['Strong', 'Stable', 'Weak', 'Recovering', 'Declining', 'Volatile'] },
    { id: 'lenderType', name: 'Lender Type', type: 'select', required: false, description: 'Type of lender', placeholder: 'Select lender type', options: ['Commercial Bank', 'Credit Union', 'Private Lender', 'Hard Money Lender', 'CMBS Lender', 'Life Insurance Company', 'Government Agency', 'Regional Bank', 'National Bank', 'Investment Fund'] },
    { id: 'borrowerCreditScore', name: 'Borrower Credit Score', type: 'number', required: false, description: 'Borrower credit score', placeholder: '750', min: 300, max: 850 },
    { id: 'borrowerExperience', name: 'Borrower Experience', type: 'select', required: false, description: 'Borrower experience level', placeholder: 'Select experience level', options: ['Novice', 'Experienced', 'Expert', 'Institutional'] },
    { id: 'projectTimeline', name: 'Project Timeline', type: 'number', unit: 'months', required: false, description: 'Expected project completion timeline', placeholder: '18', min: 3, max: 60 },
    { id: 'preLeasing', name: 'Pre-Leasing Status', type: 'select', required: false, description: 'Pre-leasing status', placeholder: 'Select pre-leasing status', options: ['None', 'Partial', 'Substantial', 'Fully Leased'] },
    { id: 'preLeasingPercentage', name: 'Pre-Leasing Percentage', type: 'number', unit: '%', required: false, description: 'Percentage of space pre-leased', placeholder: '0', min: 0, max: 100 },
    { id: 'environmentalIssues', name: 'Environmental Issues', type: 'select', required: false, description: 'Environmental issues present', placeholder: 'Select environmental status', options: ['None', 'Minor', 'Moderate', 'Significant', 'Unknown'] },
    { id: 'zoningIssues', name: 'Zoning Issues', type: 'select', required: false, description: 'Zoning or entitlement issues', placeholder: 'Select zoning status', options: ['None', 'Minor', 'Moderate', 'Significant', 'Pending Approval'] },
    { id: 'constructionRisk', name: 'Construction Risk', type: 'select', required: false, description: 'Construction complexity and risk', placeholder: 'Select construction risk', options: ['Low', 'Moderate', 'High', 'Very High'] },
    { id: 'marketRisk', name: 'Market Risk', type: 'select', required: false, description: 'Market risk assessment', placeholder: 'Select market risk', options: ['Low', 'Moderate', 'High', 'Very High'] }
  ],
  outputs: [
    { id: 'totalProjectCost', name: 'Total Project Cost', type: 'number', unit: 'USD', description: 'Total project cost including all components' },
    { id: 'maximumLoanAmount', name: 'Maximum Loan Amount', type: 'number', unit: 'USD', description: 'Maximum loan amount based on LTC ratio' },
    { id: 'requiredEquity', name: 'Required Equity', type: 'number', unit: 'USD', description: 'Required equity investment' },
    { id: 'ltcRatioActual', name: 'Actual LTC Ratio', type: 'number', unit: '%', description: 'Actual loan-to-cost ratio' },
    { id: 'costBreakdown', name: 'Cost Breakdown', type: 'object', description: 'Detailed breakdown of project costs' },
    { id: 'riskScore', name: 'Risk Score', type: 'number', description: 'Project risk assessment score (0-100)' },
    { id: 'feasibilityScore', name: 'Feasibility Score', type: 'number', description: 'Project feasibility score (0-100)' },
    { id: 'lenderApprovalProbability', name: 'Lender Approval Probability', type: 'number', unit: '%', description: 'Probability of lender approval' },
    { id: 'recommendation', name: 'Recommendation', type: 'string', description: 'Project recommendation based on analysis' },
    { id: 'keyMetrics', name: 'Key Metrics', type: 'object', description: 'Key financial and risk metrics' },
    { id: 'loanToCostRatioAnalysis', name: 'LTC Ratio Analysis', type: 'string', description: 'Comprehensive LTC ratio analysis report' }
  ],
  calculate: (inputs) => {
    return calculateLoanToCostRatio(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateLoanToCostRatioAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Total Project Cost Calculation',
      formula: 'Total Project Cost = Land Cost + Construction Cost + Soft Costs + FF&E + Contingency',
      description: 'Calculates the total capital required for the project'
    },
    {
      name: 'Maximum Loan Amount',
      formula: 'Maximum Loan Amount = Total Project Cost × LTC Ratio',
      description: 'Determines the maximum loan amount based on lender LTC requirements'
    },
    {
      name: 'Required Equity',
      formula: 'Required Equity = Total Project Cost - Maximum Loan Amount',
      description: 'Calculates the required equity investment'
    },
    {
      name: 'Actual LTC Ratio',
      formula: 'Actual LTC Ratio = (Loan Amount / Total Project Cost) × 100',
      description: 'Calculates the actual loan-to-cost ratio'
    },
    {
      name: 'Risk Score Calculation',
      formula: 'Risk Score = Base Risk + Project Type Risk + Location Risk + Market Risk + Construction Risk',
      description: 'Comprehensive risk assessment scoring'
    },
    {
      name: 'Feasibility Score',
      formula: 'Feasibility Score = 100 - Risk Score + Market Condition Bonus + Pre-Leasing Bonus',
      description: 'Project feasibility assessment'
    }
  ],
  examples: [
    {
      name: 'Residential Development',
      inputs: {
        landCost: 500000,
        constructionCost: 2000000,
        softCosts: 300000,
        furnitureFixturesEquipment: 100000,
        contingency: 150000,
        ltcRatio: 75,
        projectType: 'Residential',
        propertyType: 'Multi-Family',
        location: 'Suburban',
        marketCondition: 'Stable',
        lenderType: 'Commercial Bank',
        borrowerCreditScore: 750,
        borrowerExperience: 'Experienced',
        projectTimeline: 18,
        preLeasing: 'None',
        preLeasingPercentage: 0,
        environmentalIssues: 'None',
        zoningIssues: 'None',
        constructionRisk: 'Moderate',
        marketRisk: 'Low'
      },
      description: 'Standard residential development project with moderate risk profile'
    },
    {
      name: 'Commercial Office Building',
      inputs: {
        landCost: 1000000,
        constructionCost: 8000000,
        softCosts: 800000,
        furnitureFixturesEquipment: 500000,
        contingency: 400000,
        ltcRatio: 70,
        projectType: 'Commercial',
        propertyType: 'Office Building',
        location: 'Downtown',
        marketCondition: 'Strong',
        lenderType: 'Life Insurance Company',
        borrowerCreditScore: 800,
        borrowerExperience: 'Expert',
        projectTimeline: 24,
        preLeasing: 'Substantial',
        preLeasingPercentage: 60,
        environmentalIssues: 'Minor',
        zoningIssues: 'None',
        constructionRisk: 'High',
        marketRisk: 'Moderate'
      },
      description: 'High-end commercial office development with substantial pre-leasing'
    },
    {
      name: 'Industrial Warehouse',
      inputs: {
        landCost: 300000,
        constructionCost: 3000000,
        softCosts: 200000,
        furnitureFixturesEquipment: 50000,
        contingency: 200000,
        ltcRatio: 80,
        projectType: 'Industrial',
        propertyType: 'Warehouse',
        location: 'Industrial Zone',
        marketCondition: 'Strong',
        lenderType: 'Regional Bank',
        borrowerCreditScore: 720,
        borrowerExperience: 'Experienced',
        projectTimeline: 12,
        preLeasing: 'Fully Leased',
        preLeasingPercentage: 100,
        environmentalIssues: 'None',
        zoningIssues: 'None',
        constructionRisk: 'Low',
        marketRisk: 'Low'
      },
      description: 'Industrial warehouse with full pre-leasing and low risk profile'
    }
  ]
};
