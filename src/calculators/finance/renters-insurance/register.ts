import { RentersInsuranceCalculator } from './RentersInsuranceCalculator';
import { calculatorRegistry } from '../../../utils/calculatorRegistry';

// Register the calculator
calculatorRegistry.register(RentersInsuranceCalculator);

export { RentersInsuranceCalculator };