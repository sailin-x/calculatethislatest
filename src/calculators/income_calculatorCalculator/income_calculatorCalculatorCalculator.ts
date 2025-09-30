import { Calculator } from '../../engines/CalculatorEngine';
import { income_calculatorCalculatorInputs, income_calculatorCalculatorResults, income_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class income_calculatorCalculatorCalculator implements Calculator<income_calculatorCalculatorInputs, income_calculatorCalculatorResults> {
  readonly id = 'income_calculatorCalculator';
  readonly name = 'income_calculatorCalculator Calculator';
  readonly description = 'Calculate income_calculatorCalculator values';

  calculate(inputs: income_calculatorCalculatorInputs): income_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: income_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: income_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
