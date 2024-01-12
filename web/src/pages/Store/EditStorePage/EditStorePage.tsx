import EditStoreCell from 'src/components/Store/EditStoreCell'

type StorePageProps = {
  id: number
}

const EditStorePage = ({ id }: StorePageProps) => {
  return <EditStoreCell id={id} />
}

export default EditStorePage
