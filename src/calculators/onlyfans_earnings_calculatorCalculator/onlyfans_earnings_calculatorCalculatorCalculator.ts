import { Calculator } from '../../engines/CalculatorEngine';
import { onlyfans_earnings_calculatorCalculatorInputs, onlyfans_earnings_calculatorCalculatorResults, onlyfans_earnings_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class onlyfans_earnings_calculatorCalculatorCalculator implements Calculator<onlyfans_earnings_calculatorCalculatorInputs, onlyfans_earnings_calculatorCalculatorResults> {
  readonly id = 'onlyfans_earnings_calculatorCalculator';
  readonly name = 'onlyfans_earnings_calculatorCalculator Calculator';
  readonly description = 'Calculate onlyfans_earnings_calculatorCalculator values';

  calculate(inputs: onlyfans_earnings_calculatorCalculatorInputs): onlyfans_earnings_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: onlyfans_earnings_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: onlyfans_earnings_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
