import satisfactionBadge from '../../assets/Satisfaction Badge-05 1.png'

export default function ReviewTotals({ compareAtTotal, activeTotal, savings }) {
  const monthlyFinancing = (activeTotal / 12).toFixed(2)

  return (
    <div className="flex flex-col gap-[4px] pt-2">
      <div className="flex items-start justify-between gap-3">
        <img
          src={satisfactionBadge}
          alt="30-day satisfaction guarantee"
          width={78}
          height={78}
          loading="lazy"
          decoding="async"
          className="shrink-0"
        />
        <div className="flex flex-col items-end gap-1">
          <span className="bg-wyze-purple text-white font-medium text-[12px] rounded-[3px] px-2 py-[5px] tracking-[-0.6px]">
            as low as ${monthlyFinancing}/mo
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-medium text-[18px] text-gray-c-600 line-through leading-5 tracking-[0.045px]">
              ${compareAtTotal.toFixed(2)}
            </span>
            <span className="font-bold text-[24px] text-wyze-purple leading-8 tracking-[-0.03px]">
              ${activeTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      {savings > 0 && (
        <p className="font-semibold text-[12px] text-wyze-teal text-center tracking-[-0.056px]">
          Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
        </p>
      )}
    </div>
  )
}
