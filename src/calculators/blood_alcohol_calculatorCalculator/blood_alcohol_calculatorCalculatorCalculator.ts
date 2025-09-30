import { Calculator } from '../../engines/CalculatorEngine';
import { blood_alcohol_calculatorCalculatorInputs, blood_alcohol_calculatorCalculatorResults, blood_alcohol_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class blood_alcohol_calculatorCalculatorCalculator implements Calculator<blood_alcohol_calculatorCalculatorInputs, blood_alcohol_calculatorCalculatorResults> {
  readonly id = 'blood_alcohol_calculatorCalculator';
  readonly name = 'blood_alcohol_calculatorCalculator Calculator';
  readonly description = 'Calculate blood_alcohol_calculatorCalculator values';

  calculate(inputs: blood_alcohol_calculatorCalculatorInputs): blood_alcohol_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: blood_alcohol_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: blood_alcohol_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
