import { Calculator } from '../../engines/CalculatorEngine';
import { irrevocable_life_insurance_trust_ilit_value_calculatorCalculatorInputs, irrevocable_life_insurance_trust_ilit_value_calculatorCalculatorResults, irrevocable_life_insurance_trust_ilit_value_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class irrevocable_life_insurance_trust_ilit_value_calculatorCalculatorCalculator implements Calculator<irrevocable_life_insurance_trust_ilit_value_calculatorCalculatorInputs, irrevocable_life_insurance_trust_ilit_value_calculatorCalculatorResults> {
  readonly id = 'irrevocable_life_insurance_trust_ilit_value_calculatorCalculator';
  readonly name = 'irrevocable_life_insurance_trust_ilit_value_calculatorCalculator Calculator';
  readonly description = 'Calculate irrevocable_life_insurance_trust_ilit_value_calculatorCalculator values';

  calculate(inputs: irrevocable_life_insurance_trust_ilit_value_calculatorCalculatorInputs): irrevocable_life_insurance_trust_ilit_value_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: irrevocable_life_insurance_trust_ilit_value_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: irrevocable_life_insurance_trust_ilit_value_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
