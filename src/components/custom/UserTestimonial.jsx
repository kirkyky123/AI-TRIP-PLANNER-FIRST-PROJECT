import React, { useRef } from "react";

function UserTestimonial({ image, name, text, border }) {
  const boundingRef = useRef(null);

  return (
    <div className="flex flex-col [perspective:800px]">
      <div
        onMouseLeave={() => (boundingRef.current = null)}
        onMouseEnter={(ev) => {
          boundingRef.current = ev.currentTarget.getBoundingClientRect();
        }}
        onMouseMove={(ev) => {
          if (!boundingRef.current) return;
          const x = ev.clientX - boundingRef.current.left;
          const y = ev.clientY - boundingRef.current.top;
          const xPercentage = x / boundingRef.current.width;
          const yPercentage = y / boundingRef.current.height;
          const xRotation = (xPercentage - 0.5) * 20;
          const yRotation = (0.5 - yPercentage) * 20;

          ev.currentTarget.style.setProperty("--x-rotation", `${yRotation}deg`);
          ev.currentTarget.style.setProperty("--y-rotation", `${xRotation}deg`);
          ev.currentTarget.style.setProperty("--x", `${xPercentage * 100}%`);
          ev.currentTarget.style.setProperty("--y", `${yPercentage * 100}%`);
        }}
        className={`group relative rounded-lg shadow-md p-6 mb-4 flex flex-col items-center text-center ${border} border-2 bg-orange-200 dark:bg-black
                    transition-transform ease-out hover:[transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(1.1)]`}
      >
        <img
          src={image}
          alt={name}
          className="w-24 h-24 rounded-full mb-4 object-cover"
        />
        <p className="text-gray-700 dark:text-gray-400 italic mb-4 font-semibold">{text}</p>
        <p className="text-black dark:text-white font-bold text-xl">-{name}</p>
        <div className="pointer-events-none absolute inset-0 group-hover:bg-[radial-gradient(at_var(--x)_var(--y),rgba(173,216,230,0.3)_20%,transparent_80%)] dark:group-hover:bg-[radial-gradient(at_var(--x)_var(--y),rgba(220,255,220,0.3)_20%,transparent_80%)]"/>
      </div>
    </div>
  );
}

export default UserTestimonial;
