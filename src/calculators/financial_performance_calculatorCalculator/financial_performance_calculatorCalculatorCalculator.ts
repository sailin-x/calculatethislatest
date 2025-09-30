import { Calculator } from '../../engines/CalculatorEngine';
import { financial_performance_calculatorCalculatorInputs, financial_performance_calculatorCalculatorResults, financial_performance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_performance_calculatorCalculatorCalculator implements Calculator<financial_performance_calculatorCalculatorInputs, financial_performance_calculatorCalculatorResults> {
  readonly id = 'financial_performance_calculatorCalculator';
  readonly name = 'financial_performance_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_performance_calculatorCalculator values';

  calculate(inputs: financial_performance_calculatorCalculatorInputs): financial_performance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_performance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_performance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
