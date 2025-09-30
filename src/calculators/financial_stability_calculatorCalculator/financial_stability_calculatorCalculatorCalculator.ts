import { Calculator } from '../../engines/CalculatorEngine';
import { financial_stability_calculatorCalculatorInputs, financial_stability_calculatorCalculatorResults, financial_stability_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_stability_calculatorCalculatorCalculator implements Calculator<financial_stability_calculatorCalculatorInputs, financial_stability_calculatorCalculatorResults> {
  readonly id = 'financial_stability_calculatorCalculator';
  readonly name = 'financial_stability_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_stability_calculatorCalculator values';

  calculate(inputs: financial_stability_calculatorCalculatorInputs): financial_stability_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_stability_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_stability_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
