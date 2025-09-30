import { Calculator } from '../../engines/CalculatorEngine';
import { hardiness_calculatorCalculatorInputs, hardiness_calculatorCalculatorResults, hardiness_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class hardiness_calculatorCalculatorCalculator implements Calculator<hardiness_calculatorCalculatorInputs, hardiness_calculatorCalculatorResults> {
  readonly id = 'hardiness_calculatorCalculator';
  readonly name = 'hardiness_calculatorCalculator Calculator';
  readonly description = 'Calculate hardiness_calculatorCalculator values';

  calculate(inputs: hardiness_calculatorCalculatorInputs): hardiness_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: hardiness_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: hardiness_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
