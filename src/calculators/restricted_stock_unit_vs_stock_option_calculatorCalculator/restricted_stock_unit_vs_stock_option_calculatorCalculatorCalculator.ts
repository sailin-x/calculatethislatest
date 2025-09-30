import { Calculator } from '../../engines/CalculatorEngine';
import { restricted_stock_unit_vs_stock_option_calculatorCalculatorInputs, restricted_stock_unit_vs_stock_option_calculatorCalculatorResults, restricted_stock_unit_vs_stock_option_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class restricted_stock_unit_vs_stock_option_calculatorCalculatorCalculator implements Calculator<restricted_stock_unit_vs_stock_option_calculatorCalculatorInputs, restricted_stock_unit_vs_stock_option_calculatorCalculatorResults> {
  readonly id = 'restricted_stock_unit_vs_stock_option_calculatorCalculator';
  readonly name = 'restricted_stock_unit_vs_stock_option_calculatorCalculator Calculator';
  readonly description = 'Calculate restricted_stock_unit_vs_stock_option_calculatorCalculator values';

  calculate(inputs: restricted_stock_unit_vs_stock_option_calculatorCalculatorInputs): restricted_stock_unit_vs_stock_option_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: restricted_stock_unit_vs_stock_option_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: restricted_stock_unit_vs_stock_option_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
