import { Calculator } from '../../engines/CalculatorEngine';
import { registerRentersInsuranceCalculatorInputs, registerRentersInsuranceCalculatorResults, registerRentersInsuranceCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerRentersInsuranceCalculatorCalculator implements Calculator<registerRentersInsuranceCalculatorInputs, registerRentersInsuranceCalculatorResults> {
  readonly id = 'registerRentersInsuranceCalculator';
  readonly name = 'registerRentersInsuranceCalculator Calculator';
  readonly description = 'Calculate registerRentersInsuranceCalculator values';

  calculate(inputs: registerRentersInsuranceCalculatorInputs): registerRentersInsuranceCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerRentersInsuranceCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerRentersInsuranceCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
