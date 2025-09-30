import { Calculator } from '../../engines/CalculatorEngine';
import { financial_alignment_calculatorCalculatorInputs, financial_alignment_calculatorCalculatorResults, financial_alignment_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_alignment_calculatorCalculatorCalculator implements Calculator<financial_alignment_calculatorCalculatorInputs, financial_alignment_calculatorCalculatorResults> {
  readonly id = 'financial_alignment_calculatorCalculator';
  readonly name = 'financial_alignment_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_alignment_calculatorCalculator values';

  calculate(inputs: financial_alignment_calculatorCalculatorInputs): financial_alignment_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_alignment_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_alignment_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
