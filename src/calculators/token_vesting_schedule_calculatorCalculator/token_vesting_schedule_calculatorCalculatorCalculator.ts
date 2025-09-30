import { Calculator } from '../../engines/CalculatorEngine';
import { token_vesting_schedule_calculatorCalculatorInputs, token_vesting_schedule_calculatorCalculatorResults, token_vesting_schedule_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class token_vesting_schedule_calculatorCalculatorCalculator implements Calculator<token_vesting_schedule_calculatorCalculatorInputs, token_vesting_schedule_calculatorCalculatorResults> {
  readonly id = 'token_vesting_schedule_calculatorCalculator';
  readonly name = 'token_vesting_schedule_calculatorCalculator Calculator';
  readonly description = 'Calculate token_vesting_schedule_calculatorCalculator values';

  calculate(inputs: token_vesting_schedule_calculatorCalculatorInputs): token_vesting_schedule_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: token_vesting_schedule_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: token_vesting_schedule_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
