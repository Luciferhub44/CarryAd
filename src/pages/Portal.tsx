import { useState } from 'react'
import type { ReactNode } from 'react'
import Header from '../components/Header'

type PostStatus = 'pending' | 'approved' | 'changes'

type Post = {
  id: string
  platform: string
  date: string
  gradient: string
  stroke: string
  icon: ReactNode
  caption: string
  status: PostStatus
}

const initialPosts: Post[] = [
  {
    id: 'p1',
    platform: 'Instagram Reel',
    date: 'Aug 4',
    gradient: 'linear-gradient(135deg,#B5301F,#D96A4A)',
    stroke: '#F1EAD9',
    icon: <path d="M14 8v14a6 6 0 0012 0V8M20 8v14M14 8v6M8 22v18M8 22c0-4 3-6 6-6" />,
    caption: '"Pour-over, slowed down." Interior atmosphere reel with the new espresso window.',
    status: 'pending',
  },
  {
    id: 'p2',
    platform: 'TikTok',
    date: 'Aug 6',
    gradient: 'linear-gradient(135deg,#C9A22E,#E5C967)',
    stroke: '#5A403C',
    icon: (
      <>
        <path d="M8 20h32l-3 18H11L8 20z" />
        <path d="M14 20a10 10 0 0120 0" />
      </>
    ),
    caption: 'Staff spotlight: how the house cold brew gets made, start to finish.',
    status: 'pending',
  },
  {
    id: 'p3',
    platform: 'Google Business',
    date: 'Aug 9',
    gradient: 'linear-gradient(135deg,#9CBCA4,#DA8A24)',
    stroke: '#6E4530',
    icon: (
      <>
        <circle cx="24" cy="16" r="7" />
        <path d="M10 40c0-8 6-13 14-13s14 5 14 13" />
      </>
    ),
    caption: "New seasonal menu post with photos from last week's shoot.",
    status: 'approved',
  },
]

const statusLabel: Record<PostStatus, string> = {
  pending: 'Pending',
  approved: 'Approved',
  changes: 'Changes requested',
}

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'calendar', label: 'Content calendar' },
  { id: 'vault', label: 'Asset vault' },
  { id: 'billing', label: 'Milestones & billing' },
]

export default function Portal() {
  const [posts, setPosts] = useState(initialPosts)
  const [activeSection, setActiveSection] = useState('overview')

  const setStatus = (id: string, status: PostStatus) =>
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)))

  const pendingCount = posts.filter((p) => p.status === 'pending').length

  return (
    <>
      <Header variant="app" label="Client portal" />

      <div className="dash-layout">
        <aside className="dash-side">
          {navSections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={activeSection === s.id ? 'active' : ''}
              onClick={() => setActiveSection(s.id)}
            >
              {s.label}
            </a>
          ))}
        </aside>

        <main className="dash-main">
          <div id="overview" className="page-hero">
            <p className="eyebrow">Meridian Coffee Co.</p>
            <h1>Welcome back. Here&rsquo;s how the last 30 days carried.</h1>
            <p>A snapshot of what&rsquo;s live, what&rsquo;s waiting on your approval, and what&rsquo;s due next on the build.</p>
          </div>

          <div className="stat-row">
            <div className="stat-card">
              <p className="eyebrow">Google Maps views</p>
              <b>8,420</b>
              <span className="delta">+22% vs last month</span>
            </div>
            <div className="stat-card">
              <p className="eyebrow">Website leads</p>
              <b>146</b>
              <span className="delta">+11% vs last month</span>
            </div>
            <div className="stat-card">
              <p className="eyebrow">Menu QR scans</p>
              <b>2,910</b>
              <span className="delta">+34% vs last month</span>
            </div>
            <div className="stat-card">
              <p className="eyebrow">Social engagement</p>
              <b>5,178</b>
              <span className="delta">+9% vs last month</span>
            </div>
          </div>

          <section id="calendar" className="panel">
            <div className="panel-head">
              <h2>Content calendar</h2>
              <p className="muted" style={{ fontSize: 13 }}>
                {pendingCount} post{pendingCount === 1 ? '' : 's'} waiting on your review
              </p>
            </div>
            <div className="post-grid">
              {posts.map((post) => (
                <div className="post-card" key={post.id}>
                  <div className="post-art" style={{ background: post.gradient }}>
                    <svg viewBox="0 0 48 48" fill="none" stroke={post.stroke} strokeWidth="2.5" strokeLinecap="round">
                      {post.icon}
                    </svg>
                  </div>
                  <div className="post-body">
                    <div className="post-meta">
                      <span className="post-platform">{post.platform}</span>
                      <span className="post-date">{post.date}</span>
                    </div>
                    <p className="post-caption">{post.caption}</p>
                    <div className="post-actions">
                      <span className={`status-pill ${post.status}`}>{statusLabel[post.status]}</span>
                      <button
                        className="stamp-btn small"
                        disabled={post.status !== 'pending'}
                        onClick={() => setStatus(post.id, 'approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="stamp-btn small ghost"
                        disabled={post.status !== 'pending'}
                        onClick={() => setStatus(post.id, 'changes')}
                      >
                        Request changes
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="vault" className="panel">
            <div className="panel-head">
              <h2>Asset vault</h2>
              <p className="muted" style={{ fontSize: 13 }}>
                High-res files from your last two shoots
              </p>
            </div>
            <div className="vault-list">
              {[
                { name: 'July photoshoot, full resolution', meta: '142 files · 1.8 GB · uploaded Jul 29' },
                { name: 'Logo suite & brand guidelines', meta: '1 file · 24 MB · uploaded Jun 2' },
                { name: 'Menu redesign, print-ready files', meta: '6 files · 340 MB · uploaded May 14' },
              ].map((file) => (
                <div className="vault-row" key={file.name}>
                  <div className="vault-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="M21 15l-5-5-9 9" />
                    </svg>
                  </div>
                  <div>
                    <p className="vault-name">{file.name}</p>
                    <p className="vault-meta">{file.meta}</p>
                  </div>
                  <button className="stamp-btn small ghost">Download</button>
                </div>
              ))}
            </div>
          </section>

          <section id="billing" className="panel">
            <div className="panel-head">
              <h2>Milestones &amp; billing</h2>
              <p className="muted" style={{ fontSize: 13 }}>
                Next invoice: $865 on Aug 1
              </p>
            </div>
            {[
              { name: 'Website rebuild', note: 'Design review', pct: 70 },
              { name: 'Menu photography', note: 'Delivered', pct: 100 },
              { name: 'Google Business optimization', note: 'In progress', pct: 45 },
            ].map((m) => (
              <div className="milestone" key={m.name}>
                <div className="milestone-top">
                  <b>{m.name}</b>
                  <span className="muted">{m.note}</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${m.pct}%` }} />
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </>
  )
}
