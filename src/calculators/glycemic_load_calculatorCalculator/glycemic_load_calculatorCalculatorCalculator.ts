import { Calculator } from '../../engines/CalculatorEngine';
import { glycemic_load_calculatorCalculatorInputs, glycemic_load_calculatorCalculatorResults, glycemic_load_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class glycemic_load_calculatorCalculatorCalculator implements Calculator<glycemic_load_calculatorCalculatorInputs, glycemic_load_calculatorCalculatorResults> {
  readonly id = 'glycemic_load_calculatorCalculator';
  readonly name = 'glycemic_load_calculatorCalculator Calculator';
  readonly description = 'Calculate glycemic_load_calculatorCalculator values';

  calculate(inputs: glycemic_load_calculatorCalculatorInputs): glycemic_load_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: glycemic_load_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: glycemic_load_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
