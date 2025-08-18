import React, { useState, useEffect } from 'react';
import { CalculationHistoryService, CalculationRecord, HistoryFilter } from '../../services/CalculationHistoryService';
import { ExportService, ExportOptions } from '../../services/ExportService';

interface CalculatorHistoryProps {
  calculatorId?: string;
  maxItems?: number;
  showFilters?: boolean;
  showExport?: boolean;
  onRecordSelect?: (record: CalculationRecord) => void;
}

export const CalculatorHistory: React.FC<CalculatorHistoryProps> = ({
  calculatorId,
  maxItems = 50,
  showFilters = true,
  showExport = true,
  onRecordSelect
}) => {
  const [records, setRecords] = useState<CalculationRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<CalculationRecord[]>([]);
  const [filter, setFilter] = useState<HistoryFilter>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    loadHistory();
  }, [calculatorId]);

  useEffect(() => {
    applyFilters();
  }, [records, filter, searchTerm, showBookmarkedOnly]);

  const loadHistory = () => {
    const historyFilter: HistoryFilter = calculatorId ? { calculatorId } : {};
    const allRecords = CalculationHistoryService.getHistory(historyFilter);
    setRecords(allRecords.slice(0, maxItems));
  };

  const applyFilters = () => {
    let filtered = records;

    if (showBookmarkedOnly) {
      filtered = filtered.filter(record => record.isBookmarked);
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(record =>
        record.calculatorName.toLowerCase().includes(searchLower) ||
        record.notes?.toLowerCase().includes(searchLower) ||
        record.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    setFilteredRecords(filtered);
  };

  const toggleBookmark = (recordId: string) => {
    const newBookmarkState = CalculationHistoryService.toggleBookmark(recordId);
    setRecords(prevRecords =>
      prevRecords.map(record =>
        record.id === recordId
          ? { ...record, isBookmarked: newBookmarkState }
          : record
      )
    );
  };

  const deleteRecord = (recordId: string) => {
    if (window.confirm('Are you sure you want to delete this calculation?')) {
      CalculationHistoryService.deleteRecord(recordId);
      setRecords(prevRecords => prevRecords.filter(record => record.id !== recordId));
    }
  };

  const exportHistory = async (format: 'csv' | 'json' | 'pdf') => {
    setIsExporting(true);
    try {
      const exportData = filteredRecords.map(record => ({
        calculator: {
          id: record.calculatorId,
          name: record.calculatorName
        } as any,
        inputs: record.inputs,
        outputs: record.outputs,
        timestamp: record.timestamp,
        metadata: {
          notes: record.notes,
          tags: record.tags,
          isBookmarked: record.isBookmarked
        }
      }));

      const options: ExportOptions = {
        format: format as any,
        includeHistory: true,
        customTitle: 'Calculation History'
      };

      const blob = await ExportService.exportMultipleCalculations(exportData, options);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `calculation_history.${format}`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMainResult = (outputs: any[]) => {
    // Get the first output as the main result
    const mainOutput = outputs[0];
    if (!mainOutput) return 'No result';
    
    return `${mainOutput.label}: ${mainOutput.value}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Calculation History
          </h3>
          {showExport && (
            <div className="flex space-x-2">
              <button
                onClick={() => exportHistory('csv')}
                disabled={isExporting}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                Export CSV
              </button>
              <button
                onClick={() => exportHistory('json')}
                disabled={isExporting}
                className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              >
                Export JSON
              </button>
            </div>
          )}
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <input
                type="text"
                placeholder="Search calculations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showBookmarkedOnly}
                onChange={(e) => setShowBookmarkedOnly(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Bookmarked only</span>
            </label>
          </div>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto">
        {filteredRecords.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="text-4xl mb-2">📊</div>
            <p>No calculations found</p>
            <p className="text-sm">Your calculation history will appear here</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => onRecordSelect?.(record)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900">
                        {record.calculatorName}
                      </h4>
                      {record.isBookmarked && (
                        <span className="text-yellow-500">⭐</span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-1">
                      {getMainResult(record.outputs)}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{formatDate(record.timestamp)}</span>
                      {record.tags && record.tags.length > 0 && (
                        <div className="flex space-x-1">
                          {record.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {record.notes && (
                      <p className="text-sm text-gray-600 mt-1 italic">
                        "{record.notes}"
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(record.id);
                      }}
                      className={`p-1 rounded hover:bg-gray-200 ${
                        record.isBookmarked ? 'text-yellow-500' : 'text-gray-400'
                      }`}
                      title={record.isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                    >
                      ⭐
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteRecord(record.id);
                      }}
                      className="p-1 rounded hover:bg-gray-200 text-red-500"
                      title="Delete calculation"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorHistory;