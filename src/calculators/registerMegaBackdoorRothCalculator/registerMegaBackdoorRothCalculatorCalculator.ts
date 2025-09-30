import { Calculator } from '../../engines/CalculatorEngine';
import { registerMegaBackdoorRothCalculatorInputs, registerMegaBackdoorRothCalculatorResults, registerMegaBackdoorRothCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerMegaBackdoorRothCalculatorCalculator implements Calculator<registerMegaBackdoorRothCalculatorInputs, registerMegaBackdoorRothCalculatorResults> {
  readonly id = 'registerMegaBackdoorRothCalculator';
  readonly name = 'registerMegaBackdoorRothCalculator Calculator';
  readonly description = 'Calculate registerMegaBackdoorRothCalculator values';

  calculate(inputs: registerMegaBackdoorRothCalculatorInputs): registerMegaBackdoorRothCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerMegaBackdoorRothCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerMegaBackdoorRothCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
