import { Calculator } from '../../engines/CalculatorEngine';
import { stock_options_calculatorCalculatorInputs, stock_options_calculatorCalculatorResults, stock_options_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class stock_options_calculatorCalculatorCalculator implements Calculator<stock_options_calculatorCalculatorInputs, stock_options_calculatorCalculatorResults> {
  readonly id = 'stock_options_calculatorCalculator';
  readonly name = 'stock_options_calculatorCalculator Calculator';
  readonly description = 'Calculate stock_options_calculatorCalculator values';

  calculate(inputs: stock_options_calculatorCalculatorInputs): stock_options_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: stock_options_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: stock_options_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
