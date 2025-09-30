import { Calculator } from '../../engines/CalculatorEngine';
import { calmar_ratio_calculatorCalculatorInputs, calmar_ratio_calculatorCalculatorResults, calmar_ratio_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class calmar_ratio_calculatorCalculatorCalculator implements Calculator<calmar_ratio_calculatorCalculatorInputs, calmar_ratio_calculatorCalculatorResults> {
  readonly id = 'calmar_ratio_calculatorCalculator';
  readonly name = 'calmar_ratio_calculatorCalculator Calculator';
  readonly description = 'Calculate calmar_ratio_calculatorCalculator values';

  calculate(inputs: calmar_ratio_calculatorCalculatorInputs): calmar_ratio_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: calmar_ratio_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: calmar_ratio_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
