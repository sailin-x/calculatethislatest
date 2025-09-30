import { Calculator } from '../../engines/CalculatorEngine';
import { gap_insurance_calculatorCalculatorInputs, gap_insurance_calculatorCalculatorResults, gap_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class gap_insurance_calculatorCalculatorCalculator implements Calculator<gap_insurance_calculatorCalculatorInputs, gap_insurance_calculatorCalculatorResults> {
  readonly id = 'gap_insurance_calculatorCalculator';
  readonly name = 'gap_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate gap_insurance_calculatorCalculator values';

  calculate(inputs: gap_insurance_calculatorCalculatorInputs): gap_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: gap_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: gap_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
