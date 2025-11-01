import { EconomicValueAddedInputs, EconomicValueAddedMetrics, EconomicValueAddedAnalysis } from './types';

// Calculate NOPAT (Net Operating Profit After Tax)
export function calculateNOPAT(operatingIncome: number, taxRate: number): number {
  return operatingIncome * (1 - taxRate);
}

// Calculate Capital Charge (Cost of Capital × Capital Employed)
export function calculateCapitalCharge(costOfCapital: number, capitalEmployed: number): number {
  return costOfCapital * capitalEmployed;
}

// Calculate EVA (Economic Value Added)
export function calculateEVA(nopat: number, capitalCharge: number): number {
  return nopat - capitalCharge;
}

// Calculate EVA Margin
export function calculateEVAMargin(eva: number, capitalEmployed: number): number {
  if (capitalEmployed <= 0) return 0;
  return (eva / capitalEmployed) * 100;
}

// Calculate EVA Spread
export function calculateEVASpread(operatingProfitMargin: number, costOfCapital: number): number {
  return operatingProfitMargin - costOfCapital;
}

// Calculate Capital Productivity
export function calculateCapitalProductivity(revenue: number, capitalEmployed: number): number {
  if (capitalEmployed <= 0) return 0;
  return revenue / capitalEmployed;
}

// Generate EVA analysis
export function generateEVAAnalysis(
  inputs: EconomicValueAddedInputs,
  metrics: EconomicValueAddedMetrics
): EconomicValueAddedAnalysis {
  const { economicValueAdded, evaMargin } = metrics;

  // EVA Assessment
  let evaBreakdown = 'EVA calculation completed';
  if (economicValueAdded > 0) {
    evaBreakdown = 'Company is creating economic value above its cost of capital';
  } else if (economicValueAdded < 0) {
    evaBreakdown = 'Company is destroying economic value - returns below cost of capital';
  } else {
    evaBreakdown = 'Company is breaking even economically';
  }

  // Performance Analysis
  let performanceAnalysis = 'Neutral performance';
  if (evaMargin > 5) performanceAnalysis = 'Excellent economic performance';
  else if (evaMargin > 2) performanceAnalysis = 'Good economic performance';
  else if (evaMargin > 0) performanceAnalysis = 'Fair economic performance';
  else if (evaMargin > -2) performanceAnalysis = 'Poor economic performance';
  else performanceAnalysis = 'Very poor economic performance';

  // Value Creation
  const valueCreation = economicValueAdded > 0 ?
    'Company is creating shareholder value' :
    'Company is not creating sufficient shareholder value';

  // Strategic Implications
  const strategicPlanning = economicValueAdded > 0 ?
    'Continue current strategy with potential for expansion' :
    'Review strategy - consider cost reduction or asset optimization';

  const capitalAllocation = economicValueAdded > 0 ?
    'Capital allocation is effective' :
    'Reevaluate capital allocation priorities';

  const investmentDecisions = economicValueAdded > 0 ?
    'Investment returns exceed cost of capital' :
    'Focus on projects with returns above cost of capital';

  // Operational Efficiency
  const efficiencyAnalysis = evaMargin > 0 ?
    'Operations are economically efficient' :
    'Operational improvements needed to increase EVA';

  const costManagement = economicValueAdded > 0 ?
    'Cost management is effective' :
    'Cost reduction initiatives may be necessary';

  const productivityImprovement = evaMargin > 0 ?
    'Capital productivity is adequate' :
    'Improve capital productivity through better asset utilization';

  // Risk Management
  const riskAssessment = economicValueAdded < 0 ?
    'High risk of value destruction' :
    'Value creation is sustainable';

  const mitigationStrategies = economicValueAdded < 0 ? [
    'Reduce cost of capital through optimal capital structure',
    'Improve operational efficiency',
    'Optimize capital employed'
  ] : ['Maintain current risk management practices'];

  const uncertaintyAnalysis = 'EVA provides clear measure of economic performance';

  // Comparative Analysis
  const industryComparison = 'Compare EVA with industry peers for benchmarking';
  const peerAnalysis = 'Analyze peer EVA performance for competitive positioning';
  const benchmarkAnalysis = 'Use EVA benchmarks for performance evaluation';

  // Implementation Plan
  const actionPlan = economicValueAdded < 0 ? [
    'Conduct EVA analysis by business unit',
    'Identify value-destroying operations',
    'Develop improvement plans',
    'Monitor EVA improvements quarterly'
  ] : [
    'Continue EVA-positive operations',
    'Identify expansion opportunities',
    'Maintain cost of capital discipline'
  ];

  const monitoringPlan = 'Monitor EVA monthly with quarterly deep-dive analysis';
  const adjustmentStrategy = 'Adjust strategy based on EVA trends and peer comparisons';

  // Professional Advice
  const professionalRecommendations = [
    'Consult with financial advisors for EVA implementation',
    'Consider EVA-based compensation systems',
    'Use EVA for capital budgeting decisions'
  ];

  const regulatoryConsiderations = 'EVA is not a GAAP measure - disclose calculation methodology';
  const stakeholderCommunication = 'Communicate EVA results to investors and analysts';

  // Decision Framework
  const decisionFactors = [
    'EVA magnitude and trend',
    'Comparison with cost of capital',
    'Peer group performance',
    'Industry benchmarks'
  ];

  const sensitivityAnalysis = 'Perform sensitivity analysis on key EVA drivers';
  const scenarioPlanning = 'Use EVA in scenario planning for strategic decisions';

  return {
    evaBreakdown,
    performanceAnalysis,
    valueCreation,
    strategicPlanning,
    capitalAllocation,
    investmentDecisions,
    efficiencyAnalysis,
    costManagement,
    productivityImprovement,
    riskAssessment,
    mitigationStrategies,
    uncertaintyAnalysis,
    industryComparison,
    peerAnalysis,
    benchmarkAnalysis,
    actionPlan,
    monitoringPlan,
    adjustmentStrategy,
    professionalRecommendations,
    regulatoryConsiderations,
    stakeholderCommunication,
    decisionFactors,
    sensitivityAnalysis,
    scenarioPlanning
  };
}
