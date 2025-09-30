import { Calculator } from '../../engines/CalculatorEngine';
import { registerRentVsBuyCalculatorInputs, registerRentVsBuyCalculatorResults, registerRentVsBuyCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerRentVsBuyCalculatorCalculator implements Calculator<registerRentVsBuyCalculatorInputs, registerRentVsBuyCalculatorResults> {
  readonly id = 'registerRentVsBuyCalculator';
  readonly name = 'registerRentVsBuyCalculator Calculator';
  readonly description = 'Calculate registerRentVsBuyCalculator values';

  calculate(inputs: registerRentVsBuyCalculatorInputs): registerRentVsBuyCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerRentVsBuyCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerRentVsBuyCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
