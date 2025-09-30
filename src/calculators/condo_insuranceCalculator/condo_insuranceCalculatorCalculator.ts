import { Calculator } from '../../engines/CalculatorEngine';
import { condo_insuranceCalculatorInputs, condo_insuranceCalculatorResults, condo_insuranceCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class condo_insuranceCalculatorCalculator implements Calculator<condo_insuranceCalculatorInputs, condo_insuranceCalculatorResults> {
  readonly id = 'condo_insuranceCalculator';
  readonly name = 'condo_insuranceCalculator Calculator';
  readonly description = 'Calculate condo_insuranceCalculator values';

  calculate(inputs: condo_insuranceCalculatorInputs): condo_insuranceCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: condo_insuranceCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: condo_insuranceCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
