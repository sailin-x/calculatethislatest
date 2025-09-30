import { Calculator } from '../../engines/CalculatorEngine';
import { financial_wisdom_calculatorCalculatorInputs, financial_wisdom_calculatorCalculatorResults, financial_wisdom_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_wisdom_calculatorCalculatorCalculator implements Calculator<financial_wisdom_calculatorCalculatorInputs, financial_wisdom_calculatorCalculatorResults> {
  readonly id = 'financial_wisdom_calculatorCalculator';
  readonly name = 'financial_wisdom_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_wisdom_calculatorCalculator values';

  calculate(inputs: financial_wisdom_calculatorCalculatorInputs): financial_wisdom_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_wisdom_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_wisdom_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
