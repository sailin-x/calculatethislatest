import { Calculator } from '../../engines/CalculatorEngine';
import { terrorism_insurance_calculatorCalculatorInputs, terrorism_insurance_calculatorCalculatorResults, terrorism_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class terrorism_insurance_calculatorCalculatorCalculator implements Calculator<terrorism_insurance_calculatorCalculatorInputs, terrorism_insurance_calculatorCalculatorResults> {
  readonly id = 'terrorism_insurance_calculatorCalculator';
  readonly name = 'terrorism_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate terrorism_insurance_calculatorCalculator values';

  calculate(inputs: terrorism_insurance_calculatorCalculatorInputs): terrorism_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: terrorism_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: terrorism_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
