import React from 'react';
import { ArrowRight, Compass, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePlotSelection, PLOT_OPTIONS } from '../context/PlotSelectionContext';
import { ASSETS } from '../assets';
import { trackEvent } from '../utils/analytics';
import './PlotSizes.css';

const PlotSizes: React.FC = () => {
  const { t } = useLanguage();
  const { selectPlotAndScroll } = usePlotSelection();

  const handleRequestPrice = (plotSize: string) => {
    trackEvent('plot_size_select', { plotSize });
    selectPlotAndScroll(plotSize);
  };

  return (
    <section id="plots" className="plots-section section-padding" aria-label="Available Agricultural Plot Sizes and Internal Roads">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="plots-header">
          <span className="eyebrow">{t.plots.label}</span>
          <h2 className="plots-heading">{t.plots.heading}</h2>
          <p className="plots-subheading">{t.plots.note}</p>
        </div>

        {/* 7 Plot Options Table / Cards */}
        <div className="plots-table-wrapper">
          <div className="plots-table" role="table" aria-label="Agricultural Plot Sizes">
            <div className="plots-table-header" role="row">
              <span className="col-size" role="columnheader">Plot Size</span>
              <span className="col-type" role="columnheader">Land Classification</span>
              <span className="col-price" role="columnheader">Pricing</span>
              <span className="col-action" role="columnheader">Action</span>
            </div>

            {PLOT_OPTIONS.map((size) => (
              <div key={size} className="plots-table-row" role="row">
                <div className="col-size" role="cell">
                  <span className="mobile-col-label">Size:</span>
                  <strong className="size-title">{size}</strong>
                </div>

                <div className="col-type" role="cell">
                  <span className="mobile-col-label">Classification:</span>
                  <span className="type-badge">Agricultural Plot</span>
                </div>

                <div className="col-price" role="cell">
                  <span className="mobile-col-label">Price:</span>
                  <span className="price-tag">{t.plots.priceOnRequest}</span>
                </div>

                <div className="col-action" role="cell">
                  <button
                    type="button"
                    className="btn btn-outline btn-request-price"
                    onClick={() => handleRequestPrice(size)}
                    aria-label={`Request price for ${size}`}
                  >
                    <span>{t.plots.requestPrice}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 30-Foot Internal Arterial Roads Feature Box */}
        <div className="plots-roads-feature">
          <div className="roads-feature-grid">
            <div className="roads-image-box">
              <img 
                src={ASSETS.images.road} 
                alt="30 ft wide elegant internal arterial road at Purandar Highlands" 
                className="roads-feature-img"
                loading="lazy"
                decoding="async"
                width="640"
                height="400"
              />
            </div>
            <div className="roads-text-box">
              <div className="roads-badge">
                <Compass size={18} />
                <span>INTERNAL INFRASTRUCTURE</span>
              </div>
              <h3 className="roads-heading">Wide, Elegant 30-Foot Roads</h3>
              <p className="roads-desc">
                {t.plots.roadsCopy}
              </p>
              <div className="roads-note-pill">
                <Shield size={16} />
                <span>Clear car turning radius & comfortable access for personal vehicles</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PlotSizes;
