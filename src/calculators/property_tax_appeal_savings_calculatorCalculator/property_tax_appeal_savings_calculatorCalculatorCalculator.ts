import { Calculator } from '../../engines/CalculatorEngine';
import { property_tax_appeal_savings_calculatorCalculatorInputs, property_tax_appeal_savings_calculatorCalculatorResults, property_tax_appeal_savings_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class property_tax_appeal_savings_calculatorCalculatorCalculator implements Calculator<property_tax_appeal_savings_calculatorCalculatorInputs, property_tax_appeal_savings_calculatorCalculatorResults> {
  readonly id = 'property_tax_appeal_savings_calculatorCalculator';
  readonly name = 'property_tax_appeal_savings_calculatorCalculator Calculator';
  readonly description = 'Calculate property_tax_appeal_savings_calculatorCalculator values';

  calculate(inputs: property_tax_appeal_savings_calculatorCalculatorInputs): property_tax_appeal_savings_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: property_tax_appeal_savings_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: property_tax_appeal_savings_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
