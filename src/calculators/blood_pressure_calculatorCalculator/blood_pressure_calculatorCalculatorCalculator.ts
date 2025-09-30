import { Calculator } from '../../engines/CalculatorEngine';
import { blood_pressure_calculatorCalculatorInputs, blood_pressure_calculatorCalculatorResults, blood_pressure_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class blood_pressure_calculatorCalculatorCalculator implements Calculator<blood_pressure_calculatorCalculatorInputs, blood_pressure_calculatorCalculatorResults> {
  readonly id = 'blood_pressure_calculatorCalculator';
  readonly name = 'blood_pressure_calculatorCalculator Calculator';
  readonly description = 'Calculate blood_pressure_calculatorCalculator values';

  calculate(inputs: blood_pressure_calculatorCalculatorInputs): blood_pressure_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: blood_pressure_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: blood_pressure_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
