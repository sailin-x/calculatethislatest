import { Calculator } from '../../engines/CalculatorEngine';
import { interest_rate_swap_calculatorCalculatorInputs, interest_rate_swap_calculatorCalculatorResults, interest_rate_swap_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class interest_rate_swap_calculatorCalculatorCalculator implements Calculator<interest_rate_swap_calculatorCalculatorInputs, interest_rate_swap_calculatorCalculatorResults> {
  readonly id = 'interest_rate_swap_calculatorCalculator';
  readonly name = 'interest_rate_swap_calculatorCalculator Calculator';
  readonly description = 'Calculate interest_rate_swap_calculatorCalculator values';

  calculate(inputs: interest_rate_swap_calculatorCalculatorInputs): interest_rate_swap_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: interest_rate_swap_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: interest_rate_swap_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
