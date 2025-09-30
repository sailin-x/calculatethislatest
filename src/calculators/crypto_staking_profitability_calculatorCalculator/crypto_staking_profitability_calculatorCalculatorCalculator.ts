import { Calculator } from '../../engines/CalculatorEngine';
import { crypto_staking_profitability_calculatorCalculatorInputs, crypto_staking_profitability_calculatorCalculatorResults, crypto_staking_profitability_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class crypto_staking_profitability_calculatorCalculatorCalculator implements Calculator<crypto_staking_profitability_calculatorCalculatorInputs, crypto_staking_profitability_calculatorCalculatorResults> {
  readonly id = 'crypto_staking_profitability_calculatorCalculator';
  readonly name = 'crypto_staking_profitability_calculatorCalculator Calculator';
  readonly description = 'Calculate crypto_staking_profitability_calculatorCalculator values';

  calculate(inputs: crypto_staking_profitability_calculatorCalculatorInputs): crypto_staking_profitability_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: crypto_staking_profitability_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: crypto_staking_profitability_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
