import DeliveryIcon from '../../assets/carbon_delivery.svg?react'
import ReviewSection from './ReviewSection'

export default function ReviewShipping() {
  return (
    <ReviewSection title="Shipping">
      <div className="flex items-center gap-3">
        <div className="w-[41px] h-[41px] rounded-[5px] bg-white shrink-0 flex items-center justify-center">
          <DeliveryIcon aria-hidden="true" className="w-[29px] h-[29px]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-[14px] text-gray-c-obsidian leading-4 tracking-[0.07px]">
            Fast Shipping
          </p>
        </div>
        <div className="text-right min-w-[56px]">
          <span className="block font-medium text-[14px] text-gray-c-600 line-through leading-4 tracking-[0.07px]">$5.99</span>
          <span className="block font-semibold text-[14px] text-wyze-purple leading-4 tracking-[0.07px]">FREE</span>
        </div>
      </div>
    </ReviewSection>
  )
}
