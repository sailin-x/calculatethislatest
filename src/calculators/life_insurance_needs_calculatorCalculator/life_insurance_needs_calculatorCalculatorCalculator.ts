import { Calculator } from '../../engines/CalculatorEngine';
import { life_insurance_needs_calculatorCalculatorInputs, life_insurance_needs_calculatorCalculatorResults, life_insurance_needs_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class life_insurance_needs_calculatorCalculatorCalculator implements Calculator<life_insurance_needs_calculatorCalculatorInputs, life_insurance_needs_calculatorCalculatorResults> {
  readonly id = 'life_insurance_needs_calculatorCalculator';
  readonly name = 'life_insurance_needs_calculatorCalculator Calculator';
  readonly description = 'Calculate life_insurance_needs_calculatorCalculator values';

  calculate(inputs: life_insurance_needs_calculatorCalculatorInputs): life_insurance_needs_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: life_insurance_needs_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: life_insurance_needs_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
