import { Calculator } from '../../engines/CalculatorEngine';
import { rental_yield_calculatorCalculatorInputs, rental_yield_calculatorCalculatorResults, rental_yield_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class rental_yield_calculatorCalculatorCalculator implements Calculator<rental_yield_calculatorCalculatorInputs, rental_yield_calculatorCalculatorResults> {
  readonly id = 'rental_yield_calculatorCalculator';
  readonly name = 'rental_yield_calculatorCalculator Calculator';
  readonly description = 'Calculate rental_yield_calculatorCalculator values';

  calculate(inputs: rental_yield_calculatorCalculatorInputs): rental_yield_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: rental_yield_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: rental_yield_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
