import * as Accordion from '@radix-ui/react-accordion'
import ProductCard from './ProductCard'
import useStore from '../../store/useStore'
import CarrotDown from '../../assets/carrot-down.svg?react'

export default function AccordionStep({ stepNumber, title, icon: Icon, products, nextTitle, isLast }) {
  const value = String(stepNumber - 1)
  const { quantities, activeVariants, increment, decrement, setActiveVariant, selectedCount } = useStore()
  const count = selectedCount(products)

  return (
    <Accordion.Item
      value={value}
      className="group/item flex flex-col gap-[5px] data-[state=open]:bg-blue-bg data-[state=open]:rounded-[10px] data-[state=open]:pt-[15px] transition-[background-color] duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]"
    >
      <div className="px-[15px]">
        <span className="font-medium text-[10px] group-data-[state=open]/item:text-[12px] text-gray-mid tracking-[1.6px] uppercase leading-none">
          STEP {stepNumber} OF 4
        </span>
      </div>

      <Accordion.Header className="flex">
        <Accordion.Trigger className="group w-full text-left border-t-[0.5px] border-gray-dark data-[state=closed]:border-b-[0.5px] px-[15px] py-5 cursor-pointer">
          <div className="flex items-center gap-[3px]">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {Icon && <Icon aria-hidden="true" className="w-[26px] h-[26px] shrink-0" />}
              <span className="font-semibold text-[22px] text-gray-c-obsidian leading-none">
                {title}
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {count > 0 && (
                <span className="font-medium text-[14px] text-wyze-purple leading-4 whitespace-nowrap">
                  {count} selected
                </span>
              )}
              <CarrotDown
                aria-hidden="true"
                className="shrink-0 transition-[transform,color] duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] group-data-[state=open]:rotate-180 text-gray-c-obsidian group-data-[state=open]:text-wyze-purple"
              />
            </div>
          </div>
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
        <div className="px-[15px] py-5 flex flex-col gap-[15px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[15px]">
            {products.map((product, i) => {
              const isLastOdd = products.length % 2 !== 0 && i === products.length - 1
              return (
                <div
                  key={product.id}
                  className={isLastOdd ? 'sm:col-span-2 flex justify-center' : ''}
                >
                  <div className={isLastOdd ? 'w-full sm:max-w-[360px]' : 'w-full'}>
                    <ProductCard
                      product={product}
                      quantities={quantities}
                      activeVariant={activeVariants[product.id] ?? product.variants?.[0]?.id}
                      onIncrement={increment}
                      onDecrement={decrement}
                      onVariantChange={setActiveVariant}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {!isLast && nextTitle && (
            <div className="flex justify-center">
              <button
                onClick={() => useStore.getState().setOpenStep(String(stepNumber))}
                className="border border-wyze-purple text-wyze-purple font-semibold text-[18px] leading-6 rounded-[7px] h-[39px] px-6 cursor-pointer hover:bg-[rgba(78,47,210,0.05)] transition-colors"
              >
                Next: {nextTitle}
              </button>
            </div>
          )}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  )
}
