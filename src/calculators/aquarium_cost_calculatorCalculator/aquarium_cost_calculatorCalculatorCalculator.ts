import { Calculator } from '../../engines/CalculatorEngine';
import { aquarium_cost_calculatorCalculatorInputs, aquarium_cost_calculatorCalculatorResults, aquarium_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class aquarium_cost_calculatorCalculatorCalculator implements Calculator<aquarium_cost_calculatorCalculatorInputs, aquarium_cost_calculatorCalculatorResults> {
  readonly id = 'aquarium_cost_calculatorCalculator';
  readonly name = 'aquarium_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate aquarium_cost_calculatorCalculator values';

  calculate(inputs: aquarium_cost_calculatorCalculatorInputs): aquarium_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: aquarium_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: aquarium_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
