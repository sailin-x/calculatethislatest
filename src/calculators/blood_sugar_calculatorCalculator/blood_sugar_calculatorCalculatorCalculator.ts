import { Calculator } from '../../engines/CalculatorEngine';
import { blood_sugar_calculatorCalculatorInputs, blood_sugar_calculatorCalculatorResults, blood_sugar_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class blood_sugar_calculatorCalculatorCalculator implements Calculator<blood_sugar_calculatorCalculatorInputs, blood_sugar_calculatorCalculatorResults> {
  readonly id = 'blood_sugar_calculatorCalculator';
  readonly name = 'blood_sugar_calculatorCalculator Calculator';
  readonly description = 'Calculate blood_sugar_calculatorCalculator values';

  calculate(inputs: blood_sugar_calculatorCalculatorInputs): blood_sugar_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: blood_sugar_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: blood_sugar_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
