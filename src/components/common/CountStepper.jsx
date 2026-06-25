export default function CountStepper({ value, onIncrement, onDecrement, disabled, outline = false }) {
  const atZero = value === 0
  const minusDisabled = disabled || atZero

  return (
    <div className="flex items-center justify-center gap-[10px] py-[4px]">
      <button
        onClick={onDecrement}
        disabled={minusDisabled}
        aria-label="Decrease quantity"
        className={`w-5 h-5 rounded-[4px] flex items-center justify-center transition-colors
          ${minusDisabled
            ? 'bg-near-white border-2 border-gray-c-400 cursor-not-allowed'
            : 'bg-white border-2 border-gray-c-300 cursor-pointer hover:border-gray-c-400'
          }`}
      >
        <span className="text-gray-c-obsidian text-xs leading-none select-none">−</span>
      </button>

      <span className="font-medium text-[16px] text-gray-c-obsidian leading-[20px] min-w-[8px] text-center">
        {value}
      </span>

      <button
        onClick={onIncrement}
        disabled={disabled}
        aria-label="Increase quantity"
        className={`w-5 h-5 rounded-[4px] flex items-center justify-center transition-colors
          ${disabled
            ? 'bg-gray-c-200 cursor-not-allowed opacity-50'
            : outline
              ? 'bg-white border-2 border-gray-c-300 cursor-pointer hover:border-gray-c-400'
              : 'bg-gray-c-200 cursor-pointer hover:bg-gray-c-300'
          }`}
      >
        <span className="text-gray-c-obsidian text-xs leading-none select-none">+</span>
      </button>
    </div>
  )
}
