import { Calculator } from '../../engines/CalculatorEngine';
import { health_insurance_calculatorCalculatorInputs, health_insurance_calculatorCalculatorResults, health_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class health_insurance_calculatorCalculatorCalculator implements Calculator<health_insurance_calculatorCalculatorInputs, health_insurance_calculatorCalculatorResults> {
  readonly id = 'health_insurance_calculatorCalculator';
  readonly name = 'health_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate health_insurance_calculatorCalculator values';

  calculate(inputs: health_insurance_calculatorCalculatorInputs): health_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: health_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: health_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
