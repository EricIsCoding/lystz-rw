import StoreCell from 'src/components/Store/StoreCell'

type StorePageProps = {
  id: number
}

const StorePage = ({ id }: StorePageProps) => {
  return <StoreCell id={id} />
}

export default StorePage
