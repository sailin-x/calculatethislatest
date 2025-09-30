import { Calculator } from '../../engines/CalculatorEngine';
import { corporate_tax_shield_calculatorCalculatorInputs, corporate_tax_shield_calculatorCalculatorResults, corporate_tax_shield_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class corporate_tax_shield_calculatorCalculatorCalculator implements Calculator<corporate_tax_shield_calculatorCalculatorInputs, corporate_tax_shield_calculatorCalculatorResults> {
  readonly id = 'corporate_tax_shield_calculatorCalculator';
  readonly name = 'corporate_tax_shield_calculatorCalculator Calculator';
  readonly description = 'Calculate corporate_tax_shield_calculatorCalculator values';

  calculate(inputs: corporate_tax_shield_calculatorCalculatorInputs): corporate_tax_shield_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: corporate_tax_shield_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: corporate_tax_shield_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
