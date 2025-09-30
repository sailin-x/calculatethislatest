import { Calculator } from '../../engines/CalculatorEngine';
import { flood_insurance_calculatorCalculatorInputs, flood_insurance_calculatorCalculatorResults, flood_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class flood_insurance_calculatorCalculatorCalculator implements Calculator<flood_insurance_calculatorCalculatorInputs, flood_insurance_calculatorCalculatorResults> {
  readonly id = 'flood_insurance_calculatorCalculator';
  readonly name = 'flood_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate flood_insurance_calculatorCalculator values';

  calculate(inputs: flood_insurance_calculatorCalculatorInputs): flood_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: flood_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: flood_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
