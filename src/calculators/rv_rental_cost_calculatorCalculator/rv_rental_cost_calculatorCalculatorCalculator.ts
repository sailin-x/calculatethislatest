import { Calculator } from '../../engines/CalculatorEngine';
import { rv_rental_cost_calculatorCalculatorInputs, rv_rental_cost_calculatorCalculatorResults, rv_rental_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class rv_rental_cost_calculatorCalculatorCalculator implements Calculator<rv_rental_cost_calculatorCalculatorInputs, rv_rental_cost_calculatorCalculatorResults> {
  readonly id = 'rv_rental_cost_calculatorCalculator';
  readonly name = 'rv_rental_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate rv_rental_cost_calculatorCalculator values';

  calculate(inputs: rv_rental_cost_calculatorCalculatorInputs): rv_rental_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: rv_rental_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: rv_rental_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
