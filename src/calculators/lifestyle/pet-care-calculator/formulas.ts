```typescript
import { PetCareCalculatorInputs, PetCareCalculatorMetrics, PetCareCalculatorAnalysis } from './types';

// Helper function to calculate annual food cost based on pet type and size
function getFoodCost(petType: string, size?: string): number {
  if (petType === 'dog') {
    switch (size) {
      case 'small':
        return 450; // Approximate annual cost for small dog food
      case 'medium':
        return 650; // Medium dog
      case 'large':
        return 950; // Large dog
      default:
        return 650; // Default to medium
    }
  } else if (petType === 'cat') {
    switch (size) {
      case 'small':
        return 280; // Small cat
      case 'medium':
        return 380; // Medium cat
      case 'large':
        return 480; // Large cat (e.g., Maine Coon)
      default:
        return 380; // Default to medium
    }
  } else if (petType === 'bird') {
    return 180; // Annual seed/mix for average bird, size ignored
  } else if (petType === 'fish') {
    return 120; // Annual fish food and maintenance, size ignored
  }
  return 0; // Fallback
}

// Helper function to calculate annual vet care cost
function getVetCost(petType: string, age: number, hasPetInsurance: boolean): number {
  // Base annual vet visit and preventive care costs
  let baseCost: number;
  switch (petType) {
    case 'dog':
    case 'cat':
      baseCost = 300; // Routine checkups, vaccinations
      break;
    case 'bird':
      baseCost = 150; // Avian vet is specialized but less frequent
      break;
    case 'fish':
      baseCost = 80; // Minimal, mostly water quality checks
      break;
    default:
      baseCost = 0;
  }

  // Age factor: increases with age due to potential health issues (linear approximation)
  const ageFactor = 25 * age; // $25 per year of age for escalating care

  let totalVet = baseCost + ageFactor;

  // Insurance adjustment: if no insurance, add buffer for unexpected costs (e.g., emergencies)
  if (!hasPetInsurance) {
    totalVet += 250; // Approximate deductible/uninsured emergency buffer
  } else {
    totalVet -= 100; // Insurance reduces routine costs by covering 30-50%, approximated
  }

  return Math.max(totalVet, baseCost); // Ensure not below base
}

// Helper function to calculate annual grooming cost
function getGroomingCost(petType: string, size?: string): number {
  if (petType === 'dog') {
    let cost = 180; // Base for professional grooming 4-6 times/year
    if (size === 'large') cost += 120; // Extra for larger breeds
    else if (size === 'medium') cost += 60;
    return cost;
  } else if (petType === 'cat') {
    return 120; // Occasional professional or at-home for long-haired
  }
  return 0; // No grooming for birds/fish
}

// Helper function to calculate annual supplies/toys cost
function getSuppliesCost(petType: string): number {
  switch (petType) {
    case 'dog':
    case 'cat':
      return 160; // Toys, litter/bedding, collars, etc.
    case 'bird':
      return 90; // Cage accessories, toys
    case 'fish':
      return 70; // Tank filters, decorations
    default:
      return 0;
  }
}

export function calculateResult(inputs: PetCareCalculatorInputs): number {
  const { petType, size, age, hasPetInsurance } = inputs;

  // Ensure age is positive
  const effectiveAge = Math.max(0, age);

  const food = getFoodCost(petType, size);
  const vet = getVetCost(petType, effectiveAge, hasPetInsurance);
  const grooming = getGroomingCost(petType, size);
  const supplies = getSuppliesCost(petType);

  // Total annual cost formula: sum of all components
  // Mathematically: total = food + vet + grooming + supplies
  // No insurance premium here as it's bundled in vet adjustment; real insurance ~$300-600, but approximated in vet
  const totalAnnualCost = food + vet + grooming + supplies;

  return Math.round(totalAnnualCost * 100) / 100; // Round to 2 decimal places for currency
}

export function generateAnalysis(
  inputs: PetCareCalculatorInputs,
  metrics: PetCareCalculatorMetrics
): PetCareCalculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  let recommendation = '';

  // Risk assessment: based on total annual cost thresholds
  // Low: < $800 (budget-friendly for small/simple pets)
  // Medium: $800 - $1,800 (average for dogs/cats)
  // High: > $1,800 (large/older pets or no insurance)
  if (result < 800) {
    riskLevel = 'Low';
    recommendation = `Your estimated annual pet care cost of $${result.toFixed(2)} is low. This suggests efficient choices for a ${inputs.petType} ${inputs.size || ''}. Continue monitoring expenses.`;
  } else if (result < 1800) {
    riskLevel = 'Medium';
    const insuranceSuggestion = inputs.hasPetInsurance ? '' : ' Consider adding pet insurance to mitigate risks.';
    recommendation = `Moderate annual cost of $${result.toFixed(2)} for your ${inputs.petType}.${insuranceSuggestion} Budget accordingly for age-related increases.`;
  } else {
    riskLevel = 'High';
    const insuranceSuggestion = inputs.hasPetInsurance ? ' Review your policy coverage.' : ' Strongly consider pet insurance.';
    recommendation = `High annual cost of $${result.toFixed(2)}, likely due to ${inputs.petType} size/age.${insuranceSuggestion} Explore cost-saving options like bulk food purchases or local vets.`;
  }

  return { recommendation, riskLevel };
}
```