import { Calculator } from '../../engines/CalculatorEngine';
import { interest_calculatorCalculatorInputs, interest_calculatorCalculatorResults, interest_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class interest_calculatorCalculatorCalculator implements Calculator<interest_calculatorCalculatorInputs, interest_calculatorCalculatorResults> {
  readonly id = 'interest_calculatorCalculator';
  readonly name = 'interest_calculatorCalculator Calculator';
  readonly description = 'Calculate interest_calculatorCalculator values';

  calculate(inputs: interest_calculatorCalculatorInputs): interest_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: interest_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: interest_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
