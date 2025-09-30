import { Calculator } from '../../engines/CalculatorEngine';
import { chlorine_calculatorCalculatorInputs, chlorine_calculatorCalculatorResults, chlorine_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class chlorine_calculatorCalculatorCalculator implements Calculator<chlorine_calculatorCalculatorInputs, chlorine_calculatorCalculatorResults> {
  readonly id = 'chlorine_calculatorCalculator';
  readonly name = 'chlorine_calculatorCalculator Calculator';
  readonly description = 'Calculate chlorine_calculatorCalculator values';

  calculate(inputs: chlorine_calculatorCalculatorInputs): chlorine_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: chlorine_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: chlorine_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
