import { Calculator } from '../../engines/CalculatorEngine';
import { financial_efficiency_calculatorCalculatorInputs, financial_efficiency_calculatorCalculatorResults, financial_efficiency_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_efficiency_calculatorCalculatorCalculator implements Calculator<financial_efficiency_calculatorCalculatorInputs, financial_efficiency_calculatorCalculatorResults> {
  readonly id = 'financial_efficiency_calculatorCalculator';
  readonly name = 'financial_efficiency_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_efficiency_calculatorCalculator values';

  calculate(inputs: financial_efficiency_calculatorCalculatorInputs): financial_efficiency_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_efficiency_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_efficiency_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
