import { Calculator } from '../../engines/CalculatorEngine';
import { hotel_cost_calculatorCalculatorInputs, hotel_cost_calculatorCalculatorResults, hotel_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class hotel_cost_calculatorCalculatorCalculator implements Calculator<hotel_cost_calculatorCalculatorInputs, hotel_cost_calculatorCalculatorResults> {
  readonly id = 'hotel_cost_calculatorCalculator';
  readonly name = 'hotel_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate hotel_cost_calculatorCalculator values';

  calculate(inputs: hotel_cost_calculatorCalculatorInputs): hotel_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: hotel_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: hotel_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
