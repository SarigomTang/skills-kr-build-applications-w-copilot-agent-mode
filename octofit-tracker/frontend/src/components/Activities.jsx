import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  return (
    <CollectionPage
      columns={[
        { accessor: 'user.name', label: 'User' },
        { accessor: 'type', label: 'Activity' },
        { accessor: 'durationMinutes', label: 'Duration (min)' },
        { accessor: 'distanceKm', label: 'Distance (km)' },
        { accessor: 'calories', label: 'Calories' },
        { accessor: 'completedAt', format: 'date', label: 'Completed' },
      ]}
      endpoint={endpoint}
      title="Activities"
    />
  )
}

export default Activities
