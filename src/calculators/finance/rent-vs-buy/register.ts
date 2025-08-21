import { RentVsBuyCalculator } from './RentVsBuyCalculator';
import { calculatorRegistry } from '../../../utils/calculatorRegistry';

// Register the calculator
calculatorRegistry.register(RentVsBuyCalculator);

export { RentVsBuyCalculator };