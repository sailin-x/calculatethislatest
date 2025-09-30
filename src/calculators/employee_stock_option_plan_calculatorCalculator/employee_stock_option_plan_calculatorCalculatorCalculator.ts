import { Calculator } from '../../engines/CalculatorEngine';
import { employee_stock_option_plan_calculatorCalculatorInputs, employee_stock_option_plan_calculatorCalculatorResults, employee_stock_option_plan_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class employee_stock_option_plan_calculatorCalculatorCalculator implements Calculator<employee_stock_option_plan_calculatorCalculatorInputs, employee_stock_option_plan_calculatorCalculatorResults> {
  readonly id = 'employee_stock_option_plan_calculatorCalculator';
  readonly name = 'employee_stock_option_plan_calculatorCalculator Calculator';
  readonly description = 'Calculate employee_stock_option_plan_calculatorCalculator values';

  calculate(inputs: employee_stock_option_plan_calculatorCalculatorInputs): employee_stock_option_plan_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: employee_stock_option_plan_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: employee_stock_option_plan_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
