import React from 'react';

const WeatherIcon: React.FC = () => (
  <div>
    <svg
    height="20px"
    style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision',  }}
    version="1.1"
    viewBox="0 0 64 64"
    width="20px"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <style type="text/css">{`
        .fil2 {fill:#0E6096}
        .fil3 {fill:#1AB5ED}
        .fil0 {fill:#FFC106}
        .fil1 {fill:#FFC106;fill-rule:nonzero}
      `}</style>
    </defs>
    <g id="Layer_x0020_1">
      <g id="_744329904">
        <path className="fil0" d="M43.02 17.04c5.97,1.6 9.83,7.12 9.57,13.05 -1.75,-1.18 -3.85,-1.86 -6.1,-1.86 -0.49,0 -0.98,0.03 -1.45,0.09 -0.52,-3.82 -3.79,-6.76 -7.76,-6.76 -2.72,0 -5.12,1.39 -6.52,3.49 -0.97,-0.25 -1.98,-0.41 -3.01,-0.47 2.43,-5.91 8.93,-9.24 15.27,-7.54z" />
        <path className="fil1" d="M38.43 9.92c0,-0.69 0.56,-1.25 1.25,-1.25 0.69,0 1.25,0.56 1.25,1.25l0 1.99c0,0.69 -0.56,1.25 -1.25,1.25 -0.69,0 -1.25,-0.56 -1.25,-1.25l0 -1.99z" />
        <path className="fil1" d="M48.4 11.92c0.35,-0.6 1.11,-0.8 1.71,-0.46 0.59,0.35 0.79,1.11 0.45,1.71l-1 1.73c-0.35,0.59 -1.11,0.79 -1.7,0.45 -0.6,-0.35 -0.8,-1.11 -0.46,-1.7l1 -1.73z" />
        <path className="fil1" d="M56.03 18.64c0.6,-0.34 1.36,-0.14 1.7,0.46 0.34,0.59 0.14,1.35 -0.46,1.69l-1.73 1c-0.59,0.34 -1.35,0.14 -1.69,-0.46 -0.35,-0.59 -0.14,-1.35 0.45,-1.7l1.73 -0.99z" />
        <path className="fil1" d="M59.28 28.26c0.69,0 1.25,0.56 1.25,1.25 0,0.69 -0.56,1.25 -1.25,1.25l-2 0c-0.69,0 -1.25,-0.56 -1.25,-1.25 0,-0.69 0.56,-1.25 1.25,-1.25l2 0z" />
        <path className="fil1" d="M22.09 20.79c-0.6,-0.34 -0.8,-1.1 -0.46,-1.69 0.34,-0.6 1.1,-0.8 1.7,-0.46l1.73 0.99c0.59,0.35 0.8,1.11 0.46,1.7 -0.35,0.6 -1.11,0.8 -1.7,0.46l-1.73 -1z" />
        <path className="fil1" d="M28.8 13.16c-0.34,-0.59 -0.13,-1.35 0.46,-1.7 0.6,-0.34 1.36,-0.13 1.7,0.46l1 1.73c0.34,0.6 0.14,1.36 -0.46,1.7 -0.59,0.34 -1.36,0.14 -1.7,-0.46l-1 -1.73z" />
        <path className="fil2" d="M9.82 55.04c-0.2,-0.05 -0.39,-0.1 -0.59,-0.16 0.2,0.06 0.39,0.11 0.59,0.16zm-0.97 -0.29c-0.37,-0.14 -0.74,-0.3 -1.09,-0.49 0.35,0.19 0.72,0.35 1.09,0.49zm-1.09 -0.49c-1.39,-0.76 -2.54,-1.91 -3.3,-3.3 0.76,1.39 1.91,2.54 3.3,3.3zm-3.3 -3.31c-0.19,-0.34 -0.35,-0.71 -0.49,-1.08 0.14,0.37 0.3,0.74 0.49,1.08zm-0.62 -1.47c-0.06,-0.19 -0.11,-0.38 -0.16,-0.58 0.05,0.2 0.1,0.39 0.16,0.58zm7.68 -10.64c0.1,-1.49 0.42,-2.93 0.91,-4.27 -0.49,1.34 -0.8,2.78 -0.9,4.27l-0.01 0zm19.25 -13.82c1.41,-2.09 3.8,-3.47 6.51,-3.47 3.96,0 7.24,2.94 7.75,6.76 0.48,-0.06 0.96,-0.09 1.45,-0.09 6.05,0 10.95,4.9 10.95,10.95 0,1.77 -0.42,3.43 -1.16,4.91 -0.82,-0.43 -1.76,-0.68 -2.76,-0.68 -0.66,-5.15 -5.06,-9.13 -10.4,-9.13 -0.64,0 -1.27,0.06 -1.88,0.17 -1.75,-4.61 -5.64,-8.15 -10.46,-9.42z" />
        <path className="fil3" d="M11.67 55.25c-4.53,0 -8.2,-3.68 -8.2,-8.2 0,-4.48 3.59,-8.13 8.06,-8.21 0.53,-8 7.19,-14.32 15.33,-14.32 6.57,0 12.17,4.12 14.37,9.92 0.61,-0.11 1.24,-0.17 1.88,-0.17 5.33,0 9.74,3.98 10.4,9.13 3.27,0 5.92,2.65 5.92,5.92 0,3.23 -2.57,5.85 -5.77,5.92 -14,0.2 -27.99,0.01 -41.99,0.01z" />
      </g>
    </g>
  </svg>
  </div>
);

export default WeatherIcon;
