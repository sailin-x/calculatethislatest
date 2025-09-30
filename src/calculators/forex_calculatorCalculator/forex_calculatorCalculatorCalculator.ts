import { Calculator } from '../../engines/CalculatorEngine';
import { forex_calculatorCalculatorInputs, forex_calculatorCalculatorResults, forex_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class forex_calculatorCalculatorCalculator implements Calculator<forex_calculatorCalculatorInputs, forex_calculatorCalculatorResults> {
  readonly id = 'forex_calculatorCalculator';
  readonly name = 'forex_calculatorCalculator Calculator';
  readonly description = 'Calculate forex_calculatorCalculator values';

  calculate(inputs: forex_calculatorCalculatorInputs): forex_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: forex_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: forex_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
