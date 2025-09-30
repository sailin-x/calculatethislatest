import { Calculator } from '../../engines/CalculatorEngine';
import { financial_resilience_calculatorCalculatorInputs, financial_resilience_calculatorCalculatorResults, financial_resilience_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_resilience_calculatorCalculatorCalculator implements Calculator<financial_resilience_calculatorCalculatorInputs, financial_resilience_calculatorCalculatorResults> {
  readonly id = 'financial_resilience_calculatorCalculator';
  readonly name = 'financial_resilience_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_resilience_calculatorCalculator values';

  calculate(inputs: financial_resilience_calculatorCalculatorInputs): financial_resilience_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_resilience_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_resilience_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
