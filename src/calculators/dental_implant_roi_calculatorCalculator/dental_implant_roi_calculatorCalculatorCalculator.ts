import { Calculator } from '../../engines/CalculatorEngine';
import { dental_implant_roi_calculatorCalculatorInputs, dental_implant_roi_calculatorCalculatorResults, dental_implant_roi_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class dental_implant_roi_calculatorCalculatorCalculator implements Calculator<dental_implant_roi_calculatorCalculatorInputs, dental_implant_roi_calculatorCalculatorResults> {
  readonly id = 'dental_implant_roi_calculatorCalculator';
  readonly name = 'dental_implant_roi_calculatorCalculator Calculator';
  readonly description = 'Calculate dental_implant_roi_calculatorCalculator values';

  calculate(inputs: dental_implant_roi_calculatorCalculatorInputs): dental_implant_roi_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: dental_implant_roi_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: dental_implant_roi_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
