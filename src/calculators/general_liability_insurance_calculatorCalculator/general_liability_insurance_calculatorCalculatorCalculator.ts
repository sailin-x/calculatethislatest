import { Calculator } from '../../engines/CalculatorEngine';
import { general_liability_insurance_calculatorCalculatorInputs, general_liability_insurance_calculatorCalculatorResults, general_liability_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class general_liability_insurance_calculatorCalculatorCalculator implements Calculator<general_liability_insurance_calculatorCalculatorInputs, general_liability_insurance_calculatorCalculatorResults> {
  readonly id = 'general_liability_insurance_calculatorCalculator';
  readonly name = 'general_liability_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate general_liability_insurance_calculatorCalculator values';

  calculate(inputs: general_liability_insurance_calculatorCalculatorInputs): general_liability_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: general_liability_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: general_liability_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
