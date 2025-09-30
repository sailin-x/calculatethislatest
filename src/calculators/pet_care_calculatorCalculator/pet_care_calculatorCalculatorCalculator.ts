import { Calculator } from '../../engines/CalculatorEngine';
import { pet_care_calculatorCalculatorInputs, pet_care_calculatorCalculatorResults, pet_care_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class pet_care_calculatorCalculatorCalculator implements Calculator<pet_care_calculatorCalculatorInputs, pet_care_calculatorCalculatorResults> {
  readonly id = 'pet_care_calculatorCalculator';
  readonly name = 'pet_care_calculatorCalculator Calculator';
  readonly description = 'Calculate pet_care_calculatorCalculator values';

  calculate(inputs: pet_care_calculatorCalculatorInputs): pet_care_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: pet_care_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: pet_care_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
