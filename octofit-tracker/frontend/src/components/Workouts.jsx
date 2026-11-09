import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  return (
    <CollectionPage
      columns={[
        { accessor: 'name', label: 'Workout' },
        { accessor: 'description', label: 'About' },
        { accessor: 'activityType', label: 'Type' },
        { accessor: 'difficulty', label: 'Difficulty' },
        { accessor: 'durationMinutes', label: 'Duration (min)' },
      ]}
      endpoint={endpoint}
      title="Workouts"
    />
  )
}

export default Workouts
