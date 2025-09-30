import { Calculator } from '../../engines/CalculatorEngine';
import { epa_fine_penalty_calculatorCalculatorInputs, epa_fine_penalty_calculatorCalculatorResults, epa_fine_penalty_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class epa_fine_penalty_calculatorCalculatorCalculator implements Calculator<epa_fine_penalty_calculatorCalculatorInputs, epa_fine_penalty_calculatorCalculatorResults> {
  readonly id = 'epa_fine_penalty_calculatorCalculator';
  readonly name = 'epa_fine_penalty_calculatorCalculator Calculator';
  readonly description = 'Calculate epa_fine_penalty_calculatorCalculator values';

  calculate(inputs: epa_fine_penalty_calculatorCalculatorInputs): epa_fine_penalty_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: epa_fine_penalty_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: epa_fine_penalty_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
