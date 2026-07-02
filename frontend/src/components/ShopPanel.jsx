export function ShopPanel({ shop }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Shop</h2>
      {shop ? (
        <div className="rounded border border-[#5f4528] bg-[#160f09] p-4">
          <p className="font-semibold text-[#fff5d6]">{shop.name}</p>
          <p className="text-sm text-[#d8c7a3]">{shop.shop_type} · {shop.currency_type}</p>
          <pre className="mt-3 overflow-auto rounded bg-[#110b07] p-3 text-xs text-[#b8ddff]">{JSON.stringify(shop.inventory_rule_payload ?? {}, null, 2)}</pre>
        </div>
      ) : <p className="text-[#d8c7a3]">No shop assigned.</p>}
    </section>
  )
}
