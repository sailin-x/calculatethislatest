import { Calculator } from '../../engines/CalculatorEngine';
import { 529_college_savings_planCalculatorInputs, 529_college_savings_planCalculatorResults, 529_college_savings_planCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class 529_college_savings_planCalculatorCalculator implements Calculator<529_college_savings_planCalculatorInputs, 529_college_savings_planCalculatorResults> {
  readonly id = '529_college_savings_planCalculator';
  readonly name = '529_college_savings_planCalculator Calculator';
  readonly description = 'Calculate 529_college_savings_planCalculator values';

  calculate(inputs: 529_college_savings_planCalculatorInputs): 529_college_savings_planCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: 529_college_savings_planCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: 529_college_savings_planCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
