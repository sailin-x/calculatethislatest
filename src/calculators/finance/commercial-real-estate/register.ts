import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CommercialRealEstateCalculator } from './CommercialRealEstateCalculator';

// Register the Commercial Real Estate Calculator
calculatorRegistry.register(CommercialRealEstateCalculator);

console.log('✅ Commercial Real Estate Calculator registered successfully');
