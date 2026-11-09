import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  return (
    <CollectionPage
      columns={[
        { accessor: 'name', label: 'Team' },
        { accessor: 'description', label: 'About' },
        { accessor: 'members', label: 'Members' },
      ]}
      endpoint={endpoint}
      title="Teams"
    />
  )
}

export default Teams
