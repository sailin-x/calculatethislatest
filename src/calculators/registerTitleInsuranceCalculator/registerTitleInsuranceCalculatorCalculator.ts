import { Calculator } from '../../engines/CalculatorEngine';
import { registerTitleInsuranceCalculatorInputs, registerTitleInsuranceCalculatorResults, registerTitleInsuranceCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerTitleInsuranceCalculatorCalculator implements Calculator<registerTitleInsuranceCalculatorInputs, registerTitleInsuranceCalculatorResults> {
  readonly id = 'registerTitleInsuranceCalculator';
  readonly name = 'registerTitleInsuranceCalculator Calculator';
  readonly description = 'Calculate registerTitleInsuranceCalculator values';

  calculate(inputs: registerTitleInsuranceCalculatorInputs): registerTitleInsuranceCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerTitleInsuranceCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerTitleInsuranceCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
