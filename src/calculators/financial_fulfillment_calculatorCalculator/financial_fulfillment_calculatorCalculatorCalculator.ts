import { Calculator } from '../../engines/CalculatorEngine';
import { financial_fulfillment_calculatorCalculatorInputs, financial_fulfillment_calculatorCalculatorResults, financial_fulfillment_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_fulfillment_calculatorCalculatorCalculator implements Calculator<financial_fulfillment_calculatorCalculatorInputs, financial_fulfillment_calculatorCalculatorResults> {
  readonly id = 'financial_fulfillment_calculatorCalculator';
  readonly name = 'financial_fulfillment_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_fulfillment_calculatorCalculator values';

  calculate(inputs: financial_fulfillment_calculatorCalculatorInputs): financial_fulfillment_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_fulfillment_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_fulfillment_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
