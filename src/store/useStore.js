import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const FIXED_KEYS = new Set(['wyze-sense-hub'])

const useStore = create(
  persist(
    (set, get) => ({
      openStep: '0',

      quantities: {
        'wyze-cam-v4__white': 1,
        'wyze-cam-pan-v3__white': 2,
        'wyze-sense-motion': 2,
        'wyze-sense-hub': 1,
        'wyze-microsd-256': 2,
        'cam-unlimited': 1,
      },

      activeVariants: {
        'wyze-cam-v4': 'white',
        'wyze-cam-pan-v3': 'white',
        'wyze-cam-floodlight': 'white',
        'wyze-battery-cam-pro': 'white',
      },

      setOpenStep: (step) => set({ openStep: step }),

      increment: (key) =>
        set((state) => ({
          quantities: {
            ...state.quantities,
            [key]: (state.quantities[key] ?? 0) + 1,
          },
        })),

      decrement: (key) =>
        set((state) => ({
          quantities: {
            ...state.quantities,
            [key]: Math.max(FIXED_KEYS.has(key) ? 1 : 0, (state.quantities[key] ?? 0) - 1),
          },
        })),

      setActiveVariant: (productId, variantId) =>
        set((state) => ({
          activeVariants: { ...state.activeVariants, [productId]: variantId },
        })),

      getQty: (key) => get().quantities[key] ?? 0,

      selectedCount: (products) => {
        const { quantities, activeVariants } = get()
        return products.filter((p) => {
          if (p.variants && p.variants.length > 0) {
            return p.variants.some((v) => (quantities[`${p.id}__${v.id}`] ?? 0) > 0)
          }
          return (quantities[p.id] ?? 0) > 0
        }).length
      },
    }),
    {
      name: 'wyze-security-config',
      partialize: (state) => ({
        quantities: state.quantities,
        activeVariants: state.activeVariants,
      }),
    }
  )
)

export default useStore
