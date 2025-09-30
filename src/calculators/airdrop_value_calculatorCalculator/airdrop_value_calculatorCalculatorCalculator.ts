import { Calculator } from '../../engines/CalculatorEngine';
import { airdrop_value_calculatorCalculatorInputs, airdrop_value_calculatorCalculatorResults, airdrop_value_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class airdrop_value_calculatorCalculatorCalculator implements Calculator<airdrop_value_calculatorCalculatorInputs, airdrop_value_calculatorCalculatorResults> {
  readonly id = 'airdrop_value_calculatorCalculator';
  readonly name = 'airdrop_value_calculatorCalculator Calculator';
  readonly description = 'Calculate airdrop_value_calculatorCalculator values';

  calculate(inputs: airdrop_value_calculatorCalculatorInputs): airdrop_value_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: airdrop_value_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: airdrop_value_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
