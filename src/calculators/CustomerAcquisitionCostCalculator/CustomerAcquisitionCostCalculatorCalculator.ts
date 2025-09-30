import { Calculator } from '../../engines/CalculatorEngine';
import { CustomerAcquisitionCostCalculatorInputs, CustomerAcquisitionCostCalculatorResults, CustomerAcquisitionCostCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class CustomerAcquisitionCostCalculatorCalculator implements Calculator<CustomerAcquisitionCostCalculatorInputs, CustomerAcquisitionCostCalculatorResults> {
  readonly id = 'CustomerAcquisitionCostCalculator';
  readonly name = 'CustomerAcquisitionCostCalculator Calculator';
  readonly description = 'Calculate CustomerAcquisitionCostCalculator values';

  calculate(inputs: CustomerAcquisitionCostCalculatorInputs): CustomerAcquisitionCostCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: CustomerAcquisitionCostCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: CustomerAcquisitionCostCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
