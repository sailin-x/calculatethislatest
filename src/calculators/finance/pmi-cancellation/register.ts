import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { pmiCancellationCalculator } from './PMICancellationCalculator';

// Register the PMI Cancellation Calculator
calculatorRegistry.register(pmiCancellationCalculator);