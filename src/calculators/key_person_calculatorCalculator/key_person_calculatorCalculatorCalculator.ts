import { Calculator } from '../../engines/CalculatorEngine';
import { key_person_calculatorCalculatorInputs, key_person_calculatorCalculatorResults, key_person_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class key_person_calculatorCalculatorCalculator implements Calculator<key_person_calculatorCalculatorInputs, key_person_calculatorCalculatorResults> {
  readonly id = 'key_person_calculatorCalculator';
  readonly name = 'key_person_calculatorCalculator Calculator';
  readonly description = 'Calculate key_person_calculatorCalculator values';

  calculate(inputs: key_person_calculatorCalculatorInputs): key_person_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: key_person_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: key_person_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
