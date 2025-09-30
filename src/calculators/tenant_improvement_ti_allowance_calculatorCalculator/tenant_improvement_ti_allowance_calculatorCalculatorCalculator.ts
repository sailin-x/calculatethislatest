import { Calculator } from '../../engines/CalculatorEngine';
import { tenant_improvement_ti_allowance_calculatorCalculatorInputs, tenant_improvement_ti_allowance_calculatorCalculatorResults, tenant_improvement_ti_allowance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class tenant_improvement_ti_allowance_calculatorCalculatorCalculator implements Calculator<tenant_improvement_ti_allowance_calculatorCalculatorInputs, tenant_improvement_ti_allowance_calculatorCalculatorResults> {
  readonly id = 'tenant_improvement_ti_allowance_calculatorCalculator';
  readonly name = 'tenant_improvement_ti_allowance_calculatorCalculator Calculator';
  readonly description = 'Calculate tenant_improvement_ti_allowance_calculatorCalculator values';

  calculate(inputs: tenant_improvement_ti_allowance_calculatorCalculatorInputs): tenant_improvement_ti_allowance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: tenant_improvement_ti_allowance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: tenant_improvement_ti_allowance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
