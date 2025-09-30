import { Calculator } from '../../engines/CalculatorEngine';
import { amazon_fba_profit_calculatorCalculatorInputs, amazon_fba_profit_calculatorCalculatorResults, amazon_fba_profit_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class amazon_fba_profit_calculatorCalculatorCalculator implements Calculator<amazon_fba_profit_calculatorCalculatorInputs, amazon_fba_profit_calculatorCalculatorResults> {
  readonly id = 'amazon_fba_profit_calculatorCalculator';
  readonly name = 'amazon_fba_profit_calculatorCalculator Calculator';
  readonly description = 'Calculate amazon_fba_profit_calculatorCalculator values';

  calculate(inputs: amazon_fba_profit_calculatorCalculatorInputs): amazon_fba_profit_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: amazon_fba_profit_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: amazon_fba_profit_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
