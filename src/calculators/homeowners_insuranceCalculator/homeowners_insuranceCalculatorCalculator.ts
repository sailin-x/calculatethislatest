import { Calculator } from '../../engines/CalculatorEngine';
import { homeowners_insuranceCalculatorInputs, homeowners_insuranceCalculatorResults, homeowners_insuranceCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class homeowners_insuranceCalculatorCalculator implements Calculator<homeowners_insuranceCalculatorInputs, homeowners_insuranceCalculatorResults> {
  readonly id = 'homeowners_insuranceCalculator';
  readonly name = 'homeowners_insuranceCalculator Calculator';
  readonly description = 'Calculate homeowners_insuranceCalculator values';

  calculate(inputs: homeowners_insuranceCalculatorInputs): homeowners_insuranceCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: homeowners_insuranceCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: homeowners_insuranceCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
