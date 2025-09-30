import { Calculator } from '../../engines/CalculatorEngine';
import { garden_calculatorCalculatorInputs, garden_calculatorCalculatorResults, garden_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class garden_calculatorCalculatorCalculator implements Calculator<garden_calculatorCalculatorInputs, garden_calculatorCalculatorResults> {
  readonly id = 'garden_calculatorCalculator';
  readonly name = 'garden_calculatorCalculator Calculator';
  readonly description = 'Calculate garden_calculatorCalculator values';

  calculate(inputs: garden_calculatorCalculatorInputs): garden_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: garden_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: garden_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
