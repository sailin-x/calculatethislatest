import { Calculator } from '../../engines/CalculatorEngine';
import { crypto_portfolio_rebalancing_calculatorCalculatorInputs, crypto_portfolio_rebalancing_calculatorCalculatorResults, crypto_portfolio_rebalancing_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class crypto_portfolio_rebalancing_calculatorCalculatorCalculator implements Calculator<crypto_portfolio_rebalancing_calculatorCalculatorInputs, crypto_portfolio_rebalancing_calculatorCalculatorResults> {
  readonly id = 'crypto_portfolio_rebalancing_calculatorCalculator';
  readonly name = 'crypto_portfolio_rebalancing_calculatorCalculator Calculator';
  readonly description = 'Calculate crypto_portfolio_rebalancing_calculatorCalculator values';

  calculate(inputs: crypto_portfolio_rebalancing_calculatorCalculatorInputs): crypto_portfolio_rebalancing_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: crypto_portfolio_rebalancing_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: crypto_portfolio_rebalancing_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
