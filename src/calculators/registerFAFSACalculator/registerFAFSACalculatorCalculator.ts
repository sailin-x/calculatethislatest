import { Calculator } from '../../engines/CalculatorEngine';
import { registerFAFSACalculatorInputs, registerFAFSACalculatorResults, registerFAFSACalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerFAFSACalculatorCalculator implements Calculator<registerFAFSACalculatorInputs, registerFAFSACalculatorResults> {
  readonly id = 'registerFAFSACalculator';
  readonly name = 'registerFAFSACalculator Calculator';
  readonly description = 'Calculate registerFAFSACalculator values';

  calculate(inputs: registerFAFSACalculatorInputs): registerFAFSACalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerFAFSACalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerFAFSACalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
