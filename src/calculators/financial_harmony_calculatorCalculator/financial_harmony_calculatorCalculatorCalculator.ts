import { Calculator } from '../../engines/CalculatorEngine';
import { financial_harmony_calculatorCalculatorInputs, financial_harmony_calculatorCalculatorResults, financial_harmony_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_harmony_calculatorCalculatorCalculator implements Calculator<financial_harmony_calculatorCalculatorInputs, financial_harmony_calculatorCalculatorResults> {
  readonly id = 'financial_harmony_calculatorCalculator';
  readonly name = 'financial_harmony_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_harmony_calculatorCalculator values';

  calculate(inputs: financial_harmony_calculatorCalculatorInputs): financial_harmony_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_harmony_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_harmony_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
