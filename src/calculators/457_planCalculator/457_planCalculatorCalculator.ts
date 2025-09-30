import { Calculator } from '../../engines/CalculatorEngine';
import { 457_planCalculatorInputs, 457_planCalculatorResults, 457_planCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class 457_planCalculatorCalculator implements Calculator<457_planCalculatorInputs, 457_planCalculatorResults> {
  readonly id = '457_planCalculator';
  readonly name = '457_planCalculator Calculator';
  readonly description = 'Calculate 457_planCalculator values';

  calculate(inputs: 457_planCalculatorInputs): 457_planCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: 457_planCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: 457_planCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
