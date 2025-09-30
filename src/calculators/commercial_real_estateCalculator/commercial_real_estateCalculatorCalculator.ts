import { Calculator } from '../../engines/CalculatorEngine';
import { commercial_real_estateCalculatorInputs, commercial_real_estateCalculatorResults, commercial_real_estateCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class commercial_real_estateCalculatorCalculator implements Calculator<commercial_real_estateCalculatorInputs, commercial_real_estateCalculatorResults> {
  readonly id = 'commercial_real_estateCalculator';
  readonly name = 'commercial_real_estateCalculator Calculator';
  readonly description = 'Calculate commercial_real_estateCalculator values';

  calculate(inputs: commercial_real_estateCalculatorInputs): commercial_real_estateCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: commercial_real_estateCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: commercial_real_estateCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
