import { Calculator } from '../../engines/CalculatorEngine';
import { managed_security_service_provider_mssp_vs_in_house_soc_calculatorCalculatorInputs, managed_security_service_provider_mssp_vs_in_house_soc_calculatorCalculatorResults, managed_security_service_provider_mssp_vs_in_house_soc_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class managed_security_service_provider_mssp_vs_in_house_soc_calculatorCalculatorCalculator implements Calculator<managed_security_service_provider_mssp_vs_in_house_soc_calculatorCalculatorInputs, managed_security_service_provider_mssp_vs_in_house_soc_calculatorCalculatorResults> {
  readonly id = 'managed_security_service_provider_mssp_vs_in_house_soc_calculatorCalculator';
  readonly name = 'managed_security_service_provider_mssp_vs_in_house_soc_calculatorCalculator Calculator';
  readonly description = 'Calculate managed_security_service_provider_mssp_vs_in_house_soc_calculatorCalculator values';

  calculate(inputs: managed_security_service_provider_mssp_vs_in_house_soc_calculatorCalculatorInputs): managed_security_service_provider_mssp_vs_in_house_soc_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: managed_security_service_provider_mssp_vs_in_house_soc_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: managed_security_service_provider_mssp_vs_in_house_soc_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
