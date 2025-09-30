import { Calculator } from '../../engines/CalculatorEngine';
import { directors_officers_calculatorCalculatorInputs, directors_officers_calculatorCalculatorResults, directors_officers_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class directors_officers_calculatorCalculatorCalculator implements Calculator<directors_officers_calculatorCalculatorInputs, directors_officers_calculatorCalculatorResults> {
  readonly id = 'directors_officers_calculatorCalculator';
  readonly name = 'directors_officers_calculatorCalculator Calculator';
  readonly description = 'Calculate directors_officers_calculatorCalculator values';

  calculate(inputs: directors_officers_calculatorCalculatorInputs): directors_officers_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: directors_officers_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: directors_officers_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
