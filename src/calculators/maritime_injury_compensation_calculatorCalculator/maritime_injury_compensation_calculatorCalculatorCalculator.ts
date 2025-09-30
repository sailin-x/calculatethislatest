import { Calculator } from '../../engines/CalculatorEngine';
import { maritime_injury_compensation_calculatorCalculatorInputs, maritime_injury_compensation_calculatorCalculatorResults, maritime_injury_compensation_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class maritime_injury_compensation_calculatorCalculatorCalculator implements Calculator<maritime_injury_compensation_calculatorCalculatorInputs, maritime_injury_compensation_calculatorCalculatorResults> {
  readonly id = 'maritime_injury_compensation_calculatorCalculator';
  readonly name = 'maritime_injury_compensation_calculatorCalculator Calculator';
  readonly description = 'Calculate maritime_injury_compensation_calculatorCalculator values';

  calculate(inputs: maritime_injury_compensation_calculatorCalculatorInputs): maritime_injury_compensation_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: maritime_injury_compensation_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: maritime_injury_compensation_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
