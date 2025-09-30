import { Calculator } from '../../engines/CalculatorEngine';
import { megaBackdoorRothCalculatorInputs, megaBackdoorRothCalculatorResults, megaBackdoorRothCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class megaBackdoorRothCalculatorCalculator implements Calculator<megaBackdoorRothCalculatorInputs, megaBackdoorRothCalculatorResults> {
  readonly id = 'megaBackdoorRothCalculator';
  readonly name = 'megaBackdoorRothCalculator Calculator';
  readonly description = 'Calculate megaBackdoorRothCalculator values';

  calculate(inputs: megaBackdoorRothCalculatorInputs): megaBackdoorRothCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: megaBackdoorRothCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: megaBackdoorRothCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
