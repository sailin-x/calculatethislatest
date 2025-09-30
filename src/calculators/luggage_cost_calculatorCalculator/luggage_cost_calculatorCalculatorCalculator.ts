import { Calculator } from '../../engines/CalculatorEngine';
import { luggage_cost_calculatorCalculatorInputs, luggage_cost_calculatorCalculatorResults, luggage_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class luggage_cost_calculatorCalculatorCalculator implements Calculator<luggage_cost_calculatorCalculatorInputs, luggage_cost_calculatorCalculatorResults> {
  readonly id = 'luggage_cost_calculatorCalculator';
  readonly name = 'luggage_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate luggage_cost_calculatorCalculator values';

  calculate(inputs: luggage_cost_calculatorCalculatorInputs): luggage_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: luggage_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: luggage_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
