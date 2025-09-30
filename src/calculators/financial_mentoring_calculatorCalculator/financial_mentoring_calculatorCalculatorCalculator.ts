import { Calculator } from '../../engines/CalculatorEngine';
import { financial_mentoring_calculatorCalculatorInputs, financial_mentoring_calculatorCalculatorResults, financial_mentoring_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_mentoring_calculatorCalculatorCalculator implements Calculator<financial_mentoring_calculatorCalculatorInputs, financial_mentoring_calculatorCalculatorResults> {
  readonly id = 'financial_mentoring_calculatorCalculator';
  readonly name = 'financial_mentoring_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_mentoring_calculatorCalculator values';

  calculate(inputs: financial_mentoring_calculatorCalculatorInputs): financial_mentoring_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_mentoring_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_mentoring_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
