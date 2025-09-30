import { Calculator } from '../../engines/CalculatorEngine';
import { life_insurance_calculatorCalculatorInputs, life_insurance_calculatorCalculatorResults, life_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class life_insurance_calculatorCalculatorCalculator implements Calculator<life_insurance_calculatorCalculatorInputs, life_insurance_calculatorCalculatorResults> {
  readonly id = 'life_insurance_calculatorCalculator';
  readonly name = 'life_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate life_insurance_calculatorCalculator values';

  calculate(inputs: life_insurance_calculatorCalculatorInputs): life_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: life_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: life_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
