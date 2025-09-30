import { Calculator } from '../../engines/CalculatorEngine';
import { financial_joy_calculatorCalculatorInputs, financial_joy_calculatorCalculatorResults, financial_joy_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_joy_calculatorCalculatorCalculator implements Calculator<financial_joy_calculatorCalculatorInputs, financial_joy_calculatorCalculatorResults> {
  readonly id = 'financial_joy_calculatorCalculator';
  readonly name = 'financial_joy_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_joy_calculatorCalculator values';

  calculate(inputs: financial_joy_calculatorCalculatorInputs): financial_joy_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_joy_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_joy_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
