import { Calculator } from '../../engines/CalculatorEngine';
import { sharpe_ratio_calculatorCalculatorInputs, sharpe_ratio_calculatorCalculatorResults, sharpe_ratio_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class sharpe_ratio_calculatorCalculatorCalculator implements Calculator<sharpe_ratio_calculatorCalculatorInputs, sharpe_ratio_calculatorCalculatorResults> {
  readonly id = 'sharpe_ratio_calculatorCalculator';
  readonly name = 'sharpe_ratio_calculatorCalculator Calculator';
  readonly description = 'Calculate sharpe_ratio_calculatorCalculator values';

  calculate(inputs: sharpe_ratio_calculatorCalculatorInputs): sharpe_ratio_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: sharpe_ratio_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: sharpe_ratio_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
