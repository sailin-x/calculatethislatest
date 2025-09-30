import { Calculator } from '../../engines/CalculatorEngine';
import { professional_liability_insurance_calculatorCalculatorInputs, professional_liability_insurance_calculatorCalculatorResults, professional_liability_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class professional_liability_insurance_calculatorCalculatorCalculator implements Calculator<professional_liability_insurance_calculatorCalculatorInputs, professional_liability_insurance_calculatorCalculatorResults> {
  readonly id = 'professional_liability_insurance_calculatorCalculator';
  readonly name = 'professional_liability_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate professional_liability_insurance_calculatorCalculator values';

  calculate(inputs: professional_liability_insurance_calculatorCalculatorInputs): professional_liability_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: professional_liability_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: professional_liability_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
