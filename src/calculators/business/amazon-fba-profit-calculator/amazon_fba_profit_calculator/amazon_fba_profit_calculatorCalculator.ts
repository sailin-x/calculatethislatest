import { Calculator } from '../../engines/CalculatorEngine';
import { amazon_fba_profit_calculatorInputs, amazon_fba_profit_calculatorResults, amazon_fba_profit_calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class amazon_fba_profit_calculatorCalculator implements Calculator<amazon_fba_profit_calculatorInputs, amazon_fba_profit_calculatorResults> {
  readonly id = 'amazon_fba_profit_calculator';
  readonly name = 'amazon_fba_profit_calculator Calculator';
  readonly description = 'Calculate amazon_fba_profit_calculator values';

  calculate(inputs: amazon_fba_profit_calculatorInputs): amazon_fba_profit_calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: amazon_fba_profit_calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: amazon_fba_profit_calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
