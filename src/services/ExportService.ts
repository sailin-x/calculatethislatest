import { Calculator, CalculatorInput, CalculatorOutput } from '../types/calculator';
import { CalculationRecord } from './CalculationHistoryService';

export interface ExportOptions {
  format: 'pdf' | 'excel' | 'csv' | 'json';
  includeCharts?: boolean;
  includeFormulas?: boolean;
  includeHistory?: boolean;
  customTitle?: string;
  watermark?: string;
}

export interface ExportData {
  calculator: Calculator;
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  timestamp: Date;
  metadata?: Record<string, any>;
}

export class ExportService {
  static async exportCalculation(
    data: ExportData,
    options: ExportOptions
  ): Promise<Blob> {
    switch (options.format) {
      case 'pdf':
        return this.exportToPDF(data, options);
      case 'excel':
        return this.exportToExcel(data, options);
      case 'csv':
        return this.exportToCSV(data, options);
      case 'json':
        return this.exportToJSON(data, options);
      default:
        throw new Error(`Unsupported export format: ${options.format}`);
    }
  }

  static async exportMultipleCalculations(
    calculations: ExportData[],
    options: ExportOptions
  ): Promise<Blob> {
    switch (options.format) {
      case 'pdf':
        return this.exportMultipleToPDF(calculations, options);
      case 'excel':
        return this.exportMultipleToExcel(calculations, options);
      case 'csv':
        return this.exportMultipleToCSV(calculations, options);
      case 'json':
        return this.exportMultipleToJSON(calculations, options);
      default:
        throw new Error(`Unsupported export format: ${options.format}`);
    }
  }

