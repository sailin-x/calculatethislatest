import { Calculator } from '../../engines/CalculatorEngine';
import { cortisol_calculatorCalculatorInputs, cortisol_calculatorCalculatorResults, cortisol_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class cortisol_calculatorCalculatorCalculator implements Calculator<cortisol_calculatorCalculatorInputs, cortisol_calculatorCalculatorResults> {
  readonly id = 'cortisol_calculatorCalculator';
  readonly name = 'cortisol_calculatorCalculator Calculator';
  readonly description = 'Calculate cortisol_calculatorCalculator values';

  calculate(inputs: cortisol_calculatorCalculatorInputs): cortisol_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: cortisol_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: cortisol_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
