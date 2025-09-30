import { Calculator } from '../../engines/CalculatorEngine';
import { commercial_auto_insurance_calculatorCalculatorInputs, commercial_auto_insurance_calculatorCalculatorResults, commercial_auto_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class commercial_auto_insurance_calculatorCalculatorCalculator implements Calculator<commercial_auto_insurance_calculatorCalculatorInputs, commercial_auto_insurance_calculatorCalculatorResults> {
  readonly id = 'commercial_auto_insurance_calculatorCalculator';
  readonly name = 'commercial_auto_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate commercial_auto_insurance_calculatorCalculator values';

  calculate(inputs: commercial_auto_insurance_calculatorCalculatorInputs): commercial_auto_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: commercial_auto_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: commercial_auto_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
