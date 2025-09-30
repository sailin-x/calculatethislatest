import { Calculator } from '../../engines/CalculatorEngine';
import { dialysis_center_profitability_calculatorCalculatorInputs, dialysis_center_profitability_calculatorCalculatorResults, dialysis_center_profitability_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class dialysis_center_profitability_calculatorCalculatorCalculator implements Calculator<dialysis_center_profitability_calculatorCalculatorInputs, dialysis_center_profitability_calculatorCalculatorResults> {
  readonly id = 'dialysis_center_profitability_calculatorCalculator';
  readonly name = 'dialysis_center_profitability_calculatorCalculator Calculator';
  readonly description = 'Calculate dialysis_center_profitability_calculatorCalculator values';

  calculate(inputs: dialysis_center_profitability_calculatorCalculatorInputs): dialysis_center_profitability_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: dialysis_center_profitability_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: dialysis_center_profitability_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
