import { Calculator } from '../../engines/CalculatorEngine';
import { breakeven_point_calculatorCalculatorInputs, breakeven_point_calculatorCalculatorResults, breakeven_point_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class breakeven_point_calculatorCalculatorCalculator implements Calculator<breakeven_point_calculatorCalculatorInputs, breakeven_point_calculatorCalculatorResults> {
  readonly id = 'breakeven_point_calculatorCalculator';
  readonly name = 'breakeven_point_calculatorCalculator Calculator';
  readonly description = 'Calculate breakeven_point_calculatorCalculator values';

  calculate(inputs: breakeven_point_calculatorCalculatorInputs): breakeven_point_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: breakeven_point_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: breakeven_point_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
