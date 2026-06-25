import CountStepper from '../common/CountStepper'
import VariantChip from '../common/VariantChip'

const pngMap = import.meta.glob('../../assets/*.png', { eager: true, query: '?url', import: 'default' })
const svgMap = import.meta.glob('../../assets/*.svg', { eager: true, query: '?url', import: 'default' })

function resolveImage(filename) {
  if (!filename) return ''
  const key = `../../assets/${filename}`
  return pngMap[key] ?? svgMap[key] ?? ''
}

export default function ProductCard({ product, quantities, activeVariant, onIncrement, onDecrement, onVariantChange }) {
  const hasVariants = product.variants && product.variants.length > 0

  const qtyKey = hasVariants ? `${product.id}__${activeVariant}` : product.id
  const currentQty = quantities[qtyKey] ?? 0
  const isSelected = product.fixed || (hasVariants
    ? product.variants.some((v) => (quantities[`${product.id}__${v.id}`] ?? 0) > 0)
    : currentQty > 0)

  const displayImage = hasVariants
    ? (product.variants.find((v) => v.id === activeVariant)?.image ?? product.image)
    : product.image

  return (
    <div
      className={`flex flex-row gap-[19px] items-center rounded-[10px] p-[11px] bg-white
        ${isSelected ? 'border-2 border-[rgba(78,47,210,0.7)]' : 'border border-transparent'}`}
    >
      <div className="relative h-[137px] w-[101px] rounded-[5px] overflow-hidden shrink-0">
        {product.badge && (
          <span className="absolute top-0 left-0 z-10 bg-wyze-purple text-white text-[12px] font-semibold px-[6px] py-[2px] rounded-[10px]">
            {product.badge}
          </span>
        )}
        {product.fixed && (
          <span className="absolute top-0 left-0 z-10 bg-wyze-teal text-white text-[12px] font-semibold px-[6px] py-[2px] rounded-[10px]">
            Required
          </span>
        )}
        <img
          src={resolveImage(displayImage)}
          alt={product.name}
          width={101}
          height={137}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex-1 flex flex-col gap-[10px] min-w-0">
        <div className="flex flex-col gap-[8px] tracking-[0.6px]">
          <p className="font-semibold text-[16px] text-gray-dark leading-none">
            {product.name}
          </p>
          <p className="font-medium text-[12px] text-[rgba(31,31,31,0.75)] leading-[1.3]">
            {product.description}{' '}
            <a href={product.learnMoreUrl} target="_blank" rel="noopener noreferrer" className="text-[#0000EE] underline">Learn More</a>
          </p>
        </div>

        {hasVariants && (
          <div className="flex gap-[6px] items-end flex-wrap">
            {product.variants.map((v) => (
              <VariantChip
                key={v.id}
                label={v.label}
                image={resolveImage(v.image)}
                selected={activeVariant === v.id}
                onClick={() => onVariantChange(product.id, v.id)}
              />
            ))}
          </div>
        )}

        <div className="flex gap-[10px] items-end w-full">
          <div className="w-[80px] shrink-0">
            <CountStepper
              value={currentQty}
              onIncrement={() => onIncrement(qtyKey)}
              onDecrement={() => onDecrement(qtyKey)}
              disabled={product.fixed}
            />
          </div>
          <div className="flex-1 flex flex-col items-end gap-[3px] text-[16px] tracking-[0.6px]">
            {product.compareAtPrice && (
              <span className="text-wyze-red line-through leading-none">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
            <span className="text-utility-gray leading-none">
              {product.priceLabel ?? `$${product.price.toFixed(2)}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
