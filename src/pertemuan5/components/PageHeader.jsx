// components/PageHeader.jsx
import React from 'react';

export default function PageHeader({ title, breadcrumb, children }) {
  // Render breadcrumb sesuai tipe: string atau array
  const renderBreadcrumb = () => {
    if (typeof breadcrumb === 'string') {
      return <span className="text-gray-500">{breadcrumb}</span>;
    }

    if (Array.isArray(breadcrumb)) {
      return breadcrumb.map((item, index) => (
        <React.Fragment key={index}>
          <span className="text-gray-500">{item}</span>
          {index < breadcrumb.length - 1 && (
            <span className="text-gray-500 mx-1">/</span>
          )}
        </React.Fragment>
      ));
    }

    return null;
  };

  return (
    <div id="pageheader-container" className="flex items-center justify-between p-4">
      <div id="pageheader-left" className="flex flex-col">
        <span id="page-title" className="text-3xl font-semibold">
          {title}
        </span>
        <div id="breadcrumb-links" className="flex items-center font-medium mt-2">
          {renderBreadcrumb()}
        </div>
      </div>

      <div id="action-button" className="flex gap-2">
        {children}
      </div>
    </div>
  );
}
