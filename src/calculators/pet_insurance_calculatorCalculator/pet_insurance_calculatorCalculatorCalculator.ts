import { Calculator } from '../../engines/CalculatorEngine';
import { pet_insurance_calculatorCalculatorInputs, pet_insurance_calculatorCalculatorResults, pet_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class pet_insurance_calculatorCalculatorCalculator implements Calculator<pet_insurance_calculatorCalculatorInputs, pet_insurance_calculatorCalculatorResults> {
  readonly id = 'pet_insurance_calculatorCalculator';
  readonly name = 'pet_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate pet_insurance_calculatorCalculator values';

  calculate(inputs: pet_insurance_calculatorCalculatorInputs): pet_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: pet_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: pet_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
