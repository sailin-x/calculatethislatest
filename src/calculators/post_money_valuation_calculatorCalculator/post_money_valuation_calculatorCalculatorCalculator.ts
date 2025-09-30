import { Calculator } from '../../engines/CalculatorEngine';
import { post_money_valuation_calculatorCalculatorInputs, post_money_valuation_calculatorCalculatorResults, post_money_valuation_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class post_money_valuation_calculatorCalculatorCalculator implements Calculator<post_money_valuation_calculatorCalculatorInputs, post_money_valuation_calculatorCalculatorResults> {
  readonly id = 'post_money_valuation_calculatorCalculator';
  readonly name = 'post_money_valuation_calculatorCalculator Calculator';
  readonly description = 'Calculate post_money_valuation_calculatorCalculator values';

  calculate(inputs: post_money_valuation_calculatorCalculatorInputs): post_money_valuation_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: post_money_valuation_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: post_money_valuation_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
