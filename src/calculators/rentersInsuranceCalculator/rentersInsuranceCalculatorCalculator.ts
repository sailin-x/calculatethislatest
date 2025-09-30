import { Calculator } from '../../engines/CalculatorEngine';
import { rentersInsuranceCalculatorInputs, rentersInsuranceCalculatorResults, rentersInsuranceCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class rentersInsuranceCalculatorCalculator implements Calculator<rentersInsuranceCalculatorInputs, rentersInsuranceCalculatorResults> {
  readonly id = 'rentersInsuranceCalculator';
  readonly name = 'rentersInsuranceCalculator Calculator';
  readonly description = 'Calculate rentersInsuranceCalculator values';

  calculate(inputs: rentersInsuranceCalculatorInputs): rentersInsuranceCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: rentersInsuranceCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: rentersInsuranceCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
