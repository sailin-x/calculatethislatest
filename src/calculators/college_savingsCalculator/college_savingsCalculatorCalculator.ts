import { Calculator } from '../../engines/CalculatorEngine';
import { college_savingsCalculatorInputs, college_savingsCalculatorResults, college_savingsCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class college_savingsCalculatorCalculator implements Calculator<college_savingsCalculatorInputs, college_savingsCalculatorResults> {
  readonly id = 'college_savingsCalculator';
  readonly name = 'college_savingsCalculator Calculator';
  readonly description = 'Calculate college_savingsCalculator values';

  calculate(inputs: college_savingsCalculatorInputs): college_savingsCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: college_savingsCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: college_savingsCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
