import { Calculator } from '../../engines/CalculatorEngine';
import { discord_server_monetization_calculatorCalculatorInputs, discord_server_monetization_calculatorCalculatorResults, discord_server_monetization_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class discord_server_monetization_calculatorCalculatorCalculator implements Calculator<discord_server_monetization_calculatorCalculatorInputs, discord_server_monetization_calculatorCalculatorResults> {
  readonly id = 'discord_server_monetization_calculatorCalculator';
  readonly name = 'discord_server_monetization_calculatorCalculator Calculator';
  readonly description = 'Calculate discord_server_monetization_calculatorCalculator values';

  calculate(inputs: discord_server_monetization_calculatorCalculatorInputs): discord_server_monetization_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: discord_server_monetization_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: discord_server_monetization_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
