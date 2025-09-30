import { Calculator } from '../../engines/CalculatorEngine';
import { cyber_liability_insurance_calculatorCalculatorInputs, cyber_liability_insurance_calculatorCalculatorResults, cyber_liability_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class cyber_liability_insurance_calculatorCalculatorCalculator implements Calculator<cyber_liability_insurance_calculatorCalculatorInputs, cyber_liability_insurance_calculatorCalculatorResults> {
  readonly id = 'cyber_liability_insurance_calculatorCalculator';
  readonly name = 'cyber_liability_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate cyber_liability_insurance_calculatorCalculator values';

  calculate(inputs: cyber_liability_insurance_calculatorCalculatorInputs): cyber_liability_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: cyber_liability_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: cyber_liability_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
