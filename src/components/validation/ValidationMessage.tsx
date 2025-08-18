import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle, 
  Info, 
  HelpCircle,
  X 
} from 'lucide-react';

export type ValidationMessageType = 'error' | 'warning' | 'success' | 'info';

interface ValidationMessageProps {
  type: ValidationMessageType;
  message: string;
  help?: string;
  field?: string;
  onDismiss?: () => void;
  showHelp?: boolean;
  className?: string;
}

export function ValidationMessage({
  type,
  message,
  help,
  field,
  onDismiss,
  showHelp = true,
  className
}: ValidationMessageProps) {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return <AlertCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'info':
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getVariant = () => {
    switch (type) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'default';
      case 'success':
        return 'default';
      case 'info':
      default:
        return 'default';
    }
  };

  const getColorClasses = () => {
    switch (type) {
      case 'error':
        return 'border-red-200 bg-red-50 text-red-800';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'success':
        return 'border-green-200 bg-green-50 text-green-800';
      case 'info':
      default:
        return 'border-blue-200 bg-blue-50 text-blue-800';
    }
  };

  return (
    <Alert variant={getVariant()} className={`${getColorClasses()} ${className}`}>
      <div className="flex items-start gap-2">
        {getIcon()}
        <div className="flex-1 space-y-2">
          <AlertDescription className="text-sm font-medium">
            {field && (
              <Badge variant="outline" className="mr-2 text-xs">
                {field}
              </Badge>
            )}
            {message}
          </AlertDescription>
          
          {help && showHelp && (
            <div className="flex items-start gap-2 mt-2 p-2 rounded bg-white/50 border border-current/20">
              <HelpCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p className="text-xs">{help}</p>
            </div>
          )}
        </div>
        
        {onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-6 w-6 p-0 hover:bg-current/10"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </Alert>
  );
}

interface ValidationSummaryProps {
  errors: Record<string, string>;
  warnings?: Record<string, string>;
  onFieldFocus?: (fieldName: string) => void;
  className?: string;
}

export function ValidationSummary({
  errors,
  warnings = {},
  onFieldFocus,
  className
}: ValidationSummaryProps) {
  const errorCount = Object.keys(errors).length;
  const warningCount = Object.keys(warnings).length;

  if (errorCount === 0 && warningCount === 0) {
    return null;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {errorCount > 0 && (
        <Alert variant="destructive" className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-medium text-red-800">
                Please fix {errorCount} error{errorCount !== 1 ? 's' : ''} before calculating:
              </p>
              <ul className="space-y-1 text-sm">
                {Object.entries(errors).map(([field, error]) => (
                  <li key={field} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => onFieldFocus?.(field)}
                      className="p-0 h-auto text-red-700 hover:text-red-900 text-left"
                    >
                      {error}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {warningCount > 0 && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-medium text-yellow-800">
                {warningCount} warning{warningCount !== 1 ? 's' : ''}:
              </p>
              <ul className="space-y-1 text-sm">
                {Object.entries(warnings).map(([field, warning]) => (
                  <li key={field} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0" />
                    <span className="text-yellow-700">{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}