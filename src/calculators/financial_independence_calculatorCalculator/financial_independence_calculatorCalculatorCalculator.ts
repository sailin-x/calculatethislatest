import { Calculator } from '../../engines/CalculatorEngine';
import { financial_independence_calculatorCalculatorInputs, financial_independence_calculatorCalculatorResults, financial_independence_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_independence_calculatorCalculatorCalculator implements Calculator<financial_independence_calculatorCalculatorInputs, financial_independence_calculatorCalculatorResults> {
  readonly id = 'financial_independence_calculatorCalculator';
  readonly name = 'financial_independence_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_independence_calculatorCalculator values';

  calculate(inputs: financial_independence_calculatorCalculatorInputs): financial_independence_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_independence_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_independence_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
