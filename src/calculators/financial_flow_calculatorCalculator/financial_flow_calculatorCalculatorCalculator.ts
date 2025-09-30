import { Calculator } from '../../engines/CalculatorEngine';
import { financial_flow_calculatorCalculatorInputs, financial_flow_calculatorCalculatorResults, financial_flow_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_flow_calculatorCalculatorCalculator implements Calculator<financial_flow_calculatorCalculatorInputs, financial_flow_calculatorCalculatorResults> {
  readonly id = 'financial_flow_calculatorCalculator';
  readonly name = 'financial_flow_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_flow_calculatorCalculator values';

  calculate(inputs: financial_flow_calculatorCalculatorInputs): financial_flow_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_flow_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_flow_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
