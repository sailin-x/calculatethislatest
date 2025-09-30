import { Calculator } from '../../engines/CalculatorEngine';
import { gross_margin_calculatorCalculatorInputs, gross_margin_calculatorCalculatorResults, gross_margin_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class gross_margin_calculatorCalculatorCalculator implements Calculator<gross_margin_calculatorCalculatorInputs, gross_margin_calculatorCalculatorResults> {
  readonly id = 'gross_margin_calculatorCalculator';
  readonly name = 'gross_margin_calculatorCalculator Calculator';
  readonly description = 'Calculate gross_margin_calculatorCalculator values';

  calculate(inputs: gross_margin_calculatorCalculatorInputs): gross_margin_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: gross_margin_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: gross_margin_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
