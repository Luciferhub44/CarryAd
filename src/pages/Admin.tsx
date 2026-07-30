import { useRef, useState } from 'react'
import type { DragEvent } from 'react'
import Header from '../components/Header'

type Industry = 'Cafe' | 'Restaurant' | 'Retail' | 'Services'
type ClientStatus = 'active' | 'paused' | 'lead'

type Client = {
  name: string
  industry: Industry
  status: ClientStatus
  services: string
  since: string
}

const clients: Client[] = [
  { name: 'Meridian Coffee Co.', industry: 'Cafe', status: 'active', services: 'Branding, Photo, Social', since: 'Jun 2025' },
  { name: 'Sable & Thread', industry: 'Retail', status: 'active', services: 'Web, Social', since: 'Mar 2025' },
  { name: 'Birchwood Dental', industry: 'Services', status: 'active', services: 'SEO, Social', since: 'Jan 2025' },
  { name: 'Olive & Anchor', industry: 'Restaurant', status: 'paused', services: 'Web, Photo', since: 'Nov 2024' },
  { name: 'Northline Bicycles', industry: 'Retail', status: 'active', services: 'Branding, Photo, Social', since: 'Sep 2024' },
  { name: 'Hearth Home Studio', industry: 'Services', status: 'lead', services: 'Web (quoted)', since: 'Jul 2025' },
]

const statusLabel: Record<ClientStatus, string> = {
  active: 'Active',
  paused: 'Paused',
  lead: 'Lead',
}

const templates = [
  {
    name: 'Seasonal menu launch',
    body: 'Reel + carousel + Google Business post, timed for a new-season menu drop.',
  },
  {
    name: 'Weekend flash promo',
    body: 'Two-day paid geo-fence push with a story sequence and a QR table tent.',
  },
  {
    name: 'New location opening',
    body: 'Countdown series, press-style photo set, and a Google Business listing setup.',
  },
]

export default function Admin() {
  const [filter, setFilter] = useState<'all' | Industry>('all')
  const [queue, setQueue] = useState<File[]>([])
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addFiles = (files: FileList | null) => {
    if (!files) return
    setQueue((prev) => [...prev, ...Array.from(files)])
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    addFiles(e.dataTransfer.files)
  }

  const industries: Industry[] = ['Cafe', 'Restaurant', 'Retail', 'Services']

  return (
    <>
      <Header variant="app" label="Agency hub" />

      <div className="dash-layout">
        <aside className="dash-side">
          <a href="#clients" className="active">
            Clients
          </a>
          <a href="#pipeline">Content pipeline</a>
          <a href="#templates">Template library</a>
        </aside>

        <main className="dash-main">
          <div className="page-hero">
            <p className="eyebrow">Operations</p>
            <h1>Every client, every shoot, every draft, one board.</h1>
            <p>A working view of who&rsquo;s active, what&rsquo;s queued for review, and which campaign patterns are ready to reuse.</p>
          </div>

          <div className="stat-row">
            <div className="stat-card">
              <p className="eyebrow">Active clients</p>
              <b>34</b>
              <span className="delta">+3 this month</span>
            </div>
            <div className="stat-card">
              <p className="eyebrow">Open leads</p>
              <b>9</b>
              <span className="delta">4 awaiting reply</span>
            </div>
            <div className="stat-card">
              <p className="eyebrow">Posts in review</p>
              <b>17</b>
              <span className="delta">6 past due</span>
            </div>
            <div className="stat-card">
              <p className="eyebrow">MRR</p>
              <b>$29,400</b>
              <span className="delta">+8% vs last month</span>
            </div>
          </div>

          <section id="clients" className="panel">
            <div className="panel-head">
              <h2>Clients</h2>
              <div className="crm-filters">
                <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
                  All
                </button>
                {industries.map((i) => (
                  <button
                    key={i}
                    className={`filter-btn ${filter === i ? 'active' : ''}`}
                    onClick={() => setFilter(i)}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
            <table className="crm-table">
              <thead>
                <tr>
                  <th>Business</th>
                  <th>Industry</th>
                  <th>Status</th>
                  <th>Services</th>
                  <th>Since</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.name} className={filter !== 'all' && filter !== c.industry ? 'hide' : ''}>
                    <td className="client-name">{c.name}</td>
                    <td className="client-industry">{c.industry}</td>
                    <td>
                      <span className={`status-badge ${c.status}`}>{statusLabel[c.status]}</span>
                    </td>
                    <td>{c.services}</td>
                    <td>{c.since}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section id="pipeline" className="panel">
            <div className="panel-head">
              <h2>Content pipeline</h2>
              <p className="muted" style={{ fontSize: 13 }}>
                Queue raw files for a client review
              </p>
            </div>
            <div
              className={`dropzone ${dragging ? 'drag' : ''}`}
              onDragEnter={(e) => {
                e.preventDefault()
                setDragging(true)
              }}
              onDragOver={(e) => e.preventDefault()}
              onDragLeave={(e) => {
                e.preventDefault()
                setDragging(false)
              }}
              onDrop={onDrop}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 16V4M12 4l-4 4M12 4l4 4" />
                <path d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3" />
              </svg>
              <p>Drag files here, or</p>
              <label className="stamp-btn small ghost" style={{ display: 'inline-block', marginTop: 10, cursor: 'pointer' }}>
                Choose files
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  style={{ display: 'none' }}
                  onChange={(e) => addFiles(e.target.files)}
                />
              </label>
            </div>
            <div className="queue-list">
              {queue.map((file, i) => (
                <div className="queue-row" key={`${file.name}-${i}`}>
                  <span className="name">{file.name}</span>
                  <span className="muted" style={{ fontSize: 12 }}>
                    {(file.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                  <button type="button" onClick={() => setQueue((prev) => prev.filter((_, idx) => idx !== i))}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section id="templates" className="panel">
            <div className="panel-head">
              <h2>Template library</h2>
            </div>
            <div className="template-grid">
              {templates.map((t) => (
                <div className="template-card" key={t.name}>
                  <h3>{t.name}</h3>
                  <p>{t.body}</p>
                  <button className="stamp-btn small ghost">Use template</button>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
