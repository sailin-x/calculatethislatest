import { Calculator } from '../../engines/CalculatorEngine';
import { lean_manufacturing_takt_time_calculatorCalculatorInputs, lean_manufacturing_takt_time_calculatorCalculatorResults, lean_manufacturing_takt_time_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class lean_manufacturing_takt_time_calculatorCalculatorCalculator implements Calculator<lean_manufacturing_takt_time_calculatorCalculatorInputs, lean_manufacturing_takt_time_calculatorCalculatorResults> {
  readonly id = 'lean_manufacturing_takt_time_calculatorCalculator';
  readonly name = 'lean_manufacturing_takt_time_calculatorCalculator Calculator';
  readonly description = 'Calculate lean_manufacturing_takt_time_calculatorCalculator values';

  calculate(inputs: lean_manufacturing_takt_time_calculatorCalculatorInputs): lean_manufacturing_takt_time_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: lean_manufacturing_takt_time_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: lean_manufacturing_takt_time_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
