import { Calculator } from '../../engines/CalculatorEngine';
import { landlord_insuranceCalculatorInputs, landlord_insuranceCalculatorResults, landlord_insuranceCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class landlord_insuranceCalculatorCalculator implements Calculator<landlord_insuranceCalculatorInputs, landlord_insuranceCalculatorResults> {
  readonly id = 'landlord_insuranceCalculator';
  readonly name = 'landlord_insuranceCalculator Calculator';
  readonly description = 'Calculate landlord_insuranceCalculator values';

  calculate(inputs: landlord_insuranceCalculatorInputs): landlord_insuranceCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: landlord_insuranceCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: landlord_insuranceCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
