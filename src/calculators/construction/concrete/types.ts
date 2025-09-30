export interface ConcreteCalculatorInputs {
  projectType: 'slab' | 'foundation' | 'wall' | 'column' | 'beam' | 'stairs' | 'other';
  dimensions: {
    length: number;
    width: number;
    height: number;
    thickness: number;
  };
  concreteType: 'standard' | 'high_strength' | 'lightweight' | 'self_compacting' | 'rapid_set';
  reinforcementType: 'none' | 'rebar' | 'wire_mesh' | 'fiber';
  finishType: 'rough' | 'smooth' | 'stamped' | 'exposed_aggregate' | 'polished';
  wasteFactor: number;
  unitCost: number;
  measurementSystem: 'metric' | 'imperial';
}

export interface ConcreteCalculatorMetrics {
  volume: number;
  weight: number;
  bagsNeeded: number;
  totalCost: number;
  costPerCubicUnit: number;
  reinforcementWeight: number;
  formworkArea: number;
}

export interface ConcreteCalculatorAnalysis {
  materialBreakdown: Record<string, number>;
  costOptimization: string[];
  structuralConsiderations: string[];
}

export interface ConcreteCalculatorOutputs {
  volume: number;
  totalCost: number;
  bagsNeeded: number;
  analysis: ConcreteCalculatorAnalysis;
}
