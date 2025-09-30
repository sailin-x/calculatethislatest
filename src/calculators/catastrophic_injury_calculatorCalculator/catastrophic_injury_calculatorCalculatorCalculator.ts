import { Calculator } from '../../engines/CalculatorEngine';
import { catastrophic_injury_calculatorCalculatorInputs, catastrophic_injury_calculatorCalculatorResults, catastrophic_injury_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class catastrophic_injury_calculatorCalculatorCalculator implements Calculator<catastrophic_injury_calculatorCalculatorInputs, catastrophic_injury_calculatorCalculatorResults> {
  readonly id = 'catastrophic_injury_calculatorCalculator';
  readonly name = 'catastrophic_injury_calculatorCalculator Calculator';
  readonly description = 'Calculate catastrophic_injury_calculatorCalculator values';

  calculate(inputs: catastrophic_injury_calculatorCalculatorInputs): catastrophic_injury_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: catastrophic_injury_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: catastrophic_injury_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
