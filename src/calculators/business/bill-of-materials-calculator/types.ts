export interface BillOfMaterialsCalculatorInputs {
  productName: string;
  components: Array<{
    name: string;
    quantity: number;
    unitCost: number;
    unit: string;
    supplier: string;
  }>;
  laborHours: number;
  laborRate: number;
  overheadRate: number;
  profitMargin: number;
  quantity: number;
  wasteFactor: number;
  currency: string;
}

export interface BillOfMaterialsCalculatorMetrics {
  totalMaterialCost: number;
  totalLaborCost: number;
  totalOverheadCost: number;
  totalCost: number;
  unitCost: number;
  sellingPrice: number;
  profit: number;
  profitMargin: number;
  costBreakdown: Record<string, number>;
}

export interface BillOfMaterialsCalculatorAnalysis {
  costStructure: string;
  profitability: string;
  optimization: string[];
  recommendations: string[];
}

export interface BillOfMaterialsCalculatorOutputs {
  totalCost: number;
  unitCost: number;
  sellingPrice: number;
  profit: number;
  analysis: BillOfMaterialsCalculatorAnalysis;
}
