import { Calculator } from '../../engines/CalculatorEngine';
import { disability_insurance_needs_calculatorCalculatorInputs, disability_insurance_needs_calculatorCalculatorResults, disability_insurance_needs_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class disability_insurance_needs_calculatorCalculatorCalculator implements Calculator<disability_insurance_needs_calculatorCalculatorInputs, disability_insurance_needs_calculatorCalculatorResults> {
  readonly id = 'disability_insurance_needs_calculatorCalculator';
  readonly name = 'disability_insurance_needs_calculatorCalculator Calculator';
  readonly description = 'Calculate disability_insurance_needs_calculatorCalculator values';

  calculate(inputs: disability_insurance_needs_calculatorCalculatorInputs): disability_insurance_needs_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: disability_insurance_needs_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: disability_insurance_needs_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
