import { Calculator } from '../../engines/CalculatorEngine';
import { car_payment_calculatorCalculatorInputs, car_payment_calculatorCalculatorResults, car_payment_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class car_payment_calculatorCalculatorCalculator implements Calculator<car_payment_calculatorCalculatorInputs, car_payment_calculatorCalculatorResults> {
  readonly id = 'car_payment_calculatorCalculator';
  readonly name = 'car_payment_calculatorCalculator Calculator';
  readonly description = 'Calculate car_payment_calculatorCalculator values';

  calculate(inputs: car_payment_calculatorCalculatorInputs): car_payment_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: car_payment_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: car_payment_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
