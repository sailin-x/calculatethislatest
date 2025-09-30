import { Calculator } from '../../engines/CalculatorEngine';
import { renters_insuranceCalculatorInputs, renters_insuranceCalculatorResults, renters_insuranceCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class renters_insuranceCalculatorCalculator implements Calculator<renters_insuranceCalculatorInputs, renters_insuranceCalculatorResults> {
  readonly id = 'renters_insuranceCalculator';
  readonly name = 'renters_insuranceCalculator Calculator';
  readonly description = 'Calculate renters_insuranceCalculator values';

  calculate(inputs: renters_insuranceCalculatorInputs): renters_insuranceCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: renters_insuranceCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: renters_insuranceCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
