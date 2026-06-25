export default function ReviewActions({ hasCameraSelected }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative group/checkout">
        <button
          disabled={!hasCameraSelected}
          onClick={() => hasCameraSelected && alert('Order placed.')}
          className={`w-full bg-wyze-purple text-white rounded-[4px] py-[13px] px-4 text-[17px] font-bold transition-opacity
            ${hasCameraSelected ? 'cursor-pointer hover:opacity-90' : 'opacity-50 cursor-not-allowed'}`}
          style={{ fontFamily: "'TT Norms Pro', sans-serif" }}
        >
          Checkout
        </button>
        {!hasCameraSelected && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-dark text-white text-[12px] rounded-[4px] whitespace-nowrap opacity-0 group-hover/checkout:opacity-100 pointer-events-none transition-opacity duration-150">
            Please choose at least 1 camera to continue
          </div>
        )}
      </div>
      <button
        onClick={() => alert('System saved!')}
        className="w-full text-[14px] italic text-gray-mid underline tracking-[-0.016px] leading-[1.2] text-center cursor-pointer hover:text-gray-dark transition-colors bg-transparent border-none"
      >
        Save my system for later
      </button>
    </div>
  )
}
