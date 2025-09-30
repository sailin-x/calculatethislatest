import { Calculator } from '../../engines/CalculatorEngine';
import { flood_insuranceCalculatorInputs, flood_insuranceCalculatorResults, flood_insuranceCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class flood_insuranceCalculatorCalculator implements Calculator<flood_insuranceCalculatorInputs, flood_insuranceCalculatorResults> {
  readonly id = 'flood_insuranceCalculator';
  readonly name = 'flood_insuranceCalculator Calculator';
  readonly description = 'Calculate flood_insuranceCalculator values';

  calculate(inputs: flood_insuranceCalculatorInputs): flood_insuranceCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: flood_insuranceCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: flood_insuranceCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
