import { Calculator } from '../../engines/CalculatorEngine';
import { balanced_scorecard_calculatorInputs, balanced_scorecard_calculatorResults, balanced_scorecard_calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class balanced_scorecard_calculatorCalculator implements Calculator<balanced_scorecard_calculatorInputs, balanced_scorecard_calculatorResults> {
  readonly id = 'balanced_scorecard_calculator';
  readonly name = 'balanced_scorecard_calculator Calculator';
  readonly description = 'Calculate balanced_scorecard_calculator values';

  calculate(inputs: balanced_scorecard_calculatorInputs): balanced_scorecard_calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: balanced_scorecard_calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: balanced_scorecard_calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
