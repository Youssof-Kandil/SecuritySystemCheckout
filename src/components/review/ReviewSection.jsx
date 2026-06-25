export default function ReviewSection({ title, children }) {
  return (
    <div className="border-t border-gray-c-400 pt-[15px] flex flex-col gap-3">
      <p className="font-medium text-[12px] text-gray-c-500 uppercase tracking-[0.36px] leading-4">
        {title}
      </p>
      <div className="flex flex-col gap-3">
        {children}
      </div>
    </div>
  )
}
