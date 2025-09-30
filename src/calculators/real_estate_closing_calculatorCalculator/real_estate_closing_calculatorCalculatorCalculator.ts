import { Calculator } from '../../engines/CalculatorEngine';
import { real_estate_closing_calculatorCalculatorInputs, real_estate_closing_calculatorCalculatorResults, real_estate_closing_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class real_estate_closing_calculatorCalculatorCalculator implements Calculator<real_estate_closing_calculatorCalculatorInputs, real_estate_closing_calculatorCalculatorResults> {
  readonly id = 'real_estate_closing_calculatorCalculator';
  readonly name = 'real_estate_closing_calculatorCalculator Calculator';
  readonly description = 'Calculate real_estate_closing_calculatorCalculator values';

  calculate(inputs: real_estate_closing_calculatorCalculatorInputs): real_estate_closing_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: real_estate_closing_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: real_estate_closing_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
