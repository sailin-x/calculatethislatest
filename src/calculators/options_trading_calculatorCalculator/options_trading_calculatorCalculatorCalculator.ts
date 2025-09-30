import { Calculator } from '../../engines/CalculatorEngine';
import { options_trading_calculatorCalculatorInputs, options_trading_calculatorCalculatorResults, options_trading_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class options_trading_calculatorCalculatorCalculator implements Calculator<options_trading_calculatorCalculatorInputs, options_trading_calculatorCalculatorResults> {
  readonly id = 'options_trading_calculatorCalculator';
  readonly name = 'options_trading_calculatorCalculator Calculator';
  readonly description = 'Calculate options_trading_calculatorCalculator values';

  calculate(inputs: options_trading_calculatorCalculatorInputs): options_trading_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: options_trading_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: options_trading_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
