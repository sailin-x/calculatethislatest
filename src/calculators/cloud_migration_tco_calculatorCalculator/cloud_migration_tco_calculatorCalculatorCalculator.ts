import { Calculator } from '../../engines/CalculatorEngine';
import { cloud_migration_tco_calculatorCalculatorInputs, cloud_migration_tco_calculatorCalculatorResults, cloud_migration_tco_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class cloud_migration_tco_calculatorCalculatorCalculator implements Calculator<cloud_migration_tco_calculatorCalculatorInputs, cloud_migration_tco_calculatorCalculatorResults> {
  readonly id = 'cloud_migration_tco_calculatorCalculator';
  readonly name = 'cloud_migration_tco_calculatorCalculator Calculator';
  readonly description = 'Calculate cloud_migration_tco_calculatorCalculator values';

  calculate(inputs: cloud_migration_tco_calculatorCalculatorInputs): cloud_migration_tco_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: cloud_migration_tco_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: cloud_migration_tco_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
