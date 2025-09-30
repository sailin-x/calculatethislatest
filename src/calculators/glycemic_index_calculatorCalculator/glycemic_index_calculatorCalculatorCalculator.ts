import { Calculator } from '../../engines/CalculatorEngine';
import { glycemic_index_calculatorCalculatorInputs, glycemic_index_calculatorCalculatorResults, glycemic_index_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class glycemic_index_calculatorCalculatorCalculator implements Calculator<glycemic_index_calculatorCalculatorInputs, glycemic_index_calculatorCalculatorResults> {
  readonly id = 'glycemic_index_calculatorCalculator';
  readonly name = 'glycemic_index_calculatorCalculator Calculator';
  readonly description = 'Calculate glycemic_index_calculatorCalculator values';

  calculate(inputs: glycemic_index_calculatorCalculatorInputs): glycemic_index_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: glycemic_index_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: glycemic_index_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
