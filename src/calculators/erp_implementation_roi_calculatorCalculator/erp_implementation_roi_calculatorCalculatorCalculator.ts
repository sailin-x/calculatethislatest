import { Calculator } from '../../engines/CalculatorEngine';
import { erp_implementation_roi_calculatorCalculatorInputs, erp_implementation_roi_calculatorCalculatorResults, erp_implementation_roi_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class erp_implementation_roi_calculatorCalculatorCalculator implements Calculator<erp_implementation_roi_calculatorCalculatorInputs, erp_implementation_roi_calculatorCalculatorResults> {
  readonly id = 'erp_implementation_roi_calculatorCalculator';
  readonly name = 'erp_implementation_roi_calculatorCalculator Calculator';
  readonly description = 'Calculate erp_implementation_roi_calculatorCalculator values';

  calculate(inputs: erp_implementation_roi_calculatorCalculatorInputs): erp_implementation_roi_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: erp_implementation_roi_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: erp_implementation_roi_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
