import { Calculator } from '../../engines/CalculatorEngine';
import { financial_fitness_calculatorCalculatorInputs, financial_fitness_calculatorCalculatorResults, financial_fitness_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_fitness_calculatorCalculatorCalculator implements Calculator<financial_fitness_calculatorCalculatorInputs, financial_fitness_calculatorCalculatorResults> {
  readonly id = 'financial_fitness_calculatorCalculator';
  readonly name = 'financial_fitness_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_fitness_calculatorCalculator values';

  calculate(inputs: financial_fitness_calculatorCalculatorInputs): financial_fitness_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_fitness_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_fitness_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
