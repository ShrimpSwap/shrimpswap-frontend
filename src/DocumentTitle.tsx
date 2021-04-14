import useTitle from 'hooks/useTitle'
import { usePriceShrimpBusd } from 'state/hooks'

interface DocumentTitleProps {
  title?: string
}

const DocumentTitle: React.FC<DocumentTitleProps> = ({ title }) => {
  const shrimpPriceUsd = usePriceShrimpBusd()

  useTitle(`$${shrimpPriceUsd.toFixed(3)} - ${title}`)

  return null
}

export default DocumentTitle
