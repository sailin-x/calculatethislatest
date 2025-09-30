import { Calculator } from '../../engines/CalculatorEngine';
import { mortgage_insuranceCalculatorInputs, mortgage_insuranceCalculatorResults, mortgage_insuranceCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mortgage_insuranceCalculatorCalculator implements Calculator<mortgage_insuranceCalculatorInputs, mortgage_insuranceCalculatorResults> {
  readonly id = 'mortgage_insuranceCalculator';
  readonly name = 'mortgage_insuranceCalculator Calculator';
  readonly description = 'Calculate mortgage_insuranceCalculator values';

  calculate(inputs: mortgage_insuranceCalculatorInputs): mortgage_insuranceCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mortgage_insuranceCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mortgage_insuranceCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
