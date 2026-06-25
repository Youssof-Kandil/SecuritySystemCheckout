import CountStepper from '../common/CountStepper'

export default function ReviewItem({ name, image, qty, compareAtPrice, price, priceLabel, period, onIncrement, onDecrement, disabled, isPlan }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-[41px] h-[41px] rounded-[5px] bg-white shrink-0 flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={name}
          width={41}
          height={41}
          loading="lazy"
          decoding="async"
          className="object-contain w-full h-full"
        />
      </div>

      <div className="flex-1 min-w-0">
        {isPlan ? (
          <p className="font-bold text-[16px] leading-tight tracking-[-0.032px]">
            <span className="text-gray-c-obsidian">Cam </span>
            <span className="text-wyze-purple">Unlimited</span>
          </p>
        ) : (
          <p className="font-medium text-[14px] text-gray-c-obsidian leading-4 tracking-[0.07px] truncate">
            {name}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <CountStepper
          value={qty}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          disabled={disabled}
          outline={!disabled}
        />
        <div className="text-right min-w-[56px]">
          {compareAtPrice != null && (
            <span className="block font-medium text-[14px] text-gray-c-600 line-through leading-4 tracking-[0.07px]">
              ${(compareAtPrice * qty).toFixed(2)}
            </span>
          )}
          <span className="block font-semibold text-[14px] text-wyze-purple leading-4 tracking-[0.07px]">
            {priceLabel ?? `$${((price ?? 0) * qty).toFixed(2)}${period ? `/${period}` : ''}`}
          </span>
        </div>
      </div>
    </div>
  )
}
