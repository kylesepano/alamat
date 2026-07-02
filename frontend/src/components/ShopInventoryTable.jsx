export function ShopInventoryTable({ inventory = [] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#fff5d6]">Inventory</h2>
      <div className="overflow-auto rounded border border-[#5f4528]">
        <table className="w-full min-w-[640px] bg-[#160f09] text-sm">
          <thead className="text-left text-[#d6a85c]">
            <tr><th className="p-3">Type</th><th className="p-3">Reference</th><th className="p-3">Qty</th><th className="p-3">Price</th><th className="p-3">Restock</th></tr>
          </thead>
          <tbody className="text-[#d8c7a3]">
            {inventory.map((row) => <tr key={row.shop_inventory_id} className="border-t border-[#5f4528]"><td className="p-3">{row.inventory_type}</td><td className="p-3">{row.item_id ?? row.equipment_id ?? row.skill_id}</td><td className="p-3">{row.quantity}</td><td className="p-3">{row.base_price}</td><td className="p-3">{row.restock_interval}</td></tr>)}
          </tbody>
        </table>
      </div>
    </section>
  )
}
