import { Calculator } from '../../engines/CalculatorEngine';
import { irrigation_calculatorCalculatorInputs, irrigation_calculatorCalculatorResults, irrigation_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class irrigation_calculatorCalculatorCalculator implements Calculator<irrigation_calculatorCalculatorInputs, irrigation_calculatorCalculatorResults> {
  readonly id = 'irrigation_calculatorCalculator';
  readonly name = 'irrigation_calculatorCalculator Calculator';
  readonly description = 'Calculate irrigation_calculatorCalculator values';

  calculate(inputs: irrigation_calculatorCalculatorInputs): irrigation_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: irrigation_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: irrigation_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
