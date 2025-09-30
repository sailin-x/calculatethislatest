import { Calculator } from '../../engines/CalculatorEngine';
import { crypto_staking_profitability_calculator_exists_but_needs_registrationCalculatorInputs, crypto_staking_profitability_calculator_exists_but_needs_registrationCalculatorResults, crypto_staking_profitability_calculator_exists_but_needs_registrationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class crypto_staking_profitability_calculator_exists_but_needs_registrationCalculatorCalculator implements Calculator<crypto_staking_profitability_calculator_exists_but_needs_registrationCalculatorInputs, crypto_staking_profitability_calculator_exists_but_needs_registrationCalculatorResults> {
  readonly id = 'crypto_staking_profitability_calculator_exists_but_needs_registrationCalculator';
  readonly name = 'crypto_staking_profitability_calculator_exists_but_needs_registrationCalculator Calculator';
  readonly description = 'Calculate crypto_staking_profitability_calculator_exists_but_needs_registrationCalculator values';

  calculate(inputs: crypto_staking_profitability_calculator_exists_but_needs_registrationCalculatorInputs): crypto_staking_profitability_calculator_exists_but_needs_registrationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: crypto_staking_profitability_calculator_exists_but_needs_registrationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: crypto_staking_profitability_calculator_exists_but_needs_registrationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
