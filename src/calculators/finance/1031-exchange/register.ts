import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { Exchange1031Calculator } from './Exchange1031Calculator';

// Register the 1031 Exchange Calculator
calculatorRegistry.register(Exchange1031Calculator);

console.log('✅ 1031 Exchange Calculator registered successfully');