import { Calculator } from '../../engines/CalculatorEngine';
import { estate_tax_life_insurance_calculatorCalculatorInputs, estate_tax_life_insurance_calculatorCalculatorResults, estate_tax_life_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class estate_tax_life_insurance_calculatorCalculatorCalculator implements Calculator<estate_tax_life_insurance_calculatorCalculatorInputs, estate_tax_life_insurance_calculatorCalculatorResults> {
  readonly id = 'estate_tax_life_insurance_calculatorCalculator';
  readonly name = 'estate_tax_life_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate estate_tax_life_insurance_calculatorCalculator values';

  calculate(inputs: estate_tax_life_insurance_calculatorCalculatorInputs): estate_tax_life_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: estate_tax_life_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: estate_tax_life_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
