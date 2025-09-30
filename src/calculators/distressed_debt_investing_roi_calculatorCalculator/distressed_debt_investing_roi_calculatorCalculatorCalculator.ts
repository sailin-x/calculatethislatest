import { Calculator } from '../../engines/CalculatorEngine';
import { distressed_debt_investing_roi_calculatorCalculatorInputs, distressed_debt_investing_roi_calculatorCalculatorResults, distressed_debt_investing_roi_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class distressed_debt_investing_roi_calculatorCalculatorCalculator implements Calculator<distressed_debt_investing_roi_calculatorCalculatorInputs, distressed_debt_investing_roi_calculatorCalculatorResults> {
  readonly id = 'distressed_debt_investing_roi_calculatorCalculator';
  readonly name = 'distressed_debt_investing_roi_calculatorCalculator Calculator';
  readonly description = 'Calculate distressed_debt_investing_roi_calculatorCalculator values';

  calculate(inputs: distressed_debt_investing_roi_calculatorCalculatorInputs): distressed_debt_investing_roi_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: distressed_debt_investing_roi_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: distressed_debt_investing_roi_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
