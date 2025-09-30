import { Calculator } from '../../engines/CalculatorEngine';
import { sales_commission_structure_calculatorCalculatorInputs, sales_commission_structure_calculatorCalculatorResults, sales_commission_structure_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class sales_commission_structure_calculatorCalculatorCalculator implements Calculator<sales_commission_structure_calculatorCalculatorInputs, sales_commission_structure_calculatorCalculatorResults> {
  readonly id = 'sales_commission_structure_calculatorCalculator';
  readonly name = 'sales_commission_structure_calculatorCalculator Calculator';
  readonly description = 'Calculate sales_commission_structure_calculatorCalculator values';

  calculate(inputs: sales_commission_structure_calculatorCalculatorInputs): sales_commission_structure_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: sales_commission_structure_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: sales_commission_structure_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
