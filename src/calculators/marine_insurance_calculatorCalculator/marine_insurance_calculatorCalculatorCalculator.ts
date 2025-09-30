import { Calculator } from '../../engines/CalculatorEngine';
import { marine_insurance_calculatorCalculatorInputs, marine_insurance_calculatorCalculatorResults, marine_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class marine_insurance_calculatorCalculatorCalculator implements Calculator<marine_insurance_calculatorCalculatorInputs, marine_insurance_calculatorCalculatorResults> {
  readonly id = 'marine_insurance_calculatorCalculator';
  readonly name = 'marine_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate marine_insurance_calculatorCalculator values';

  calculate(inputs: marine_insurance_calculatorCalculatorInputs): marine_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: marine_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: marine_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
