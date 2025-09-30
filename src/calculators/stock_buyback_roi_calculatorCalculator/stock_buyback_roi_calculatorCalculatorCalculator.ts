import { Calculator } from '../../engines/CalculatorEngine';
import { stock_buyback_roi_calculatorCalculatorInputs, stock_buyback_roi_calculatorCalculatorResults, stock_buyback_roi_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class stock_buyback_roi_calculatorCalculatorCalculator implements Calculator<stock_buyback_roi_calculatorCalculatorInputs, stock_buyback_roi_calculatorCalculatorResults> {
  readonly id = 'stock_buyback_roi_calculatorCalculator';
  readonly name = 'stock_buyback_roi_calculatorCalculator Calculator';
  readonly description = 'Calculate stock_buyback_roi_calculatorCalculator values';

  calculate(inputs: stock_buyback_roi_calculatorCalculatorInputs): stock_buyback_roi_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: stock_buyback_roi_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: stock_buyback_roi_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
