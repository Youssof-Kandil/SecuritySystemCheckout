import * as Accordion from '@radix-ui/react-accordion'
import AccordionStep from './components/accordion/AccordionStep'
import ReviewPanel from './components/review/ReviewPanel'
import useStore from './store/useStore'

import cameras from './data/cameras.json'
import plans from './data/plans.json'
import sensors from './data/sensors.json'
import protection from './data/protection.json'

import CameraIcon from './assets/camera_stage.svg?react'
import PlanIcon from './assets/plan_stage.svg?react'
import SensorIcon from './assets/sensor_stage.svg?react'
import ProtectionIcon from './assets/protection_stage.svg?react'

const steps = [
  { title: 'Choose your cameras',      icon: CameraIcon,     products: cameras,    nextTitle: 'Choose your plan' },
  { title: 'Choose your plan',         icon: PlanIcon,       products: plans,      nextTitle: 'Choose your sensors' },
  { title: 'Choose your sensors',      icon: SensorIcon,     products: sensors,    nextTitle: 'Add extra protection' },
  { title: 'Add extra protection',     icon: ProtectionIcon, products: protection, nextTitle: null },
]

export default function App() {
  const { openStep, setOpenStep } = useStore()

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-0 lg:mx-16 xl:mx-32 ">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-0 lg:gap-6 items-start pt-8 xl:pb-8">
          <div>
          <h1 className="font-bold text-[32px] text-gray-dark leading-none mb-6 text-center xl:text-left">
            Let's get started!
          </h1>
            <Accordion.Root
              type="single"
              collapsible
              value={openStep}
              onValueChange={(val) => setOpenStep(val ?? '')}
              className="flex flex-col gap-0 lg:gap-4"
            >
              {steps.map((step, i) => (
                <AccordionStep
                  key={i}
                  stepNumber={i + 1}
                  title={step.title}
                  icon={step.icon}
                  products={step.products}
                  nextTitle={step.nextTitle}
                  isLast={i === steps.length - 1}
                />
              ))}
            </Accordion.Root>
          </div>

          <div>
            <ReviewPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
