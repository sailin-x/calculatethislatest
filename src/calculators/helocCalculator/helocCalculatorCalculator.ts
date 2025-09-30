import { Calculator } from '../../engines/CalculatorEngine';
import { helocCalculatorInputs, helocCalculatorResults, helocCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class helocCalculatorCalculator implements Calculator<helocCalculatorInputs, helocCalculatorResults> {
  readonly id = 'helocCalculator';
  readonly name = 'helocCalculator Calculator';
  readonly description = 'Calculate helocCalculator values';

  calculate(inputs: helocCalculatorInputs): helocCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: helocCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: helocCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
