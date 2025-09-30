import { Calculator } from '../../engines/CalculatorEngine';
import { public_private_partnership_p3_roi_calculatorCalculatorInputs, public_private_partnership_p3_roi_calculatorCalculatorResults, public_private_partnership_p3_roi_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class public_private_partnership_p3_roi_calculatorCalculatorCalculator implements Calculator<public_private_partnership_p3_roi_calculatorCalculatorInputs, public_private_partnership_p3_roi_calculatorCalculatorResults> {
  readonly id = 'public_private_partnership_p3_roi_calculatorCalculator';
  readonly name = 'public_private_partnership_p3_roi_calculatorCalculator Calculator';
  readonly description = 'Calculate public_private_partnership_p3_roi_calculatorCalculator values';

  calculate(inputs: public_private_partnership_p3_roi_calculatorCalculatorInputs): public_private_partnership_p3_roi_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: public_private_partnership_p3_roi_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: public_private_partnership_p3_roi_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
