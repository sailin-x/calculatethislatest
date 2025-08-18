import React, { useState, useRef, useEffect } from 'react';
import { HelpSystemService, ContextualHelp as ContextualHelpType } from '../../services/HelpSystemService';

interface ContextualHelpProps {
  calculatorId: string;
  fieldId: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  className?: string;
}

export const ContextualHelp: React.FC<ContextualHelpProps> = ({
  calculatorId,
  fieldId,
  children,
  position = 'top',
  trigger = 'hover',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [helpContent, setHelpContent] = useState<ContextualHelpType | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = HelpSystemService.getContextualHelp(calculatorId, fieldId);
    setHelpContent(content);
  }, [calculatorId, fieldId]);

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      updateTooltipPosition();
    }
  }, [isVisible, position]);

  const updateTooltipPosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let x = 0;
    let y = 0;

    switch (position) {
      case 'top':
        x = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
        y = triggerRect.top - tooltipRect.height - 8;
        break;
      case 'bottom':
        x = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
        y = triggerRect.bottom + 8;
        break;
      case 'left':
        x = triggerRect.left - tooltipRect.width - 8;
        y = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
        break;
      case 'right':
        x = triggerRect.right + 8;
        y = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
        break;
    }

    // Adjust for viewport boundaries
    if (x < 8) x = 8;
    if (x + tooltipRect.width > viewport.width - 8) {
      x = viewport.width - tooltipRect.width - 8;
    }
    if (y < 8) y = 8;
    if (y + tooltipRect.height > viewport.height - 8) {
      y = viewport.height - tooltipRect.height - 8;
    }

    setTooltipPosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      setIsVisible(!isVisible);
    }
  };

  const handleFocus = () => {
    if (trigger === 'focus') {
      setIsVisible(true);
    }
  };

  const handleBlur = () => {
    if (trigger === 'focus') {
      setIsVisible(false);
    }
  };

  if (!helpContent) {
    return <div className={className}>{children}</div>;
  }

  return (
    <>
      <div
        ref={triggerRef}
        className={`relative inline-block ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {children}
        <button
          className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
          aria-label="Help"
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isVisible && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsVisible(false)}
          />
          <div
            ref={tooltipRef}
            className="fixed z-50 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-lg"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y
            }}
          >
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {helpContent.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {helpContent.description}
                </p>
              </div>

              {helpContent.examples && helpContent.examples.length > 0 && (
                <div>
                  <h5 className="font-medium text-gray-800 text-sm mb-1">
                    Examples:
                  </h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {helpContent.examples.map((example, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-green-500 mr-2">•</span>
                        <code className="bg-gray-100 px-1 rounded text-xs">
                          {example}
                        </code>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {helpContent.tips && helpContent.tips.length > 0 && (
                <div>
                  <h5 className="font-medium text-gray-800 text-sm mb-1">
                    Tips:
                  </h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {helpContent.tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-0.5">💡</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {helpContent.relatedLinks && helpContent.relatedLinks.length > 0 && (
                <div>
                  <h5 className="font-medium text-gray-800 text-sm mb-1">
                    Related:
                  </h5>
                  <ul className="text-sm space-y-1">
                    {helpContent.relatedLinks.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.url}
                          className="text-blue-600 hover:text-blue-800 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Arrow */}
            <div
              className={`absolute w-2 h-2 bg-white border transform rotate-45 ${
                position === 'top'
                  ? 'bottom-[-4px] left-1/2 -translate-x-1/2 border-r border-b'
                  : position === 'bottom'
                  ? 'top-[-4px] left-1/2 -translate-x-1/2 border-l border-t'
                  : position === 'left'
                  ? 'right-[-4px] top-1/2 -translate-y-1/2 border-t border-r'
                  : 'left-[-4px] top-1/2 -translate-y-1/2 border-b border-l'
              }`}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ContextualHelp;