import { Calculator } from '../../engines/CalculatorEngine';
import { managed_security_service_provider_calculatorCalculatorInputs, managed_security_service_provider_calculatorCalculatorResults, managed_security_service_provider_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class managed_security_service_provider_calculatorCalculatorCalculator implements Calculator<managed_security_service_provider_calculatorCalculatorInputs, managed_security_service_provider_calculatorCalculatorResults> {
  readonly id = 'managed_security_service_provider_calculatorCalculator';
  readonly name = 'managed_security_service_provider_calculatorCalculator Calculator';
  readonly description = 'Calculate managed_security_service_provider_calculatorCalculator values';

  calculate(inputs: managed_security_service_provider_calculatorCalculatorInputs): managed_security_service_provider_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: managed_security_service_provider_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: managed_security_service_provider_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
