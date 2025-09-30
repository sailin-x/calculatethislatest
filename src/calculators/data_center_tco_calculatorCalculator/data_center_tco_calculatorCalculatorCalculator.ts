import { Calculator } from '../../engines/CalculatorEngine';
import { data_center_tco_calculatorCalculatorInputs, data_center_tco_calculatorCalculatorResults, data_center_tco_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class data_center_tco_calculatorCalculatorCalculator implements Calculator<data_center_tco_calculatorCalculatorInputs, data_center_tco_calculatorCalculatorResults> {
  readonly id = 'data_center_tco_calculatorCalculator';
  readonly name = 'data_center_tco_calculatorCalculator Calculator';
  readonly description = 'Calculate data_center_tco_calculatorCalculator values';

  calculate(inputs: data_center_tco_calculatorCalculatorInputs): data_center_tco_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: data_center_tco_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: data_center_tco_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
