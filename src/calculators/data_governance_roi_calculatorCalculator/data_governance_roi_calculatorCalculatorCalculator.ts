import { Calculator } from '../../engines/CalculatorEngine';
import { data_governance_roi_calculatorCalculatorInputs, data_governance_roi_calculatorCalculatorResults, data_governance_roi_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class data_governance_roi_calculatorCalculatorCalculator implements Calculator<data_governance_roi_calculatorCalculatorInputs, data_governance_roi_calculatorCalculatorResults> {
  readonly id = 'data_governance_roi_calculatorCalculator';
  readonly name = 'data_governance_roi_calculatorCalculator Calculator';
  readonly description = 'Calculate data_governance_roi_calculatorCalculator values';

  calculate(inputs: data_governance_roi_calculatorCalculatorInputs): data_governance_roi_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: data_governance_roi_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: data_governance_roi_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
