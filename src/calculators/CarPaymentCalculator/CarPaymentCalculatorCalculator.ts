import { Calculator } from '../../engines/CalculatorEngine';
import { CarPaymentCalculatorInputs, CarPaymentCalculatorResults, CarPaymentCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class CarPaymentCalculatorCalculator implements Calculator<CarPaymentCalculatorInputs, CarPaymentCalculatorResults> {
  readonly id = 'CarPaymentCalculator';
  readonly name = 'CarPaymentCalculator Calculator';
  readonly description = 'Calculate CarPaymentCalculator values';

  calculate(inputs: CarPaymentCalculatorInputs): CarPaymentCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: CarPaymentCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: CarPaymentCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
