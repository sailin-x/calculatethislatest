import { Calculator } from '../../engines/CalculatorEngine';
import { futures_trading_profitability_calculatorCalculatorInputs, futures_trading_profitability_calculatorCalculatorResults, futures_trading_profitability_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class futures_trading_profitability_calculatorCalculatorCalculator implements Calculator<futures_trading_profitability_calculatorCalculatorInputs, futures_trading_profitability_calculatorCalculatorResults> {
  readonly id = 'futures_trading_profitability_calculatorCalculator';
  readonly name = 'futures_trading_profitability_calculatorCalculator Calculator';
  readonly description = 'Calculate futures_trading_profitability_calculatorCalculator values';

  calculate(inputs: futures_trading_profitability_calculatorCalculatorInputs): futures_trading_profitability_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: futures_trading_profitability_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: futures_trading_profitability_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
