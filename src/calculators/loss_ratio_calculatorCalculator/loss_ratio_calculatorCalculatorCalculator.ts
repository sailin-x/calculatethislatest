import { Calculator } from '../../engines/CalculatorEngine';
import { loss_ratio_calculatorCalculatorInputs, loss_ratio_calculatorCalculatorResults, loss_ratio_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class loss_ratio_calculatorCalculatorCalculator implements Calculator<loss_ratio_calculatorCalculatorInputs, loss_ratio_calculatorCalculatorResults> {
  readonly id = 'loss_ratio_calculatorCalculator';
  readonly name = 'loss_ratio_calculatorCalculator Calculator';
  readonly description = 'Calculate loss_ratio_calculatorCalculator values';

  calculate(inputs: loss_ratio_calculatorCalculatorInputs): loss_ratio_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: loss_ratio_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: loss_ratio_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
