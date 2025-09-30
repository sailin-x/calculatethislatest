import { Calculator } from '../../engines/CalculatorEngine';
import { property_insurance_calculatorCalculatorInputs, property_insurance_calculatorCalculatorResults, property_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class property_insurance_calculatorCalculatorCalculator implements Calculator<property_insurance_calculatorCalculatorInputs, property_insurance_calculatorCalculatorResults> {
  readonly id = 'property_insurance_calculatorCalculator';
  readonly name = 'property_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate property_insurance_calculatorCalculator values';

  calculate(inputs: property_insurance_calculatorCalculatorInputs): property_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: property_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: property_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
