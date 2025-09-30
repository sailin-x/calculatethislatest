import { Calculator } from '../../engines/CalculatorEngine';
import { accident_insurance_calculatorCalculatorInputs, accident_insurance_calculatorCalculatorResults, accident_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class accident_insurance_calculatorCalculatorCalculator implements Calculator<accident_insurance_calculatorCalculatorInputs, accident_insurance_calculatorCalculatorResults> {
  readonly id = 'accident_insurance_calculatorCalculator';
  readonly name = 'accident_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate accident_insurance_calculatorCalculator values';

  calculate(inputs: accident_insurance_calculatorCalculatorInputs): accident_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: accident_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: accident_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
