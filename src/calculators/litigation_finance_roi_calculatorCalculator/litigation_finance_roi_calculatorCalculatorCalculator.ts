import { Calculator } from '../../engines/CalculatorEngine';
import { litigation_finance_roi_calculatorCalculatorInputs, litigation_finance_roi_calculatorCalculatorResults, litigation_finance_roi_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class litigation_finance_roi_calculatorCalculatorCalculator implements Calculator<litigation_finance_roi_calculatorCalculatorInputs, litigation_finance_roi_calculatorCalculatorResults> {
  readonly id = 'litigation_finance_roi_calculatorCalculator';
  readonly name = 'litigation_finance_roi_calculatorCalculator Calculator';
  readonly description = 'Calculate litigation_finance_roi_calculatorCalculator values';

  calculate(inputs: litigation_finance_roi_calculatorCalculatorInputs): litigation_finance_roi_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: litigation_finance_roi_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: litigation_finance_roi_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
