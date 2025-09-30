import { Calculator } from '../../engines/CalculatorEngine';
import { registerEstatePlanningCalculatorInputs, registerEstatePlanningCalculatorResults, registerEstatePlanningCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerEstatePlanningCalculatorCalculator implements Calculator<registerEstatePlanningCalculatorInputs, registerEstatePlanningCalculatorResults> {
  readonly id = 'registerEstatePlanningCalculator';
  readonly name = 'registerEstatePlanningCalculator Calculator';
  readonly description = 'Calculate registerEstatePlanningCalculator values';

  calculate(inputs: registerEstatePlanningCalculatorInputs): registerEstatePlanningCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerEstatePlanningCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerEstatePlanningCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
