import { Calculator } from '../../engines/CalculatorEngine';
import { heart_rate_variability_calculatorCalculatorInputs, heart_rate_variability_calculatorCalculatorResults, heart_rate_variability_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class heart_rate_variability_calculatorCalculatorCalculator implements Calculator<heart_rate_variability_calculatorCalculatorInputs, heart_rate_variability_calculatorCalculatorResults> {
  readonly id = 'heart_rate_variability_calculatorCalculator';
  readonly name = 'heart_rate_variability_calculatorCalculator Calculator';
  readonly description = 'Calculate heart_rate_variability_calculatorCalculator values';

  calculate(inputs: heart_rate_variability_calculatorCalculatorInputs): heart_rate_variability_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: heart_rate_variability_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: heart_rate_variability_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
