import { Calculator } from '../../engines/CalculatorEngine';
import { garden_yield_calculatorCalculatorInputs, garden_yield_calculatorCalculatorResults, garden_yield_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class garden_yield_calculatorCalculatorCalculator implements Calculator<garden_yield_calculatorCalculatorInputs, garden_yield_calculatorCalculatorResults> {
  readonly id = 'garden_yield_calculatorCalculator';
  readonly name = 'garden_yield_calculatorCalculator Calculator';
  readonly description = 'Calculate garden_yield_calculatorCalculator values';

  calculate(inputs: garden_yield_calculatorCalculatorInputs): garden_yield_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: garden_yield_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: garden_yield_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
