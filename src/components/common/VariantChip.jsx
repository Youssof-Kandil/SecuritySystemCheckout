export default function VariantChip({ label, image, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      aria-label={`Select ${label} variant`}
      className={`flex items-center justify-center gap-[3px] h-[26px] w-[65px] rounded-[2px] cursor-pointer transition-colors
        ${selected
          ? 'border-[0.5px] border-wyze-teal bg-[rgba(29,240,187,0.04)] px-[3px] py-px'
          : 'border-[0.5px] border-gray-light bg-white hover:border-gray-c-400 px-[5px] py-px'
        }`}
    >
      <div className="relative w-[28px] h-[28px] rounded-[5px] overflow-hidden shrink-0">
        <img
          src={image}
          alt={label}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
      <span className="font-medium text-[10px] text-gray-dark tracking-[0.6px] whitespace-nowrap leading-none">
        {label}
      </span>
    </button>
  )
}
