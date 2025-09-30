import { Calculator } from '../../engines/CalculatorEngine';
import { college_costCalculatorInputs, college_costCalculatorResults, college_costCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class college_costCalculatorCalculator implements Calculator<college_costCalculatorInputs, college_costCalculatorResults> {
  readonly id = 'college_costCalculator';
  readonly name = 'college_costCalculator Calculator';
  readonly description = 'Calculate college_costCalculator values';

  calculate(inputs: college_costCalculatorInputs): college_costCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: college_costCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: college_costCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
