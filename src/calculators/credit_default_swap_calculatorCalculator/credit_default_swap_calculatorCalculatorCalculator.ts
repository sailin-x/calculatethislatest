import { Calculator } from '../../engines/CalculatorEngine';
import { credit_default_swap_calculatorCalculatorInputs, credit_default_swap_calculatorCalculatorResults, credit_default_swap_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class credit_default_swap_calculatorCalculatorCalculator implements Calculator<credit_default_swap_calculatorCalculatorInputs, credit_default_swap_calculatorCalculatorResults> {
  readonly id = 'credit_default_swap_calculatorCalculator';
  readonly name = 'credit_default_swap_calculatorCalculator Calculator';
  readonly description = 'Calculate credit_default_swap_calculatorCalculator values';

  calculate(inputs: credit_default_swap_calculatorCalculatorInputs): credit_default_swap_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: credit_default_swap_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: credit_default_swap_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
