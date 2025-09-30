import { Calculator } from '../../engines/CalculatorEngine';
import { financial_health_calculatorCalculatorInputs, financial_health_calculatorCalculatorResults, financial_health_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_health_calculatorCalculatorCalculator implements Calculator<financial_health_calculatorCalculatorInputs, financial_health_calculatorCalculatorResults> {
  readonly id = 'financial_health_calculatorCalculator';
  readonly name = 'financial_health_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_health_calculatorCalculator values';

  calculate(inputs: financial_health_calculatorCalculatorInputs): financial_health_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_health_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_health_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
