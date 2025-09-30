import { Calculator } from '../../engines/CalculatorEngine';
import { balanced_scorecard_calculatorCalculatorInputs, balanced_scorecard_calculatorCalculatorResults, balanced_scorecard_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class balanced_scorecard_calculatorCalculatorCalculator implements Calculator<balanced_scorecard_calculatorCalculatorInputs, balanced_scorecard_calculatorCalculatorResults> {
  readonly id = 'balanced_scorecard_calculatorCalculator';
  readonly name = 'balanced_scorecard_calculatorCalculator Calculator';
  readonly description = 'Calculate balanced_scorecard_calculatorCalculator values';

  calculate(inputs: balanced_scorecard_calculatorCalculatorInputs): balanced_scorecard_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: balanced_scorecard_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: balanced_scorecard_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
