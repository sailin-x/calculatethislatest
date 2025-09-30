import { Calculator } from '../../engines/CalculatorEngine';
import { financial_velocity_calculatorCalculatorInputs, financial_velocity_calculatorCalculatorResults, financial_velocity_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_velocity_calculatorCalculatorCalculator implements Calculator<financial_velocity_calculatorCalculatorInputs, financial_velocity_calculatorCalculatorResults> {
  readonly id = 'financial_velocity_calculatorCalculator';
  readonly name = 'financial_velocity_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_velocity_calculatorCalculator values';

  calculate(inputs: financial_velocity_calculatorCalculatorInputs): financial_velocity_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_velocity_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_velocity_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
