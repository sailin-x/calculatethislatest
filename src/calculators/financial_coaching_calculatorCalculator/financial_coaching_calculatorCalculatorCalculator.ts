import { Calculator } from '../../engines/CalculatorEngine';
import { financial_coaching_calculatorCalculatorInputs, financial_coaching_calculatorCalculatorResults, financial_coaching_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_coaching_calculatorCalculatorCalculator implements Calculator<financial_coaching_calculatorCalculatorInputs, financial_coaching_calculatorCalculatorResults> {
  readonly id = 'financial_coaching_calculatorCalculator';
  readonly name = 'financial_coaching_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_coaching_calculatorCalculator values';

  calculate(inputs: financial_coaching_calculatorCalculatorInputs): financial_coaching_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_coaching_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_coaching_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
