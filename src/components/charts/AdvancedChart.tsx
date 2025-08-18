import React, { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export interface ChartDataPoint {
  x: number | string;
  y: number;
  label?: string;
  color?: string;
}

export interface ChartSeries {
  name: string;
  data: ChartDataPoint[];
  color?: string;
  type?: 'line' | 'bar' | 'area';
}

export interface AdvancedChartProps {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'area' | 'combo';
  series: ChartSeries[];
  title?: string;
  subtitle?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  height?: number;
  width?: number;
  interactive?: boolean;
  exportable?: boolean;
  theme?: 'light' | 'dark';
  animations?: boolean;
  showLegend?: boolean;
  showTooltips?: boolean;
  gridLines?: boolean;
  responsive?: boolean;
  onDataPointClick?: (dataPoint: ChartDataPoint, seriesIndex: number) => void;
  customOptions?: any;
}

export const AdvancedChart: React.FC<AdvancedChartProps> = ({
  type,
  series,
  title,
  subtitle,
  xAxisLabel,
  yAxisLabel,
  height = 400,
  width,
  interactive = true,
  exportable = false,
  theme = 'light',
  animations = true,
  showLegend = true,
  showTooltips = true,
  gridLines = true,
  responsive = true,
  onDataPointClick,
  customOptions = {}
}) => {
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [chartOptions, setChartOptions] = useState<any>(null);

  useEffect(() => {
    const data = prepareChartData();
    const options = prepareChartOptions();
    
    setChartData(data);
    setChartOptions(options);
  }, [series, type, theme, showLegend, showTooltips, gridLines, animations]);

  const prepareChartData = () => {
    const colors = [
      '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
      '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
    ];

    if (type === 'pie' || type === 'doughnut') {
      // For pie/doughnut charts, use the first series
      const firstSeries = series[0];
      return {
        labels: firstSeries.data.map(point => point.label || point.x),
        datasets: [{
          data: firstSeries.data.map(point => point.y),
          backgroundColor: firstSeries.data.map((point, index) => 
            point.color || colors[index % colors.length]
          ),
          borderWidth: 2,
          borderColor: theme === 'dark' ? '#374151' : '#ffffff'
        }]
      };
    }

    // For line/bar/area charts
    const datasets = series.map((serie, index) => {
      const baseColor = serie.color || colors[index % colors.length];
      
      const dataset: any = {
        label: serie.name,
        data: serie.data.map(point => ({
          x: point.x,
          y: point.y
        })),
        borderColor: baseColor,
        backgroundColor: serie.type === 'area' 
          ? `${baseColor}20` 
          : baseColor,
        borderWidth: 2,
        fill: serie.type === 'area',
        tension: 0.4
      };

      if (type === 'combo') {
        dataset.type = serie.type || 'line';
      }

      return dataset;
    });

    // Get all unique x values for labels
    const allXValues = new Set<string>();
    series.forEach(serie => {
      serie.data.forEach(point => {
        allXValues.add(String(point.x));
      });
    });

    return {
      labels: Array.from(allXValues).sort(),
      datasets
    };
  };

  const prepareChartOptions = () => {
    const baseOptions: any = {
      responsive,
      maintainAspectRatio: !height,
      animation: animations,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        title: {
          display: !!(title || subtitle),
          text: title,
          font: {
            size: 16,
            weight: 'bold'
          },
          color: theme === 'dark' ? '#F9FAFB' : '#111827'
        },
        subtitle: {
          display: !!subtitle,
          text: subtitle,
          font: {
            size: 12
          },
          color: theme === 'dark' ? '#D1D5DB' : '#6B7280'
        },
        legend: {
          display: showLegend,
          position: 'top',
          labels: {
            color: theme === 'dark' ? '#F9FAFB' : '#111827',
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          enabled: showTooltips,
          backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
          titleColor: theme === 'dark' ? '#F9FAFB' : '#111827',
          bodyColor: theme === 'dark' ? '#D1D5DB' : '#6B7280',
          borderColor: theme === 'dark' ? '#6B7280' : '#E5E7EB',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            label: (context: any) => {
              const label = context.dataset.label || '';
              const value = context.parsed.y;
              return `${label}: ${formatTooltipValue(value)}`;
            }
          }
        }
      },
      onClick: interactive && onDataPointClick ? handleChartClick : undefined
    };

    // Add scales for non-pie charts
    if (type !== 'pie' && type !== 'doughnut') {
      baseOptions.scales = {
        x: {
          display: true,
          title: {
            display: !!xAxisLabel,
            text: xAxisLabel,
            color: theme === 'dark' ? '#F9FAFB' : '#111827'
          },
          grid: {
            display: gridLines,
            color: theme === 'dark' ? '#374151' : '#E5E7EB'
          },
          ticks: {
            color: theme === 'dark' ? '#D1D5DB' : '#6B7280'
          }
        },
        y: {
          display: true,
          title: {
            display: !!yAxisLabel,
            text: yAxisLabel,
            color: theme === 'dark' ? '#F9FAFB' : '#111827'
          },
          grid: {
            display: gridLines,
            color: theme === 'dark' ? '#374151' : '#E5E7EB'
          },
          ticks: {
            color: theme === 'dark' ? '#D1D5DB' : '#6B7280',
            callback: function(value: any) {
              return formatAxisValue(value);
            }
          }
        }
      };
    }

    // Merge with custom options
    return { ...baseOptions, ...customOptions };
  };

  const handleChartClick = (event: any, elements: any[]) => {
    if (elements.length > 0 && onDataPointClick) {
      const element = elements[0];
      const datasetIndex = element.datasetIndex;
      const dataIndex = element.index;
      
      const dataPoint = series[datasetIndex]?.data[dataIndex];
      if (dataPoint) {
        onDataPointClick(dataPoint, datasetIndex);
      }
    }
  };

  const formatTooltipValue = (value: number): string => {
    if (Math.abs(value) >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (Math.abs(value) >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    } else {
      return `$${value.toLocaleString()}`;
    }
  };

  const formatAxisValue = (value: number): string => {
    if (Math.abs(value) >= 1000000) {
      return `${(value / 1000000).toFixed(0)}M`;
    } else if (Math.abs(value) >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    } else {
      return value.toLocaleString();
    }
  };

  const exportChart = (format: 'png' | 'jpg' | 'pdf' = 'png') => {
    if (chartRef.current) {
      const canvas = chartRef.current.canvas;
      const url = canvas.toDataURL(`image/${format}`);
      
      const link = document.createElement('a');
      link.download = `chart.${format}`;
      link.href = url;
      link.click();
    }
  };

  if (!chartData || !chartOptions) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 rounded-lg"
        style={{ height, width }}
      >
        <div className="text-gray-500">Loading chart...</div>
      </div>
    );
  }

  return (
    <div className="relative">
      {exportable && (
        <div className="absolute top-2 right-2 z-10">
          <div className="flex space-x-2">
            <button
              onClick={() => exportChart('png')}
              className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              PNG
            </button>
            <button
              onClick={() => exportChart('jpg')}
              className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              JPG
            </button>
          </div>
        </div>
      )}
      
      <div style={{ height, width }}>
        <Chart
          ref={chartRef}
          type={type === 'combo' ? 'line' : type}
          data={chartData}
          options={chartOptions}
        />
      </div>
    </div>
  );
};

export default AdvancedChart;