import { Calculator } from '../../engines/CalculatorEngine';
import { free_cash_flow_to_firm_fcff_valuationCalculatorInputs, free_cash_flow_to_firm_fcff_valuationCalculatorResults, free_cash_flow_to_firm_fcff_valuationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class free_cash_flow_to_firm_fcff_valuationCalculatorCalculator implements Calculator<free_cash_flow_to_firm_fcff_valuationCalculatorInputs, free_cash_flow_to_firm_fcff_valuationCalculatorResults> {
  readonly id = 'free_cash_flow_to_firm_fcff_valuationCalculator';
  readonly name = 'free_cash_flow_to_firm_fcff_valuationCalculator Calculator';
  readonly description = 'Calculate free_cash_flow_to_firm_fcff_valuationCalculator values';

  calculate(inputs: free_cash_flow_to_firm_fcff_valuationCalculatorInputs): free_cash_flow_to_firm_fcff_valuationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: free_cash_flow_to_firm_fcff_valuationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: free_cash_flow_to_firm_fcff_valuationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
