import { water-rights-valuation-calculatorInputs, water-rights-valuation-calculatorMetrics, water-rights-valuation-calculatorAnalysis } from './types';

// Water Rights Valuation Calculator - Business calculations
export function calculateNetPresentValue(cashFlows: number[], discountRate: number): number {
 return cashFlows.reduce((npv, cashFlow, index) => {
   return npv + cashFlow / Math.pow(1 + discountRate / 100, index);
 }, 0);
}

export function calculateROI(initialInvestment: number, finalValue: number): number {
 return ((finalValue - initialInvestment) / initialInvestment) * 100;
}

export function calculateResult(inputs: water-rights-valuation-calculatorInputs): number {
 // Business calculation logic with real math
 const numericValues = Object.values(inputs).filter(v => typeof v === 'number') as number[];
 if (numericValues.length >= 2) {
   // Calculate ROI if we have at least 2 values (investment and return)
   const investment = numericValues[0];
   const returns = numericValues.slice(1).reduce((sum, val) => sum + val, 0);
   return calculateROI(investment, returns + investment);
 }
 // Fallback to NPV calculation
 return calculateNetPresentValue(numericValues, 10); // 10% discount rate
}

export function generateAnalysis(inputs: water-rights-valuation-calculatorInputs, metrics: water-rights-valuation-calculatorMetrics): water-rights-valuation-calculatorAnalysis {
 const result = metrics.result;
 let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
 if (Math.abs(result) > 100000) riskLevel = 'High';
 else if (Math.abs(result) > 10000) riskLevel = 'Medium';

 const recommendation = 'Business calculation completed - review results carefully';

 return { recommendation, riskLevel };
}