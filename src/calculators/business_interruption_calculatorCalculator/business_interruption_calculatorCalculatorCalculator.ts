import { Calculator } from '../../engines/CalculatorEngine';
import { business_interruption_calculatorCalculatorInputs, business_interruption_calculatorCalculatorResults, business_interruption_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class business_interruption_calculatorCalculatorCalculator implements Calculator<business_interruption_calculatorCalculatorInputs, business_interruption_calculatorCalculatorResults> {
  readonly id = 'business_interruption_calculatorCalculator';
  readonly name = 'business_interruption_calculatorCalculator Calculator';
  readonly description = 'Calculate business_interruption_calculatorCalculator values';

  calculate(inputs: business_interruption_calculatorCalculatorInputs): business_interruption_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: business_interruption_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: business_interruption_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
