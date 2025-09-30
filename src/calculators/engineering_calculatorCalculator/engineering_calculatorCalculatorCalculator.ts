import { Calculator } from '../../engines/CalculatorEngine';
import { engineering_calculatorCalculatorInputs, engineering_calculatorCalculatorResults, engineering_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class engineering_calculatorCalculatorCalculator implements Calculator<engineering_calculatorCalculatorInputs, engineering_calculatorCalculatorResults> {
  readonly id = 'engineering_calculatorCalculator';
  readonly name = 'engineering_calculatorCalculator Calculator';
  readonly description = 'Calculate engineering_calculatorCalculator values';

  calculate(inputs: engineering_calculatorCalculatorInputs): engineering_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: engineering_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: engineering_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
