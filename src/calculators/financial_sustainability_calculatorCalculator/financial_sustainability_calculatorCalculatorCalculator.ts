import { Calculator } from '../../engines/CalculatorEngine';
import { financial_sustainability_calculatorCalculatorInputs, financial_sustainability_calculatorCalculatorResults, financial_sustainability_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_sustainability_calculatorCalculatorCalculator implements Calculator<financial_sustainability_calculatorCalculatorInputs, financial_sustainability_calculatorCalculatorResults> {
  readonly id = 'financial_sustainability_calculatorCalculator';
  readonly name = 'financial_sustainability_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_sustainability_calculatorCalculator values';

  calculate(inputs: financial_sustainability_calculatorCalculatorInputs): financial_sustainability_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_sustainability_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_sustainability_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
