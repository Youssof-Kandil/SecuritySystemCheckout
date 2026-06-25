import useStore from "../../store/useStore";
import cameras from "../../data/cameras.json";
import plans from "../../data/plans.json";
import sensors from "../../data/sensors.json";
import protection from "../../data/protection.json";
import ReviewSection from "./ReviewSection";
import ReviewItem from "./ReviewItem";
import ReviewShipping from "./ReviewShipping";
import ReviewTotals from "./ReviewTotals";
import ReviewActions from "./ReviewActions";

const pngMap = import.meta.glob("../../assets/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});
const svgMap = import.meta.glob("../../assets/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});
function resolveImage(filename) {
  if (!filename) return "";
  const key = `../../assets/${filename}`;
  return pngMap[key] ?? svgMap[key] ?? "";
}

function CameraSection({ quantities, onIncrement, onDecrement }) {
  const items = [];
  for (const cam of cameras) {
    if (cam.variants?.length > 0) {
      for (const v of cam.variants) {
        const key = `${cam.id}__${v.id}`;
        const qty = quantities[key] ?? 0;
        if (qty > 0) {
          items.push(
            <ReviewItem
              key={key}
              name={`${cam.name} — ${v.label}`}
              image={resolveImage(v.image)}
              qty={qty}
              compareAtPrice={cam.compareAtPrice ?? null}
              price={cam.price}
              onIncrement={() => onIncrement(key)}
              onDecrement={() => onDecrement(key)}
            />,
          );
        }
      }
    } else {
      const qty = quantities[cam.id] ?? 0;
      if (qty > 0) {
        items.push(
          <ReviewItem
            key={cam.id}
            name={cam.name}
            image={resolveImage(cam.image)}
            qty={qty}
            compareAtPrice={cam.compareAtPrice ?? null}
            price={cam.price}
            onIncrement={() => onIncrement(cam.id)}
            onDecrement={() => onDecrement(cam.id)}
          />,
        );
      }
    }
  }
  if (items.length === 0) return null;
  return <ReviewSection title="Cameras">{items}</ReviewSection>;
}

export default function ReviewPanel() {
  const { quantities, increment, decrement } = useStore();

  const allItems = [
    ...cameras.flatMap((c) =>
      c.variants?.length > 0
        ? c.variants.map((v) => ({
            key: `${c.id}__${v.id}`,
            price: c.price,
            compareAtPrice: c.compareAtPrice,
          }))
        : [{ key: c.id, price: c.price, compareAtPrice: c.compareAtPrice }],
    ),
    ...sensors.map((s) => ({
      key: s.id,
      price: s.price,
      compareAtPrice: s.compareAtPrice,
    })),
    ...protection.map((p) => ({
      key: p.id,
      price: p.price,
      compareAtPrice: p.compareAtPrice,
    })),
    ...plans.map((p) => ({
      key: p.id,
      price: p.price,
      compareAtPrice: p.compareAtPrice,
    })),
  ];

  let activeTotal = 0;
  let compareAtTotal = 0;
  for (const item of allItems) {
    const qty = quantities[item.key] ?? 0;
    activeTotal += item.price * qty;
    compareAtTotal += (item.compareAtPrice ?? item.price) * qty;
  }
  const savings = compareAtTotal - activeTotal;

  const hasCameraSelected = cameras.some((c) =>
    c.variants?.length > 0
      ? c.variants.some((v) => (quantities[`${c.id}__${v.id}`] ?? 0) > 0)
      : (quantities[c.id] ?? 0) > 0,
  );

  const visibleSensors = sensors.filter((s) => (quantities[s.id] ?? 0) > 0);
  const visibleProtection = protection.filter(
    (p) => (quantities[p.id] ?? 0) > 0,
  );
  const visiblePlans = plans.filter((p) => (quantities[p.id] ?? 0) > 0);

  return (
    <div className="bg-blue-bg py-4 rounded-[10px]">
      <p className="font-medium text-[12px] text-gray-mid uppercase tracking-[1.6px] px-4">
        REVIEW
      </p>
      <div className="flex flex-col gap-2.5 p-5">
        <div>
          <h2 className="font-semibold text-[22px] text-gray-dark tracking-[0.6px] leading-none">
            Your security system
          </h2>
          <p className="font-medium text-[14px] text-[rgba(31,31,31,0.75)] leading-[1.3] mt-1">
            Review and adjust your setup before checking out.
          </p>
        </div>

        <CameraSection
          quantities={quantities}
          onIncrement={increment}
          onDecrement={decrement}
        />

        {visibleSensors.length > 0 && (
          <ReviewSection title="Sensors">
            {visibleSensors.map((item) => (
              <ReviewItem
                key={item.id}
                name={item.name}
                image={resolveImage(item.image)}
                qty={quantities[item.id] ?? 0}
                compareAtPrice={item.compareAtPrice ?? null}
                price={item.price}
                priceLabel={item.priceLabel}
                onIncrement={() => increment(item.id)}
                onDecrement={() => decrement(item.id)}
                disabled={item.fixed}
              />
            ))}
          </ReviewSection>
        )}

        {visibleProtection.length > 0 && (
          <ReviewSection title="Accessories">
            {visibleProtection.map((item) => (
              <ReviewItem
                key={item.id}
                name={item.name}
                image={resolveImage(item.image)}
                qty={quantities[item.id] ?? 0}
                compareAtPrice={item.compareAtPrice ?? null}
                price={item.price}
                onIncrement={() => increment(item.id)}
                onDecrement={() => decrement(item.id)}
                disabled={item.fixed}
              />
            ))}
          </ReviewSection>
        )}

        {visiblePlans.length > 0 && (
          <ReviewSection title="Plan">
            {visiblePlans.map((item) => (
              <ReviewItem
                key={item.id}
                name={item.name}
                image={resolveImage(item.image)}
                qty={quantities[item.id] ?? 0}
                compareAtPrice={item.compareAtPrice ?? null}
                price={item.price}
                priceLabel={item.priceLabel}
                period={item.period}
                onIncrement={() => increment(item.id)}
                onDecrement={() => decrement(item.id)}
                isPlan
              />
            ))}
          </ReviewSection>
        )}

        <ReviewShipping />

        <ReviewTotals
          compareAtTotal={compareAtTotal}
          activeTotal={activeTotal}
          savings={savings}
        />

        <ReviewActions hasCameraSelected={hasCameraSelected} />
      </div>
    </div>
  );
}
