import { Calculator } from '../../engines/CalculatorEngine';
import { operating_margin_calculatorCalculatorInputs, operating_margin_calculatorCalculatorResults, operating_margin_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class operating_margin_calculatorCalculatorCalculator implements Calculator<operating_margin_calculatorCalculatorInputs, operating_margin_calculatorCalculatorResults> {
  readonly id = 'operating_margin_calculatorCalculator';
  readonly name = 'operating_margin_calculatorCalculator Calculator';
  readonly description = 'Calculate operating_margin_calculatorCalculator values';

  calculate(inputs: operating_margin_calculatorCalculatorInputs): operating_margin_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: operating_margin_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: operating_margin_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
