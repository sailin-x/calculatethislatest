import { Calculator } from '../../engines/CalculatorEngine';
import { number_theory_calculatorCalculatorInputs, number_theory_calculatorCalculatorResults, number_theory_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class number_theory_calculatorCalculatorCalculator implements Calculator<number_theory_calculatorCalculatorInputs, number_theory_calculatorCalculatorResults> {
  readonly id = 'number_theory_calculatorCalculator';
  readonly name = 'number_theory_calculatorCalculator Calculator';
  readonly description = 'Calculate number_theory_calculatorCalculator values';

  calculate(inputs: number_theory_calculatorCalculatorInputs): number_theory_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: number_theory_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: number_theory_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
