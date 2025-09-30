import { Calculator } from '../../engines/CalculatorEngine';
import { private_mortgage_insuranceCalculatorInputs, private_mortgage_insuranceCalculatorResults, private_mortgage_insuranceCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class private_mortgage_insuranceCalculatorCalculator implements Calculator<private_mortgage_insuranceCalculatorInputs, private_mortgage_insuranceCalculatorResults> {
  readonly id = 'private_mortgage_insuranceCalculator';
  readonly name = 'private_mortgage_insuranceCalculator Calculator';
  readonly description = 'Calculate private_mortgage_insuranceCalculator values';

  calculate(inputs: private_mortgage_insuranceCalculatorInputs): private_mortgage_insuranceCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: private_mortgage_insuranceCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: private_mortgage_insuranceCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
