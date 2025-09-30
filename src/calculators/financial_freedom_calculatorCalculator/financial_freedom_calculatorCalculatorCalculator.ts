import { Calculator } from '../../engines/CalculatorEngine';
import { financial_freedom_calculatorCalculatorInputs, financial_freedom_calculatorCalculatorResults, financial_freedom_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_freedom_calculatorCalculatorCalculator implements Calculator<financial_freedom_calculatorCalculatorInputs, financial_freedom_calculatorCalculatorResults> {
  readonly id = 'financial_freedom_calculatorCalculator';
  readonly name = 'financial_freedom_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_freedom_calculatorCalculator values';

  calculate(inputs: financial_freedom_calculatorCalculatorInputs): financial_freedom_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_freedom_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_freedom_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
