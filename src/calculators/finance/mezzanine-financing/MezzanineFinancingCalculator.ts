import { Calculator } from '../../../types/calculator';
import { calculateMezzanineFinancing, generateMezzanineFinancingAnalysis } from './formulas';
import { validateMezzanineFinancingInputs } from './validation';

export const MezzanineFinancingCalculator: Calculator = {
  id: 'mezzanine-financing-calculator',
  name: 'Mezzanine Financing for Real Estate Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate mezzanine financing terms for real estate projects, including interest rates, fees, and repayment structures for this hybrid debt-equity financing option.',
  inputs: [
    { id: 'projectValue', name: 'Project Value', type: 'number', unit: 'USD', required: true, description: 'Total project value after completion', placeholder: '10000000', min: 1000000, max: 100000000 },
    { id: 'seniorDebt', name: 'Senior Debt Amount', type: 'number', unit: 'USD', required: true, description: 'Amount of senior debt financing', placeholder: '6000000', min: 100000, max: 80000000 },
    { id: 'equityInvestment', name: 'Equity Investment', type: 'number', unit: 'USD', required: true, description: 'Amount of equity investment', placeholder: '2000000', min: 100000, max: 50000000 },
    { id: 'mezzanineAmount', name: 'Mezzanine Amount', type: 'number', unit: 'USD', required: true, description: 'Amount of mezzanine financing needed', placeholder: '2000000', min: 100000, max: 30000000 },
    { id: 'seniorInterestRate', name: 'Senior Debt Interest Rate', type: 'number', unit: '%', required: true, description: 'Interest rate on senior debt', placeholder: '6.5', min: 3, max: 15 },
    { id: 'mezzanineInterestRate', name: 'Mezzanine Interest Rate', type: 'number', unit: '%', required: true, description: 'Interest rate on mezzanine debt', placeholder: '12', min: 8, max: 25 },
    { id: 'mezzanineTerm', name: 'Mezzanine Term', type: 'number', unit: 'years', required: true, description: 'Term of mezzanine financing', placeholder: '5', min: 1, max: 10 },
    { id: 'originationFee', name: 'Origination Fee', type: 'number', unit: '%', required: false, description: 'Origination fee percentage', placeholder: '2', min: 0, max: 5 },
    { id: 'exitFee', name: 'Exit Fee', type: 'number', unit: '%', required: false, description: 'Exit fee percentage', placeholder: '1', min: 0, max: 3 },
    { id: 'warrantCoverage', name: 'Warrant Coverage', type: 'number', unit: '%', required: false, description: 'Warrant coverage percentage', placeholder: '10', min: 0, max: 25 },
    { id: 'projectType', name: 'Project Type', type: 'select', required: false, description: 'Type of real estate project', placeholder: 'Select project type', options: ['Residential Development', 'Commercial Development', 'Mixed-Use', 'Industrial', 'Hospitality', 'Healthcare', 'Retail', 'Office', 'Multifamily', 'Land Development'] },
    { id: 'projectStage', name: 'Project Stage', type: 'select', required: false, description: 'Current stage of project', placeholder: 'Select project stage', options: ['Pre-Development', 'Construction', 'Stabilization', 'Value-Add', 'Repositioning', 'Ground-Up Development'] },
    { id: 'location', name: 'Location', type: 'select', required: false, description: 'Project location type', placeholder: 'Select location', options: ['Primary Market', 'Secondary Market', 'Tertiary Market', 'Urban', 'Suburban', 'Rural'] },
    { id: 'sponsorTrackRecord', name: 'Sponsor Track Record', type: 'select', required: false, description: 'Sponsor experience level', placeholder: 'Select track record', options: ['First-Time', 'Experienced', 'Institutional', 'Seasoned', 'Top-Tier'] },
    { id: 'marketCondition', name: 'Market Condition', type: 'select', required: false, description: 'Current market conditions', placeholder: 'Select market condition', options: ['Strong', 'Stable', 'Weak', 'Recovering', 'Declining', 'Volatile'] },
    { id: 'preLeasing', name: 'Pre-Leasing Status', type: 'select', required: false, description: 'Pre-leasing status', placeholder: 'Select pre-leasing status', options: ['None', 'Partial', 'Substantial', 'Fully Leased'] },
    { id: 'preLeasingPercentage', name: 'Pre-Leasing Percentage', type: 'number', unit: '%', required: false, description: 'Percentage of space pre-leased', placeholder: '0', min: 0, max: 100 },
    { id: 'constructionRisk', name: 'Construction Risk', type: 'select', required: false, description: 'Construction complexity and risk', placeholder: 'Select construction risk', options: ['Low', 'Moderate', 'High', 'Very High'] },
    { id: 'marketRisk', name: 'Market Risk', type: 'select', required: false, description: 'Market risk assessment', placeholder: 'Select market risk', options: ['Low', 'Moderate', 'High', 'Very High'] },
    { id: 'exitStrategy', name: 'Exit Strategy', type: 'select', required: false, description: 'Planned exit strategy', placeholder: 'Select exit strategy', options: ['Sale', 'Refinance', 'Hold', 'IPO', 'Merger', 'Joint Venture'] },
    { id: 'exitTimeline', name: 'Exit Timeline', type: 'number', unit: 'years', required: false, description: 'Expected exit timeline', placeholder: '5', min: 1, max: 15 },
    { id: 'projectedNOI', name: 'Projected NOI', type: 'number', unit: 'USD/year', required: false, description: 'Projected net operating income at stabilization', placeholder: '800000', min: 0, max: 10000000 },
    { id: 'projectedCapRate', name: 'Projected Cap Rate', type: 'number', unit: '%', required: false, description: 'Projected capitalization rate at exit', placeholder: '6.5', min: 3, max: 12 }
  ],
  outputs: [
    { id: 'totalCapitalization', name: 'Total Capitalization', type: 'number', unit: 'USD', description: 'Total project capitalization' },
    { id: 'seniorLeverage', name: 'Senior Leverage', type: 'number', unit: '%', description: 'Senior debt as percentage of project value' },
    { id: 'mezzanineLeverage', name: 'Mezzanine Leverage', type: 'number', unit: '%', description: 'Mezzanine debt as percentage of project value' },
    { id: 'totalLeverage', name: 'Total Leverage', type: 'number', unit: '%', description: 'Total debt as percentage of project value' },
    { id: 'equityPercentage', name: 'Equity Percentage', type: 'number', unit: '%', description: 'Equity as percentage of project value' },
    { id: 'mezzanineCost', name: 'Mezzanine Cost', type: 'number', unit: 'USD/year', description: 'Annual cost of mezzanine financing' },
    { id: 'totalDebtService', name: 'Total Debt Service', type: 'number', unit: 'USD/year', description: 'Total annual debt service' },
    { id: 'debtServiceCoverage', name: 'Debt Service Coverage Ratio', type: 'number', description: 'DSCR based on projected NOI' },
    { id: 'mezzanineYield', name: 'Mezzanine Yield', type: 'number', unit: '%', description: 'Effective yield to mezzanine lender' },
    { id: 'sponsorIRR', name: 'Sponsor IRR', type: 'number', unit: '%', description: 'Projected internal rate of return for sponsor' },
    { id: 'mezzanineIRR', name: 'Mezzanine IRR', type: 'number', unit: '%', description: 'Projected IRR for mezzanine lender' },
    { id: 'riskAssessment', name: 'Risk Assessment', type: 'string', description: 'Overall risk assessment' },
    { id: 'feasibilityScore', name: 'Feasibility Score', type: 'number', description: 'Project feasibility score (0-100)' },
    { id: 'recommendations', name: 'Recommendations', type: 'string', description: 'Financing recommendations' },
    { id: 'keyMetrics', name: 'Key Metrics', type: 'object', description: 'Key financial and risk metrics' },
    { id: 'mezzanineAnalysis', name: 'Mezzanine Analysis', type: 'string', description: 'Comprehensive mezzanine financing analysis report' }
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
      formula: 'Total Capitalization = Senior Debt + Mezzanine Debt + Equity',
      description: 'Calculates the total capital stack for the project'
    },
    {
      name: 'Senior Leverage',
      formula: 'Senior Leverage = (Senior Debt / Project Value) × 100',
      description: 'Calculates senior debt as percentage of project value'
    },
    {
      name: 'Mezzanine Leverage',
      formula: 'Mezzanine Leverage = (Mezzanine Debt / Project Value) × 100',
      description: 'Calculates mezzanine debt as percentage of project value'
    },
    {
      name: 'Total Leverage',
      formula: 'Total Leverage = Senior Leverage + Mezzanine Leverage',
      description: 'Calculates total debt leverage'
    },
    {
      name: 'Mezzanine Cost',
      formula: 'Mezzanine Cost = Mezzanine Amount × Mezzanine Interest Rate',
      description: 'Calculates annual interest cost on mezzanine debt'
    },
    {
      name: 'Debt Service Coverage Ratio',
      formula: 'DSCR = Projected NOI / Total Annual Debt Service',
      description: 'Calculates debt service coverage ratio'
    },
    {
      name: 'Mezzanine Yield',
      formula: 'Mezzanine Yield = (Interest + Fees + Warrants) / Mezzanine Amount',
      description: 'Calculates effective yield to mezzanine lender'
    }
  ],
  examples: [
    {
      name: 'Residential Development Project',
      inputs: {
        projectValue: 10000000,
        seniorDebt: 6000000,
        equityInvestment: 2000000,
        mezzanineAmount: 2000000,
        seniorInterestRate: 6.5,
        mezzanineInterestRate: 12,
        mezzanineTerm: 5,
        originationFee: 2,
        exitFee: 1,
        warrantCoverage: 10,
        projectType: 'Residential Development',
        projectStage: 'Construction',
        location: 'Primary Market',
        sponsorTrackRecord: 'Experienced',
        marketCondition: 'Strong',
        preLeasing: 'None',
        preLeasingPercentage: 0,
        constructionRisk: 'Moderate',
        marketRisk: 'Low',
        exitStrategy: 'Sale',
        exitTimeline: 5,
        projectedNOI: 800000,
        projectedCapRate: 6.5
      },
      outputs: {
        totalCapitalization: 10000000,
        seniorLeverage: 60,
        mezzanineLeverage: 20,
        totalLeverage: 80,
        equityPercentage: 20,
        mezzanineCost: 240000,
        totalDebtService: 630000,
        debtServiceCoverage: 1.27,
        mezzanineYield: 15.5,
        sponsorIRR: 18.5,
        mezzanineIRR: 14.2,
        riskAssessment: 'Moderate Risk',
        feasibilityScore: 75,
        recommendations: 'Strong mezzanine financing structure with experienced sponsor and strong market conditions.',
        keyMetrics: {
          totalLeverage: 80,
          debtServiceCoverage: 1.27,
          mezzanineYield: 15.5,
          sponsorIRR: 18.5
        },
        mezzanineAnalysis: 'The 80% total leverage structure provides optimal capital efficiency while maintaining reasonable risk levels. The 1.27 DSCR indicates adequate cash flow coverage, and the 15.5% mezzanine yield offers attractive returns for the lender while providing 18.5% IRR for the sponsor.'
      }
    },
    {
      name: 'Commercial Office Development',
      inputs: {
        projectValue: 25000000,
        seniorDebt: 15000000,
        equityInvestment: 5000000,
        mezzanineAmount: 5000000,
        seniorInterestRate: 7.2,
        mezzanineInterestRate: 14,
        mezzanineTerm: 7,
        originationFee: 2.5,
        exitFee: 1.5,
        warrantCoverage: 15,
        projectType: 'Office',
        projectStage: 'Pre-Development',
        location: 'Secondary Market',
        sponsorTrackRecord: 'Institutional',
        marketCondition: 'Stable',
        preLeasing: 'Partial',
        preLeasingPercentage: 30,
        constructionRisk: 'High',
        marketRisk: 'Moderate',
        exitStrategy: 'Refinance',
        exitTimeline: 7,
        projectedNOI: 2000000,
        projectedCapRate: 7.2
      },
      outputs: {
        totalCapitalization: 25000000,
        seniorLeverage: 60,
        mezzanineLeverage: 20,
        totalLeverage: 80,
        equityPercentage: 20,
        mezzanineCost: 700000,
        totalDebtService: 1780000,
        debtServiceCoverage: 1.12,
        mezzanineYield: 18.2,
        sponsorIRR: 16.8,
        mezzanineIRR: 16.5,
        riskAssessment: 'Higher Risk',
        feasibilityScore: 65,
        recommendations: 'Higher risk profile due to pre-development stage and secondary market location. Consider additional equity or reduced mezzanine amount.',
        keyMetrics: {
          totalLeverage: 80,
          debtServiceCoverage: 1.12,
          mezzanineYield: 18.2,
          sponsorIRR: 16.8
        },
        mezzanineAnalysis: 'The 80% leverage structure in a secondary market with pre-development risk requires careful consideration. The 1.12 DSCR is tight, and the 18.2% mezzanine yield reflects the higher risk profile. Institutional sponsor track record helps mitigate some risk concerns.'
      }
    },
    {
      name: 'Multifamily Value-Add Project',
      inputs: {
        projectValue: 15000000,
        seniorDebt: 9000000,
        equityInvestment: 3000000,
        mezzanineAmount: 3000000,
        seniorInterestRate: 6.8,
        mezzanineInterestRate: 11.5,
        mezzanineTerm: 4,
        originationFee: 1.5,
        exitFee: 0.75,
        warrantCoverage: 8,
        projectType: 'Multifamily',
        projectStage: 'Value-Add',
        location: 'Primary Market',
        sponsorTrackRecord: 'Seasoned',
        marketCondition: 'Strong',
        preLeasing: 'Substantial',
        preLeasingPercentage: 75,
        constructionRisk: 'Low',
        marketRisk: 'Low',
        exitStrategy: 'Sale',
        exitTimeline: 4,
        projectedNOI: 1200000,
        projectedCapRate: 6.8
      },
      outputs: {
        totalCapitalization: 15000000,
        seniorLeverage: 60,
        mezzanineLeverage: 20,
        totalLeverage: 80,
        equityPercentage: 20,
        mezzanineCost: 345000,
        totalDebtService: 957000,
        debtServiceCoverage: 1.25,
        mezzanineYield: 13.8,
        sponsorIRR: 22.5,
        mezzanineIRR: 12.8,
        riskAssessment: 'Low Risk',
        feasibilityScore: 85,
        recommendations: 'Excellent mezzanine financing opportunity with strong sponsor, substantial pre-leasing, and favorable market conditions.',
        keyMetrics: {
          totalLeverage: 80,
          debtServiceCoverage: 1.25,
          mezzanineYield: 13.8,
          sponsorIRR: 22.5
        },
        mezzanineAnalysis: 'The 80% leverage structure with 75% pre-leasing provides excellent risk-adjusted returns. The 1.25 DSCR offers comfortable cash flow coverage, and the 13.8% mezzanine yield is attractive for the lender while enabling 22.5% IRR for the sponsor. Low construction and market risk make this an ideal mezzanine financing candidate.'
      }
    }
  ]
};