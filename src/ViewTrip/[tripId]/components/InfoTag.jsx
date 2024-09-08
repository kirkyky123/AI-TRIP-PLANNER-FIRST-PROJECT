import React from 'react'

function InfoTag({ icon, text }) {
  return (
    <div className="flex items-center space-x-2 bg-light-secondary dark:bg-gray-200 text-light-foreground px-4 py-2 rounded-full shadow-md">
      <span className="text-2xl">{icon}</span>
      <span className="font-semibold">{text}</span>
    </div>
  );
}

export default InfoTag