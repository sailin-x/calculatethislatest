import { Calculator } from '../../engines/CalculatorEngine';
import { financial_success_calculatorCalculatorInputs, financial_success_calculatorCalculatorResults, financial_success_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_success_calculatorCalculatorCalculator implements Calculator<financial_success_calculatorCalculatorInputs, financial_success_calculatorCalculatorResults> {
  readonly id = 'financial_success_calculatorCalculator';
  readonly name = 'financial_success_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_success_calculatorCalculator values';

  calculate(inputs: financial_success_calculatorCalculatorInputs): financial_success_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_success_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_success_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
