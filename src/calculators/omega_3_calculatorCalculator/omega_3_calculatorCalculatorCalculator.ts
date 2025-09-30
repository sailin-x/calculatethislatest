import { Calculator } from '../../engines/CalculatorEngine';
import { omega_3_calculatorCalculatorInputs, omega_3_calculatorCalculatorResults, omega_3_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class omega_3_calculatorCalculatorCalculator implements Calculator<omega_3_calculatorCalculatorInputs, omega_3_calculatorCalculatorResults> {
  readonly id = 'omega_3_calculatorCalculator';
  readonly name = 'omega_3_calculatorCalculator Calculator';
  readonly description = 'Calculate omega_3_calculatorCalculator values';

  calculate(inputs: omega_3_calculatorCalculatorInputs): omega_3_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: omega_3_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: omega_3_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
