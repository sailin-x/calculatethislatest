import { Calculator } from '../../engines/CalculatorEngine';
import { terminal_value_calculatorCalculatorInputs, terminal_value_calculatorCalculatorResults, terminal_value_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class terminal_value_calculatorCalculatorCalculator implements Calculator<terminal_value_calculatorCalculatorInputs, terminal_value_calculatorCalculatorResults> {
  readonly id = 'terminal_value_calculatorCalculator';
  readonly name = 'terminal_value_calculatorCalculator Calculator';
  readonly description = 'Calculate terminal_value_calculatorCalculator values';

  calculate(inputs: terminal_value_calculatorCalculatorInputs): terminal_value_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: terminal_value_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: terminal_value_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
