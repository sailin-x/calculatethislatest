import { Calculator } from '../../engines/CalculatorEngine';
import { networking_calculatorCalculatorInputs, networking_calculatorCalculatorResults, networking_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class networking_calculatorCalculatorCalculator implements Calculator<networking_calculatorCalculatorInputs, networking_calculatorCalculatorResults> {
  readonly id = 'networking_calculatorCalculator';
  readonly name = 'networking_calculatorCalculator Calculator';
  readonly description = 'Calculate networking_calculatorCalculator values';

  calculate(inputs: networking_calculatorCalculatorInputs): networking_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: networking_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: networking_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
