import { Calculator } from '../../engines/CalculatorEngine';
import { staking_rewards_calculatorCalculatorInputs, staking_rewards_calculatorCalculatorResults, staking_rewards_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class staking_rewards_calculatorCalculatorCalculator implements Calculator<staking_rewards_calculatorCalculatorInputs, staking_rewards_calculatorCalculatorResults> {
  readonly id = 'staking_rewards_calculatorCalculator';
  readonly name = 'staking_rewards_calculatorCalculator Calculator';
  readonly description = 'Calculate staking_rewards_calculatorCalculator values';

  calculate(inputs: staking_rewards_calculatorCalculatorInputs): staking_rewards_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: staking_rewards_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: staking_rewards_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
