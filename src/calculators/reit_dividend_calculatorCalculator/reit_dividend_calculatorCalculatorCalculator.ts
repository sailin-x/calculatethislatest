import { Calculator } from '../../engines/CalculatorEngine';
import { reit_dividend_calculatorCalculatorInputs, reit_dividend_calculatorCalculatorResults, reit_dividend_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class reit_dividend_calculatorCalculatorCalculator implements Calculator<reit_dividend_calculatorCalculatorInputs, reit_dividend_calculatorCalculatorResults> {
  readonly id = 'reit_dividend_calculatorCalculator';
  readonly name = 'reit_dividend_calculatorCalculator Calculator';
  readonly description = 'Calculate reit_dividend_calculatorCalculator values';

  calculate(inputs: reit_dividend_calculatorCalculatorInputs): reit_dividend_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: reit_dividend_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: reit_dividend_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
