import { Calculator } from '../../engines/CalculatorEngine';
import { gift_tax_calculatorCalculatorInputs, gift_tax_calculatorCalculatorResults, gift_tax_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class gift_tax_calculatorCalculatorCalculator implements Calculator<gift_tax_calculatorCalculatorInputs, gift_tax_calculatorCalculatorResults> {
  readonly id = 'gift_tax_calculatorCalculator';
  readonly name = 'gift_tax_calculatorCalculator Calculator';
  readonly description = 'Calculate gift_tax_calculatorCalculator values';

  calculate(inputs: gift_tax_calculatorCalculatorInputs): gift_tax_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: gift_tax_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: gift_tax_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
