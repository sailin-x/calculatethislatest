import { Calculator } from '../../engines/CalculatorEngine';
import { retirementCalculatorInputs, retirementCalculatorResults, retirementCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class retirementCalculatorCalculator implements Calculator<retirementCalculatorInputs, retirementCalculatorResults> {
  readonly id = 'retirementCalculator';
  readonly name = 'retirementCalculator Calculator';
  readonly description = 'Calculate retirementCalculator values';

  calculate(inputs: retirementCalculatorInputs): retirementCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: retirementCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: retirementCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
