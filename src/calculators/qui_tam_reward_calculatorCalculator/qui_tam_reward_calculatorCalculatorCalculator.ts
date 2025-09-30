import { Calculator } from '../../engines/CalculatorEngine';
import { qui_tam_reward_calculatorCalculatorInputs, qui_tam_reward_calculatorCalculatorResults, qui_tam_reward_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class qui_tam_reward_calculatorCalculatorCalculator implements Calculator<qui_tam_reward_calculatorCalculatorInputs, qui_tam_reward_calculatorCalculatorResults> {
  readonly id = 'qui_tam_reward_calculatorCalculator';
  readonly name = 'qui_tam_reward_calculatorCalculator Calculator';
  readonly description = 'Calculate qui_tam_reward_calculatorCalculator values';

  calculate(inputs: qui_tam_reward_calculatorCalculatorInputs): qui_tam_reward_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: qui_tam_reward_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: qui_tam_reward_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
