import { Calculator } from '../../engines/CalculatorEngine';
import { registerGPUMiningProfitabilityCalculatorInputs, registerGPUMiningProfitabilityCalculatorResults, registerGPUMiningProfitabilityCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerGPUMiningProfitabilityCalculatorCalculator implements Calculator<registerGPUMiningProfitabilityCalculatorInputs, registerGPUMiningProfitabilityCalculatorResults> {
  readonly id = 'registerGPUMiningProfitabilityCalculator';
  readonly name = 'registerGPUMiningProfitabilityCalculator Calculator';
  readonly description = 'Calculate registerGPUMiningProfitabilityCalculator values';

  calculate(inputs: registerGPUMiningProfitabilityCalculatorInputs): registerGPUMiningProfitabilityCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerGPUMiningProfitabilityCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerGPUMiningProfitabilityCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
