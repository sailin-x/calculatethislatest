import { Calculator } from '../../engines/CalculatorEngine';
import { financial_peace_calculatorCalculatorInputs, financial_peace_calculatorCalculatorResults, financial_peace_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_peace_calculatorCalculatorCalculator implements Calculator<financial_peace_calculatorCalculatorInputs, financial_peace_calculatorCalculatorResults> {
  readonly id = 'financial_peace_calculatorCalculator';
  readonly name = 'financial_peace_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_peace_calculatorCalculator values';

  calculate(inputs: financial_peace_calculatorCalculatorInputs): financial_peace_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_peace_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_peace_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
