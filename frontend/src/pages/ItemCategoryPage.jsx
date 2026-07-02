import { useParams } from 'react-router-dom'
import { ItemCodexPage } from './ItemCodexPage'

export function ItemCategoryPage() {
  const { category } = useParams()
  return <ItemCodexPage fixedFilters={{ category }} title="Item Category" description={`Filtered item category: ${category}`} />
}
