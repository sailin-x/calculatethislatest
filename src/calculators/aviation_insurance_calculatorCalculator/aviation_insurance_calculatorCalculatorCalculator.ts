import { Calculator } from '../../engines/CalculatorEngine';
import { aviation_insurance_calculatorCalculatorInputs, aviation_insurance_calculatorCalculatorResults, aviation_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class aviation_insurance_calculatorCalculatorCalculator implements Calculator<aviation_insurance_calculatorCalculatorInputs, aviation_insurance_calculatorCalculatorResults> {
  readonly id = 'aviation_insurance_calculatorCalculator';
  readonly name = 'aviation_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate aviation_insurance_calculatorCalculator values';

  calculate(inputs: aviation_insurance_calculatorCalculatorInputs): aviation_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: aviation_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: aviation_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
