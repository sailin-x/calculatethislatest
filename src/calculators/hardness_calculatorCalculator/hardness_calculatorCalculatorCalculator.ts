import { Calculator } from '../../engines/CalculatorEngine';
import { hardness_calculatorCalculatorInputs, hardness_calculatorCalculatorResults, hardness_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class hardness_calculatorCalculatorCalculator implements Calculator<hardness_calculatorCalculatorInputs, hardness_calculatorCalculatorResults> {
  readonly id = 'hardness_calculatorCalculator';
  readonly name = 'hardness_calculatorCalculator Calculator';
  readonly description = 'Calculate hardness_calculatorCalculator values';

  calculate(inputs: hardness_calculatorCalculatorInputs): hardness_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: hardness_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: hardness_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
