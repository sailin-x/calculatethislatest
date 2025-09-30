import { Calculator } from '../../engines/CalculatorEngine';
import { macro_calculatorCalculatorInputs, macro_calculatorCalculatorResults, macro_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class macro_calculatorCalculatorCalculator implements Calculator<macro_calculatorCalculatorInputs, macro_calculatorCalculatorResults> {
  readonly id = 'macro_calculatorCalculator';
  readonly name = 'macro_calculatorCalculator Calculator';
  readonly description = 'Calculate macro_calculatorCalculator values';

  calculate(inputs: macro_calculatorCalculatorInputs): macro_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: macro_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: macro_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
