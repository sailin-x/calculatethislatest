import { Calculator } from '../../engines/CalculatorEngine';
import { data_science_calculatorCalculatorInputs, data_science_calculatorCalculatorResults, data_science_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class data_science_calculatorCalculatorCalculator implements Calculator<data_science_calculatorCalculatorInputs, data_science_calculatorCalculatorResults> {
  readonly id = 'data_science_calculatorCalculator';
  readonly name = 'data_science_calculatorCalculator Calculator';
  readonly description = 'Calculate data_science_calculatorCalculator values';

  calculate(inputs: data_science_calculatorCalculatorInputs): data_science_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: data_science_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: data_science_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
