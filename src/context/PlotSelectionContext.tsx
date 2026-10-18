import React, { createContext, useContext, useState } from 'react';

export const PLOT_OPTIONS = [
  '11,000 sq ft',
  '20,000 sq ft',
  '1 acre',
  '2 acres',
  '3 acres',
  '4 acres',
  '5 acres',
];

interface PlotSelectionContextType {
  selectedPlot: string;
  setSelectedPlot: (plot: string) => void;
  selectPlotAndScroll: (plot: string) => void;
}

const PlotSelectionContext = createContext<PlotSelectionContextType | undefined>(undefined);

export const PlotSelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPlot, setSelectedPlot] = useState<string>('');

  const selectPlotAndScroll = (plot: string) => {
    setSelectedPlot(plot);
    const enquiryElem = document.getElementById('enquiry');
    if (enquiryElem) {
      enquiryElem.scrollIntoView({ behavior: 'smooth' });
      // Give focus to the select element after scrolling
      setTimeout(() => {
        const selectElem = document.getElementById('plot-size-select');
        if (selectElem) {
          selectElem.focus();
        }
      }, 500);
    }
  };

  return (
    <PlotSelectionContext.Provider
      value={{
        selectedPlot,
        setSelectedPlot,
        selectPlotAndScroll,
      }}
    >
      {children}
    </PlotSelectionContext.Provider>
  );
};

export const usePlotSelection = (): PlotSelectionContextType => {
  const ctx = useContext(PlotSelectionContext);
  if (!ctx) {
    throw new Error('usePlotSelection must be used within a PlotSelectionProvider');
  }
  return ctx;
};
