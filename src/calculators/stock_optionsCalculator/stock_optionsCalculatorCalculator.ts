import { Calculator } from '../../engines/CalculatorEngine';
import { stock_optionsCalculatorInputs, stock_optionsCalculatorResults, stock_optionsCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class stock_optionsCalculatorCalculator implements Calculator<stock_optionsCalculatorInputs, stock_optionsCalculatorResults> {
  readonly id = 'stock_optionsCalculator';
  readonly name = 'stock_optionsCalculator Calculator';
  readonly description = 'Calculate stock_optionsCalculator values';

  calculate(inputs: stock_optionsCalculatorInputs): stock_optionsCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: stock_optionsCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: stock_optionsCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
