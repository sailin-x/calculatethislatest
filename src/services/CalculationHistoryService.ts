import { Calculator, CalculatorInput, CalculatorOutput } from '../types/calculator';

export interface CalculationRecord {
  id: string;
  calculatorId: string;
  calculatorName: string;
  timestamp: Date;
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  isBookmarked: boolean;
  notes?: string;
  tags?: string[];
}

export interface HistoryFilter {
  calculatorId?: string;
  dateRange?: { start: Date; end: Date };
  bookmarkedOnly?: boolean;
  tags?: string[];
  searchTerm?: string;
}

export class CalculationHistoryService {
  private static readonly STORAGE_KEY = 'calculator_history';
  private static readonly MAX_HISTORY_SIZE = 1000;

  static saveCalculation(
    calculator: Calculator,
    inputs: CalculatorInput[],
    outputs: CalculatorOutput[],
    notes?: string,
    tags?: string[]
  ): CalculationRecord {
    const record: CalculationRecord = {
      id: this.generateId(),
      calculatorId: calculator.id,
      calculatorName: calculator.name,
      timestamp: new Date(),
      inputs: this.cloneInputs(inputs),
      outputs: this.cloneOutputs(outputs),
      isBookmarked: false,
      notes,
      tags: tags || []
    };

    const history = this.getHistory();
    history.unshift(record);

    // Maintain max history size
    if (history.length > this.MAX_HISTORY_SIZE) {
      history.splice(this.MAX_HISTORY_SIZE);
    }

    this.saveHistory(history);
    return record;
  }

  static getHistory(filter?: HistoryFilter): CalculationRecord[] {
    const history = this.loadHistory();
    
    if (!filter) return history;

    return history.filter(record => {
      if (filter.calculatorId && record.calculatorId !== filter.calculatorId) {
        return false;
      }

      if (filter.bookmarkedOnly && !record.isBookmarked) {
        return false;
      }

      if (filter.dateRange) {
        const recordDate = new Date(record.timestamp);
        if (recordDate < filter.dateRange.start || recordDate > filter.dateRange.end) {
          return false;
        }
      }

      if (filter.tags && filter.tags.length > 0) {
        const hasMatchingTag = filter.tags.some(tag => 
          record.tags?.includes(tag)
        );
        if (!hasMatchingTag) return false;
      }

      if (filter.searchTerm) {
        const searchLower = filter.searchTerm.toLowerCase();
        const matchesSearch = 
          record.calculatorName.toLowerCase().includes(searchLower) ||
          record.notes?.toLowerCase().includes(searchLower) ||
          record.tags?.some(tag => tag.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) return false;
      }

      return true;
    });
  }

  static toggleBookmark(recordId: string): boolean {
    const history = this.loadHistory();
    const record = history.find(r => r.id === recordId);
    
    if (record) {
      record.isBookmarked = !record.isBookmarked;
      this.saveHistory(history);
      return record.isBookmarked;
    }
    
    return false;
  }

  static updateRecord(recordId: string, updates: Partial<CalculationRecord>): boolean {
    const history = this.loadHistory();
    const recordIndex = history.findIndex(r => r.id === recordId);
    
    if (recordIndex !== -1) {
      history[recordIndex] = { ...history[recordIndex], ...updates };
      this.saveHistory(history);
      return true;
    }
    
    return false;
  }

  static deleteRecord(recordId: string): boolean {
    const history = this.loadHistory();
    const filteredHistory = history.filter(r => r.id !== recordId);
    
    if (filteredHistory.length !== history.length) {
      this.saveHistory(filteredHistory);
      return true;
    }
    
    return false;
  }

  static clearHistory(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static exportHistory(format: 'json' | 'csv' = 'json'): string {
    const history = this.getHistory();
    
    if (format === 'csv') {
      return this.convertToCSV(history);
    }
    
    return JSON.stringify(history, null, 2);
  }

  private static loadHistory(): CalculationRecord[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Error loading calculation history:', error);
      return [];
    }
  }

  private static saveHistory(history: CalculationRecord[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving calculation history:', error);
    }
  }

  private static generateId(): string {
    return `calc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private static cloneInputs(inputs: CalculatorInput[]): CalculatorInput[] {
    return inputs.map(input => ({ ...input }));
  }

  private static cloneOutputs(outputs: CalculatorOutput[]): CalculatorOutput[] {
    return outputs.map(output => ({ ...output }));
  }

  private static convertToCSV(records: CalculationRecord[]): string {
    if (records.length === 0) return '';

    const headers = [
      'ID', 'Calculator', 'Timestamp', 'Bookmarked', 'Notes', 'Tags',
      'Inputs', 'Outputs'
    ];

    const rows = records.map(record => [
      record.id,
      record.calculatorName,
      record.timestamp.toISOString(),
      record.isBookmarked ? 'Yes' : 'No',
      record.notes || '',
      record.tags?.join('; ') || '',
      JSON.stringify(record.inputs),
      JSON.stringify(record.outputs)
    ]);

    return [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
  }
}