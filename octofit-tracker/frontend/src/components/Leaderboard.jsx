import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  return (
    <CollectionPage
      columns={[
        { accessor: 'user.name', label: 'Athlete' },
        { accessor: 'user.team.name', label: 'Team' },
        { accessor: 'points', label: 'Points' },
        { accessor: 'period', label: 'Period' },
      ]}
      endpoint={endpoint}
      title="Leaderboard"
    />
  )
}

export default Leaderboard
