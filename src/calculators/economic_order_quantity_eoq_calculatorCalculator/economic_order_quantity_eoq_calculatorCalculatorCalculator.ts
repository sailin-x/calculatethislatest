import { Calculator } from '../../engines/CalculatorEngine';
import { economic_order_quantity_eoq_calculatorCalculatorInputs, economic_order_quantity_eoq_calculatorCalculatorResults, economic_order_quantity_eoq_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class economic_order_quantity_eoq_calculatorCalculatorCalculator implements Calculator<economic_order_quantity_eoq_calculatorCalculatorInputs, economic_order_quantity_eoq_calculatorCalculatorResults> {
  readonly id = 'economic_order_quantity_eoq_calculatorCalculator';
  readonly name = 'economic_order_quantity_eoq_calculatorCalculator Calculator';
  readonly description = 'Calculate economic_order_quantity_eoq_calculatorCalculator values';

  calculate(inputs: economic_order_quantity_eoq_calculatorCalculatorInputs): economic_order_quantity_eoq_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: economic_order_quantity_eoq_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: economic_order_quantity_eoq_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
