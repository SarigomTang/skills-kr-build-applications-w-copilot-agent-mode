import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  return (
    <CollectionPage
      columns={[
        { accessor: 'name', label: 'Name' },
        { accessor: 'username', label: 'Username' },
        { accessor: 'email', label: 'Email' },
        { accessor: 'team.name', label: 'Team' },
      ]}
      endpoint={endpoint}
      title="Users"
    />
  )
}

export default Users
