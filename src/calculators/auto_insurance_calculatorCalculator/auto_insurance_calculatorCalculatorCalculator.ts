import { Calculator } from '../../engines/CalculatorEngine';
import { auto_insurance_calculatorCalculatorInputs, auto_insurance_calculatorCalculatorResults, auto_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class auto_insurance_calculatorCalculatorCalculator implements Calculator<auto_insurance_calculatorCalculatorInputs, auto_insurance_calculatorCalculatorResults> {
  readonly id = 'auto_insurance_calculatorCalculator';
  readonly name = 'auto_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate auto_insurance_calculatorCalculator values';

  calculate(inputs: auto_insurance_calculatorCalculatorInputs): auto_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: auto_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: auto_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
