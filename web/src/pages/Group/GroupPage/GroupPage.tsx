import GroupCell from 'src/components/Group/GroupCell'

type GroupPageProps = {
  id: number
}

const GroupPage = ({ id }: GroupPageProps) => {
  return <GroupCell id={id} />
}

export default GroupPage
