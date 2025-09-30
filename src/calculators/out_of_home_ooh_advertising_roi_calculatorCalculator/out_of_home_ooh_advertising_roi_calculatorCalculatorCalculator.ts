import { Calculator } from '../../engines/CalculatorEngine';
import { out_of_home_ooh_advertising_roi_calculatorCalculatorInputs, out_of_home_ooh_advertising_roi_calculatorCalculatorResults, out_of_home_ooh_advertising_roi_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class out_of_home_ooh_advertising_roi_calculatorCalculatorCalculator implements Calculator<out_of_home_ooh_advertising_roi_calculatorCalculatorInputs, out_of_home_ooh_advertising_roi_calculatorCalculatorResults> {
  readonly id = 'out_of_home_ooh_advertising_roi_calculatorCalculator';
  readonly name = 'out_of_home_ooh_advertising_roi_calculatorCalculator Calculator';
  readonly description = 'Calculate out_of_home_ooh_advertising_roi_calculatorCalculator values';

  calculate(inputs: out_of_home_ooh_advertising_roi_calculatorCalculatorInputs): out_of_home_ooh_advertising_roi_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: out_of_home_ooh_advertising_roi_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: out_of_home_ooh_advertising_roi_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
