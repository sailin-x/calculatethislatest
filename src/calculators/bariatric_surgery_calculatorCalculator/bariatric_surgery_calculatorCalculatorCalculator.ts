import { Calculator } from '../../engines/CalculatorEngine';
import { bariatric_surgery_calculatorCalculatorInputs, bariatric_surgery_calculatorCalculatorResults, bariatric_surgery_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class bariatric_surgery_calculatorCalculatorCalculator implements Calculator<bariatric_surgery_calculatorCalculatorInputs, bariatric_surgery_calculatorCalculatorResults> {
  readonly id = 'bariatric_surgery_calculatorCalculator';
  readonly name = 'bariatric_surgery_calculatorCalculator Calculator';
  readonly description = 'Calculate bariatric_surgery_calculatorCalculator values';

  calculate(inputs: bariatric_surgery_calculatorCalculatorInputs): bariatric_surgery_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: bariatric_surgery_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: bariatric_surgery_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
