import { Calculator } from '../../engines/CalculatorEngine';
import { car_rental_cost_calculatorCalculatorInputs, car_rental_cost_calculatorCalculatorResults, car_rental_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class car_rental_cost_calculatorCalculatorCalculator implements Calculator<car_rental_cost_calculatorCalculatorInputs, car_rental_cost_calculatorCalculatorResults> {
  readonly id = 'car_rental_cost_calculatorCalculator';
  readonly name = 'car_rental_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate car_rental_cost_calculatorCalculator values';

  calculate(inputs: car_rental_cost_calculatorCalculatorInputs): car_rental_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: car_rental_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: car_rental_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
