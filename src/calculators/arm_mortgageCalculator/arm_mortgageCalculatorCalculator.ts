import { Calculator } from '../../engines/CalculatorEngine';
import { arm_mortgageCalculatorInputs, arm_mortgageCalculatorResults, arm_mortgageCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class arm_mortgageCalculatorCalculator implements Calculator<arm_mortgageCalculatorInputs, arm_mortgageCalculatorResults> {
  readonly id = 'arm_mortgageCalculator';
  readonly name = 'arm_mortgageCalculator Calculator';
  readonly description = 'Calculate arm_mortgageCalculator values';

  calculate(inputs: arm_mortgageCalculatorInputs): arm_mortgageCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: arm_mortgageCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: arm_mortgageCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
