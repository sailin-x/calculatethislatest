import { Calculator } from '../../engines/CalculatorEngine';
import { spinal_cord_injury_compensation_calculatorCalculatorInputs, spinal_cord_injury_compensation_calculatorCalculatorResults, spinal_cord_injury_compensation_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class spinal_cord_injury_compensation_calculatorCalculatorCalculator implements Calculator<spinal_cord_injury_compensation_calculatorCalculatorInputs, spinal_cord_injury_compensation_calculatorCalculatorResults> {
  readonly id = 'spinal_cord_injury_compensation_calculatorCalculator';
  readonly name = 'spinal_cord_injury_compensation_calculatorCalculator Calculator';
  readonly description = 'Calculate spinal_cord_injury_compensation_calculatorCalculator values';

  calculate(inputs: spinal_cord_injury_compensation_calculatorCalculatorInputs): spinal_cord_injury_compensation_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: spinal_cord_injury_compensation_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: spinal_cord_injury_compensation_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
