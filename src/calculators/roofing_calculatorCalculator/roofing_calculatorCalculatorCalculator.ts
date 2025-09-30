import { Calculator } from '../../engines/CalculatorEngine';
import { roofing_calculatorCalculatorInputs, roofing_calculatorCalculatorResults, roofing_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class roofing_calculatorCalculatorCalculator implements Calculator<roofing_calculatorCalculatorInputs, roofing_calculatorCalculatorResults> {
  readonly id = 'roofing_calculatorCalculator';
  readonly name = 'roofing_calculatorCalculator Calculator';
  readonly description = 'Calculate roofing_calculatorCalculator values';

  calculate(inputs: roofing_calculatorCalculatorInputs): roofing_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: roofing_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: roofing_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
