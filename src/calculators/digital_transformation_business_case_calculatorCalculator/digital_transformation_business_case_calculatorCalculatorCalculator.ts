import { Calculator } from '../../engines/CalculatorEngine';
import { digital_transformation_business_case_calculatorCalculatorInputs, digital_transformation_business_case_calculatorCalculatorResults, digital_transformation_business_case_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class digital_transformation_business_case_calculatorCalculatorCalculator implements Calculator<digital_transformation_business_case_calculatorCalculatorInputs, digital_transformation_business_case_calculatorCalculatorResults> {
  readonly id = 'digital_transformation_business_case_calculatorCalculator';
  readonly name = 'digital_transformation_business_case_calculatorCalculator Calculator';
  readonly description = 'Calculate digital_transformation_business_case_calculatorCalculator values';

  calculate(inputs: digital_transformation_business_case_calculatorCalculatorInputs): digital_transformation_business_case_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: digital_transformation_business_case_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: digital_transformation_business_case_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
