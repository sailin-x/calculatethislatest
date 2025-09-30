import { Calculator } from '../../engines/CalculatorEngine';
import { earthquake_insurance_calculatorCalculatorInputs, earthquake_insurance_calculatorCalculatorResults, earthquake_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class earthquake_insurance_calculatorCalculatorCalculator implements Calculator<earthquake_insurance_calculatorCalculatorInputs, earthquake_insurance_calculatorCalculatorResults> {
  readonly id = 'earthquake_insurance_calculatorCalculator';
  readonly name = 'earthquake_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate earthquake_insurance_calculatorCalculator values';

  calculate(inputs: earthquake_insurance_calculatorCalculatorInputs): earthquake_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: earthquake_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: earthquake_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
