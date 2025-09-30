import { Calculator } from '../../engines/CalculatorEngine';
import { everydayCalculatorInputs, everydayCalculatorResults, everydayCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class everydayCalculatorCalculator implements Calculator<everydayCalculatorInputs, everydayCalculatorResults> {
  readonly id = 'everydayCalculator';
  readonly name = 'everydayCalculator Calculator';
  readonly description = 'Calculate everydayCalculator values';

  calculate(inputs: everydayCalculatorInputs): everydayCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: everydayCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: everydayCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
