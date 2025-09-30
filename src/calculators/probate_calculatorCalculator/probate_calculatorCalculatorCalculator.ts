import { Calculator } from '../../engines/CalculatorEngine';
import { probate_calculatorCalculatorInputs, probate_calculatorCalculatorResults, probate_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class probate_calculatorCalculatorCalculator implements Calculator<probate_calculatorCalculatorInputs, probate_calculatorCalculatorResults> {
  readonly id = 'probate_calculatorCalculator';
  readonly name = 'probate_calculatorCalculator Calculator';
  readonly description = 'Calculate probate_calculatorCalculator values';

  calculate(inputs: probate_calculatorCalculatorInputs): probate_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: probate_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: probate_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
