import { Calculator } from '../../engines/CalculatorEngine';
import { financial_legacy_calculatorCalculatorInputs, financial_legacy_calculatorCalculatorResults, financial_legacy_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_legacy_calculatorCalculatorCalculator implements Calculator<financial_legacy_calculatorCalculatorInputs, financial_legacy_calculatorCalculatorResults> {
  readonly id = 'financial_legacy_calculatorCalculator';
  readonly name = 'financial_legacy_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_legacy_calculatorCalculator values';

  calculate(inputs: financial_legacy_calculatorCalculatorInputs): financial_legacy_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_legacy_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_legacy_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
