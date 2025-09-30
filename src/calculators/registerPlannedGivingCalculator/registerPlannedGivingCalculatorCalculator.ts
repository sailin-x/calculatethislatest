import { Calculator } from '../../engines/CalculatorEngine';
import { registerPlannedGivingCalculatorInputs, registerPlannedGivingCalculatorResults, registerPlannedGivingCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerPlannedGivingCalculatorCalculator implements Calculator<registerPlannedGivingCalculatorInputs, registerPlannedGivingCalculatorResults> {
  readonly id = 'registerPlannedGivingCalculator';
  readonly name = 'registerPlannedGivingCalculator Calculator';
  readonly description = 'Calculate registerPlannedGivingCalculator values';

  calculate(inputs: registerPlannedGivingCalculatorInputs): registerPlannedGivingCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerPlannedGivingCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerPlannedGivingCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
