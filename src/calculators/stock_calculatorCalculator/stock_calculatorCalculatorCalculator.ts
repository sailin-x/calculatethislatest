import { Calculator } from '../../engines/CalculatorEngine';
import { stock_calculatorCalculatorInputs, stock_calculatorCalculatorResults, stock_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class stock_calculatorCalculatorCalculator implements Calculator<stock_calculatorCalculatorInputs, stock_calculatorCalculatorResults> {
  readonly id = 'stock_calculatorCalculator';
  readonly name = 'stock_calculatorCalculator Calculator';
  readonly description = 'Calculate stock_calculatorCalculator values';

  calculate(inputs: stock_calculatorCalculatorInputs): stock_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: stock_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: stock_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
