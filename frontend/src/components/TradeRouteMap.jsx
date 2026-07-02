export function TradeRouteMap({ routes = [] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {routes.map((route) => (
        <div key={route.route_id} className="rounded border border-[#5f4528] bg-[#1a120b] p-4">
          <p className="text-xs uppercase tracking-wide text-[#d6a85c]">{route.route_id}</p>
          <h3 className="mt-1 text-lg font-semibold text-[#fff5d6]">{route.risk_level} risk</h3>
          <p className="mt-2 text-sm text-[#d8c7a3]">{route.travel_time} min</p>
        </div>
      ))}
    </div>
  )
}
