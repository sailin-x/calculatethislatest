import { Calculator } from '../../engines/CalculatorEngine';
import { earthquake_insuranceCalculatorInputs, earthquake_insuranceCalculatorResults, earthquake_insuranceCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class earthquake_insuranceCalculatorCalculator implements Calculator<earthquake_insuranceCalculatorInputs, earthquake_insuranceCalculatorResults> {
  readonly id = 'earthquake_insuranceCalculator';
  readonly name = 'earthquake_insuranceCalculator Calculator';
  readonly description = 'Calculate earthquake_insuranceCalculator values';

  calculate(inputs: earthquake_insuranceCalculatorInputs): earthquake_insuranceCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: earthquake_insuranceCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: earthquake_insuranceCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
