import { Calculator } from '../../engines/CalculatorEngine';
import { financial_optimization_calculatorCalculatorInputs, financial_optimization_calculatorCalculatorResults, financial_optimization_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_optimization_calculatorCalculatorCalculator implements Calculator<financial_optimization_calculatorCalculatorInputs, financial_optimization_calculatorCalculatorResults> {
  readonly id = 'financial_optimization_calculatorCalculator';
  readonly name = 'financial_optimization_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_optimization_calculatorCalculator values';

  calculate(inputs: financial_optimization_calculatorCalculatorInputs): financial_optimization_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_optimization_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_optimization_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
