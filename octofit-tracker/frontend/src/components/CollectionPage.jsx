import { useEffect, useState } from 'react'

function getRecords(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  for (const key of ['results', 'data', 'items', 'records']) {
    if (Array.isArray(payload?.[key])) {
      return payload[key]
    }
  }

  throw new Error('The API response did not contain a list of records.')
}

function getValue(record, accessor) {
  return accessor.split('.').reduce((value, key) => value?.[key], record)
}

function formatValue(value, format) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }

  if (format === 'date') {
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString()
  }

  if (Array.isArray(value)) {
    return value.map((item) => item?.name ?? item?.username ?? String(item)).join(', ')
  }

  if (typeof value === 'object') {
    return value.name ?? value.username ?? value.title ?? value._id ?? '—'
  }

  return String(value)
}

function CollectionPage({ title, endpoint, columns }) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadRecords() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(endpoint, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}.`)
        }

        const payload = await response.json()
        setRecords(getRecords(payload))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load records.')
          setRecords([])
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadRecords()
    return () => controller.abort()
  }, [endpoint, reloadKey])

  return (
    <section aria-labelledby="collection-title">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h2 className="h4 mb-0" id="collection-title">{title}</h2>
        <button
          className="btn btn-sm btn-outline-secondary"
          disabled={loading}
          onClick={() => setReloadKey((key) => key + 1)}
          type="button"
        >
          Refresh
        </button>
      </div>

      {loading && <p role="status">Loading {title.toLowerCase()}…</p>}
      {error && <p className="alert alert-danger" role="alert">{error}</p>}
      {!loading && !error && records.length === 0 && (
        <p className="alert alert-info">No {title.toLowerCase()} found.</p>
      )}
      {!loading && !error && records.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle bg-white">
            <thead className="table-light">
              <tr>
                {columns.map(({ label }) => <th key={label} scope="col">{label}</th>)}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id ?? record.id ?? index}>
                  {columns.map(({ accessor, label, format }) => (
                    <td key={label}>{formatValue(getValue(record, accessor), format)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default CollectionPage
