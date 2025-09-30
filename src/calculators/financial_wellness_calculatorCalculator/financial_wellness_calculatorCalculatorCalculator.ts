import { Calculator } from '../../engines/CalculatorEngine';
import { financial_wellness_calculatorCalculatorInputs, financial_wellness_calculatorCalculatorResults, financial_wellness_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_wellness_calculatorCalculatorCalculator implements Calculator<financial_wellness_calculatorCalculatorInputs, financial_wellness_calculatorCalculatorResults> {
  readonly id = 'financial_wellness_calculatorCalculator';
  readonly name = 'financial_wellness_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_wellness_calculatorCalculator values';

  calculate(inputs: financial_wellness_calculatorCalculatorInputs): financial_wellness_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_wellness_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_wellness_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
