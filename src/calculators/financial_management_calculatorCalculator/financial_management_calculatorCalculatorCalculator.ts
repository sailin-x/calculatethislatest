import { Calculator } from '../../engines/CalculatorEngine';
import { financial_management_calculatorCalculatorInputs, financial_management_calculatorCalculatorResults, financial_management_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_management_calculatorCalculatorCalculator implements Calculator<financial_management_calculatorCalculatorInputs, financial_management_calculatorCalculatorResults> {
  readonly id = 'financial_management_calculatorCalculator';
  readonly name = 'financial_management_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_management_calculatorCalculator values';

  calculate(inputs: financial_management_calculatorCalculatorInputs): financial_management_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_management_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_management_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
