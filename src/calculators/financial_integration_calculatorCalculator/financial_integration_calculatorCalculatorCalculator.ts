import { Calculator } from '../../engines/CalculatorEngine';
import { financial_integration_calculatorCalculatorInputs, financial_integration_calculatorCalculatorResults, financial_integration_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_integration_calculatorCalculatorCalculator implements Calculator<financial_integration_calculatorCalculatorInputs, financial_integration_calculatorCalculatorResults> {
  readonly id = 'financial_integration_calculatorCalculator';
  readonly name = 'financial_integration_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_integration_calculatorCalculator values';

  calculate(inputs: financial_integration_calculatorCalculatorInputs): financial_integration_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_integration_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_integration_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