  private static async exportToPDF(
    data: ExportData,
    options: ExportOptions
  ): Promise<Blob> {
    // Using jsPDF for PDF generation
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();

    // Add title
    const title = options.customTitle || `${data.calculator.name} Results`;
    doc.setFontSize(20);
    doc.text(title, 20, 30);

    // Add timestamp
    doc.setFontSize(12);
    doc.text(`Generated: ${data.timestamp.toLocaleString()}`, 20, 45);

    let yPosition = 60;

    // Add inputs section
    doc.setFontSize(16);
    doc.text('Inputs:', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(12);
    data.inputs.forEach(input => {
      const text = `${input.label}: ${this.formatValue(input.value, input.type)}`;
      doc.text(text, 25, yPosition);
      yPosition += 8;
    });

    yPosition += 10;

    // Add outputs section
    doc.setFontSize(16);
    doc.text('Results:', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(12);
    data.outputs.forEach(output => {
      const text = `${output.label}: ${this.formatValue(output.value, output.type)}`;
      doc.text(text, 25, yPosition);
      yPosition += 8;

      if (output.explanation) {
        doc.setFontSize(10);
        doc.text(`  ${output.explanation}`, 25, yPosition);
        yPosition += 6;
        doc.setFontSize(12);
      }
    });

    // Add formulas if requested
    if (options.includeFormulas && data.calculator.formulas) {
      yPosition += 15;
      doc.setFontSize(16);
      doc.text('Formulas:', 20, yPosition);
      yPosition += 10;

      doc.setFontSize(10);
      data.calculator.formulas.forEach(formula => {
        doc.text(`${formula.name}: ${formula.formula}`, 25, yPosition);
        yPosition += 8;
      });
    }

    // Add watermark if specified
    if (options.watermark) {
      doc.setTextColor(200, 200, 200);
      doc.setFontSize(50);
      doc.text(options.watermark, 105, 150, { 
        align: 'center', 
        angle: 45 
      });
    }

    return new Blob([doc.output('blob')], { type: 'application/pdf' });
  }

  private static async exportToExcel(
    data: ExportData,
    options: ExportOptions
  ): Promise<Blob> {
    // Using SheetJS for Excel generation
    const XLSX = await import('xlsx');
    
    const workbook = XLSX.utils.book_new();
    
    // Create main results worksheet
    const wsData = [
      ['Calculator', data.calculator.name],
      ['Generated', data.timestamp.toLocaleString()],
      [''],
      ['Inputs', ''],
      ...data.inputs.map(input => [
        input.label,
        this.formatValue(input.value, input.type)
      ]),
      [''],
      ['Results', ''],
      ...data.outputs.map(output => [
        output.label,
        this.formatValue(output.value, output.type),
        output.explanation || ''
      ])
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');

    // Add formulas sheet if requested
    if (options.includeFormulas && data.calculator.formulas) {
      const formulaData = [
        ['Formula Name', 'Formula', 'Description'],
        ...data.calculator.formulas.map(formula => [
          formula.name,
          formula.formula,
          formula.description || ''
        ])
      ];
      
      const formulaSheet = XLSX.utils.aoa_to_sheet(formulaData);
      XLSX.utils.book_append_sheet(workbook, formulaSheet, 'Formulas');
    }

    const excelBuffer = XLSX.write(workbook, { 
      bookType: 'xlsx', 
      type: 'array' 
    });
    
    return new Blob([excelBuffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
  }

  private static async exportToCSV(
    data: ExportData,
    options: ExportOptions
  ): Promise<Blob> {
    const rows = [
      ['Type', 'Label', 'Value', 'Explanation'],
      ...data.inputs.map(input => [
        'Input',
        input.label,
        this.formatValue(input.value, input.type),
        ''
      ]),
      ...data.outputs.map(output => [
        'Output',
        output.label,
        this.formatValue(output.value, output.type),
        output.explanation || ''
      ])
    ];

    const csvContent = rows
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    return new Blob([csvContent], { type: 'text/csv' });
  }

  private static async exportToJSON(
    data: ExportData,
    options: ExportOptions
  ): Promise<Blob> {
    const exportObject = {
      calculator: {
        id: data.calculator.id,
        name: data.calculator.name,
        category: data.calculator.category
      },
      timestamp: data.timestamp.toISOString(),
      inputs: data.inputs,
      outputs: data.outputs,
      metadata: data.metadata
    };

    if (options.includeFormulas && data.calculator.formulas) {
      exportObject.calculator.formulas = data.calculator.formulas;
    }

    const jsonContent = JSON.stringify(exportObject, null, 2);
    return new Blob([jsonContent], { type: 'application/json' });
  }

  private static async exportMultipleToPDF(
    calculations: ExportData[],
    options: ExportOptions
  ): Promise<Blob> {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();

    calculations.forEach((data, index) => {
      if (index > 0) {
        doc.addPage();
      }

      // Add title for each calculation
      doc.setFontSize(18);
      doc.text(`${data.calculator.name}`, 20, 30);
      doc.setFontSize(12);
      doc.text(`Generated: ${data.timestamp.toLocaleString()}`, 20, 45);

      let yPosition = 60;

      // Add inputs and outputs (simplified for multiple calculations)
      data.outputs.forEach(output => {
        const text = `${output.label}: ${this.formatValue(output.value, output.type)}`;
        doc.text(text, 20, yPosition);
        yPosition += 8;
      });
    });

    return new Blob([doc.output('blob')], { type: 'application/pdf' });
  }

  private static async exportMultipleToExcel(
    calculations: ExportData[],
    options: ExportOptions
  ): Promise<Blob> {
    const XLSX = await import('xlsx');
    const workbook = XLSX.utils.book_new();

    calculations.forEach((data, index) => {
      const wsData = [
        ['Calculator', data.calculator.name],
        ['Generated', data.timestamp.toLocaleString()],
        [''],
        ['Results', ''],
        ...data.outputs.map(output => [
          output.label,
          this.formatValue(output.value, output.type)
        ])
      ];

      const worksheet = XLSX.utils.aoa_to_sheet(wsData);
      const sheetName = `${data.calculator.name.substring(0, 25)}_${index + 1}`;
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    });

    const excelBuffer = XLSX.write(workbook, { 
      bookType: 'xlsx', 
      type: 'array' 
    });
    
    return new Blob([excelBuffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
  }

  private static async exportMultipleToCSV(
    calculations: ExportData[],
    options: ExportOptions
  ): Promise<Blob> {
    const allRows = [['Calculator', 'Label', 'Value', 'Generated']];

    calculations.forEach(data => {
      data.outputs.forEach(output => {
        allRows.push([
          data.calculator.name,
          output.label,
          this.formatValue(output.value, output.type),
          data.timestamp.toLocaleString()
        ]);
      });
    });

    const csvContent = allRows
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    return new Blob([csvContent], { type: 'text/csv' });
  }

  private static async exportMultipleToJSON(
    calculations: ExportData[],
    options: ExportOptions
  ): Promise<Blob> {
    const exportObject = {
      exportDate: new Date().toISOString(),
      calculations: calculations.map(data => ({
        calculator: {
          id: data.calculator.id,
          name: data.calculator.name,
          category: data.calculator.category
        },
        timestamp: data.timestamp.toISOString(),
        inputs: data.inputs,
        outputs: data.outputs,
        metadata: data.metadata
      }))
    };

    const jsonContent = JSON.stringify(exportObject, null, 2);
    return new Blob([jsonContent], { type: 'application/json' });
  }

  private static formatValue(value: any, type?: string): string {
    if (value === null || value === undefined) return '';
    
    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(Number(value));
      case 'percentage':
        return `${Number(value).toFixed(2)}%`;
      case 'number':
        return Number(value).toLocaleString();
      default:
        return String(value);
    }
  }

  static generateFilename(
    calculatorName: string,
    format: string,
    timestamp: Date = new Date()
  ): string {
    const dateStr = timestamp.toISOString().split('T')[0];
    const cleanName = calculatorName.replace(/[^a-zA-Z0-9]/g, '_');
    return `${cleanName}_${dateStr}.${format}`;
  }
}