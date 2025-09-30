import { Calculator } from '../../engines/CalculatorEngine';
import { gpu_mining_profitability_calculatorCalculatorInputs, gpu_mining_profitability_calculatorCalculatorResults, gpu_mining_profitability_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class gpu_mining_profitability_calculatorCalculatorCalculator implements Calculator<gpu_mining_profitability_calculatorCalculatorInputs, gpu_mining_profitability_calculatorCalculatorResults> {
  readonly id = 'gpu_mining_profitability_calculatorCalculator';
  readonly name = 'gpu_mining_profitability_calculatorCalculator Calculator';
  readonly description = 'Calculate gpu_mining_profitability_calculatorCalculator values';

  calculate(inputs: gpu_mining_profitability_calculatorCalculatorInputs): gpu_mining_profitability_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: gpu_mining_profitability_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: gpu_mining_profitability_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
