import { Calculator } from '../../engines/CalculatorEngine';
import { business_insurance_calculatorCalculatorInputs, business_insurance_calculatorCalculatorResults, business_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class business_insurance_calculatorCalculatorCalculator implements Calculator<business_insurance_calculatorCalculatorInputs, business_insurance_calculatorCalculatorResults> {
  readonly id = 'business_insurance_calculatorCalculator';
  readonly name = 'business_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate business_insurance_calculatorCalculator values';

  calculate(inputs: business_insurance_calculatorCalculatorInputs): business_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: business_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: business_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
