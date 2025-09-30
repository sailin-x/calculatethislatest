import { Calculator } from '../../engines/CalculatorEngine';
import { debt_snowball_calculatorCalculatorInputs, debt_snowball_calculatorCalculatorResults, debt_snowball_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class debt_snowball_calculatorCalculatorCalculator implements Calculator<debt_snowball_calculatorCalculatorInputs, debt_snowball_calculatorCalculatorResults> {
  readonly id = 'debt_snowball_calculatorCalculator';
  readonly name = 'debt_snowball_calculatorCalculator Calculator';
  readonly description = 'Calculate debt_snowball_calculatorCalculator values';

  calculate(inputs: debt_snowball_calculatorCalculatorInputs): debt_snowball_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: debt_snowball_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: debt_snowball_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
