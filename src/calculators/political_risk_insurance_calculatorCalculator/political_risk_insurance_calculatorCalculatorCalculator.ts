import { Calculator } from '../../engines/CalculatorEngine';
import { political_risk_insurance_calculatorCalculatorInputs, political_risk_insurance_calculatorCalculatorResults, political_risk_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class political_risk_insurance_calculatorCalculatorCalculator implements Calculator<political_risk_insurance_calculatorCalculatorInputs, political_risk_insurance_calculatorCalculatorResults> {
  readonly id = 'political_risk_insurance_calculatorCalculator';
  readonly name = 'political_risk_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate political_risk_insurance_calculatorCalculator values';

  calculate(inputs: political_risk_insurance_calculatorCalculatorInputs): political_risk_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: political_risk_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: political_risk_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
