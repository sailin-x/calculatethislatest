import { Formula, CalculationResult } from '../../../types/calculator';

export interface ConcreteInputs {
  length: number; // feet
  width: number; // feet
  thickness: number; // inches
  wasteFactor: number; // percentage
  concreteStrength: '2500' | '3000' | '3500' | '4000' | '4500' | '5000';
  deliveryDistance: number; // miles
  laborIncluded: boolean;
  finishType: 'broom' | 'smooth' | 'stamped' | 'exposed-aggregate';
  reinforcement: 'none' | 'wire-mesh' | 'rebar';
}

export class ConcreteFormulas {
  /**
   * Calculate concrete volume in cubic yards
   */
  static calculateVolume(length: number, width: number, thickness: number): number {
    const volumeCubicFeet = length * width * (thickness / 12);
    return volumeCubicFeet / 27; // Convert to cubic yards
  }

  /**
   * Calculate concrete needed with waste factor
   */
  static calculateConcreteNeeded(volume: number, wasteFactor: number): number {
    return volume * (1 + wasteFactor / 100);
  }

  /**
   * Calculate concrete cost based on strength and location
   */
  static calculateConcreteCost(volume: number, strength: string, deliveryDistance: number): number {
    const basePrices = {
      '2500': 110,
      '3000': 115,
      '3500': 120,
      '4000': 125,
      '4500': 130,
      '5000': 135
    };
    
    const basePrice = basePrices[strength as keyof typeof basePrices] || 120;
    const deliveryFee = Math.max(0, (deliveryDistance - 10) * 8); // $8 per mile over 10 miles
    
    return (volume * basePrice) + deliveryFee;
  }

  /**
   * Calculate labor costs
   */
  static calculateLaborCost(area: number, finishType: string, reinforcement: string): number {
    const baseLaborRate = {
      'broom': 3.50,
      'smooth': 4.00,
      'stamped': 8.00,
      'exposed-aggregate': 6.50
    };
    
    const reinforcementCost = {
      'none': 0,
      'wire-mesh': 0.75,
      'rebar': 1.50
    };
    
    const laborRate = baseLaborRate[finishType as keyof typeof baseLaborRate] || 4.00;
    const reinforcementRate = reinforcementCost[reinforcement as keyof typeof reinforcementCost] || 0;
    
    return area * (laborRate + reinforcementRate);
  }

  /**
   * Calculate total project cost
   */
  static calculateTotalCost(
    concreteVolume: number,
    area: number,
    strength: string,
    deliveryDistance: number,
    finishType: string,
    reinforcement: string,
    laborIncluded: boolean
  ): {
    concreteCost: number;
    laborCost: number;
    totalCost: number;
  } {
    const concreteCost = this.calculateConcreteCost(concreteVolume, strength, deliveryDistance);
    const laborCost = laborIncluded ? this.calculateLaborCost(area, finishType, reinforcement) : 0;
    
    return {
      concreteCost,
      laborCost,
      totalCost: concreteCost + laborCost
    };
  }
}

export const concreteCalculatorFormula: Formula = {
  id: 'concrete-calculator',
  name: 'Concrete Calculator',
  description: 'Calculate concrete volume, materials needed, and project costs with waste factors and regional pricing',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const concreteInputs = inputs as ConcreteInputs;
    
    try {
      const area = concreteInputs.length * concreteInputs.width;
      const baseVolume = ConcreteFormulas.calculateVolume(
        concreteInputs.length,
        concreteInputs.width,
        concreteInputs.thickness
      );
      
      const concreteNeeded = ConcreteFormulas.calculateConcreteNeeded(
        baseVolume,
        concreteInputs.wasteFactor
      );
      
      const costs = ConcreteFormulas.calculateTotalCost(
        concreteNeeded,
        area,
        concreteInputs.concreteStrength,
        concreteInputs.deliveryDistance,
        concreteInputs.finishType,
        concreteInputs.reinforcement,
        concreteInputs.laborIncluded
      );
      
      // Calculate bags needed (80lb bags = 0.6 cubic feet each)
      const bagsNeeded = Math.ceil((concreteNeeded * 27) / 0.6);
      
      return {
        outputs: {
          area,
          baseVolume,
          concreteNeeded,
          bagsNeeded,
          concreteCost: costs.concreteCost,
          laborCost: costs.laborCost,
          totalCost: costs.totalCost,
          costPerSquareFoot: costs.totalCost / area
        },
        explanation: `For a ${concreteInputs.length}' × ${concreteInputs.width}' × ${concreteInputs.thickness}" slab, you need ${concreteNeeded.toFixed(2)} cubic yards of ${concreteInputs.concreteStrength} PSI concrete. Total project cost: ${costs.totalCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} (${(costs.totalCost / area).toFixed(2)}/sq ft).`,
        intermediateSteps: {
          'Area': `${concreteInputs.length}' × ${concreteInputs.width}' = ${area} sq ft`,
          'Base Volume': `${area} sq ft × ${concreteInputs.thickness/12}' = ${baseVolume.toFixed(2)} cubic yards`,
          'With Waste': `${baseVolume.toFixed(2)} × ${1 + concreteInputs.wasteFactor/100} = ${concreteNeeded.toFixed(2)} cubic yards`,
          'Concrete Cost': `${concreteNeeded.toFixed(2)} yards × $${ConcreteFormulas.calculateConcreteCost(1, concreteInputs.concreteStrength, 0).toFixed(0)}/yard = $${costs.concreteCost.toFixed(0)}`,
          'Labor Cost': concreteInputs.laborIncluded ? `${area} sq ft × labor rate = $${costs.laborCost.toFixed(0)}` : 'Not included'
        }
      };
    } catch (error) {
      throw new Error(`Concrete calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};