import React from 'react';

const DashHeader = ({ category, title }) => (
  <div className=" mb-6">
    <p className="text-lg text-gray-400">{category}</p>
    <p className="text-3xl font-extrabold tracking-tight text-slate-900">
      {title}
    </p>
  </div>
);

export default DashHeader;
