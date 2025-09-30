import { Calculator } from '../../engines/CalculatorEngine';
import { gpu_mining_profitabilityCalculatorInputs, gpu_mining_profitabilityCalculatorResults, gpu_mining_profitabilityCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class gpu_mining_profitabilityCalculatorCalculator implements Calculator<gpu_mining_profitabilityCalculatorInputs, gpu_mining_profitabilityCalculatorResults> {
  readonly id = 'gpu_mining_profitabilityCalculator';
  readonly name = 'gpu_mining_profitabilityCalculator Calculator';
  readonly description = 'Calculate gpu_mining_profitabilityCalculator values';

  calculate(inputs: gpu_mining_profitabilityCalculatorInputs): gpu_mining_profitabilityCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: gpu_mining_profitabilityCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: gpu_mining_profitabilityCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
