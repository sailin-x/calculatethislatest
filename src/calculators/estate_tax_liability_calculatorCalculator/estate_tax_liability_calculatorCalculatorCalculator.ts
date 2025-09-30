import { Calculator } from '../../engines/CalculatorEngine';
import { estate_tax_liability_calculatorCalculatorInputs, estate_tax_liability_calculatorCalculatorResults, estate_tax_liability_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class estate_tax_liability_calculatorCalculatorCalculator implements Calculator<estate_tax_liability_calculatorCalculatorInputs, estate_tax_liability_calculatorCalculatorResults> {
  readonly id = 'estate_tax_liability_calculatorCalculator';
  readonly name = 'estate_tax_liability_calculatorCalculator Calculator';
  readonly description = 'Calculate estate_tax_liability_calculatorCalculator values';

  calculate(inputs: estate_tax_liability_calculatorCalculatorInputs): estate_tax_liability_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: estate_tax_liability_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: estate_tax_liability_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
