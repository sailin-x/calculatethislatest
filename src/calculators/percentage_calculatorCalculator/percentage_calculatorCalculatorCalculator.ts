import { Calculator } from '../../engines/CalculatorEngine';
import { percentage_calculatorCalculatorInputs, percentage_calculatorCalculatorResults, percentage_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class percentage_calculatorCalculatorCalculator implements Calculator<percentage_calculatorCalculatorInputs, percentage_calculatorCalculatorResults> {
  readonly id = 'percentage_calculatorCalculator';
  readonly name = 'percentage_calculatorCalculator Calculator';
  readonly description = 'Calculate percentage_calculatorCalculator values';

  calculate(inputs: percentage_calculatorCalculatorInputs): percentage_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: percentage_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: percentage_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
