/**
 * Seed Script: Transfer Resources from VFM CMS (MongoDB) → Acts Fellowship (Firebase)
 *
 * Source:  GET http://localhost:5001/api/resources  (vfmcms MongoDB)
 * Target:  Firestore collection "resourcesContent", doc "main"  (actsfellowship Firebase)
 *
 * Run from actsfellowship/backend:
 *   node seeds/seedResourcesFromVFM.js
 *
 * Flags:
 *   --force   Overwrite existing resourcesContent/main document
 */

require('dotenv').config()
const https = require('https')
const http = require('http')
const { db } = require('../config')

const VFM_RESOURCES_URL = 'http://localhost:5001/api/resources'
const FORCE = process.argv.includes('--force')

// ─── Section label map (vfmcms field → human-readable title) ──────────────────
const SECTION_MAP = [
  { field: 'teachingVideos',   key: 'teaching-videos',    title: 'Teaching Videos' },
  { field: 'otSessions',       key: 'ot-sessions',        title: 'Old Testament Sessions' },
  { field: 'ntSessions',       key: 'nt-sessions',        title: 'New Testament Sessions' },
  { field: 'dbsSessions',      key: 'dbs-sessions',       title: 'DBS Sessions' },
  { field: 'nurturingSessions',key: 'nurturing-sessions', title: 'Nurturing Sessions' },
  { field: 'audioLessons',     key: 'audio-lessons',      title: 'Audio Lessons' },
]

// ─── HTTP helper ──────────────────────────────────────────────────────────────
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http
    client.get(url, (res) => {
      let raw = ''
      res.on('data', (chunk) => { raw += chunk })
      res.on('end', () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error(`HTTP ${res.statusCode} fetching ${url}: ${raw}`))
        }
        try {
          resolve(JSON.parse(raw))
        } catch (e) {
          reject(new Error(`Failed to parse JSON from ${url}: ${e.message}`))
        }
      })
    }).on('error', reject)
  })
}

// ─── Transform vfmcms media item → actsfellowship media item ─────────────────
function transformMediaItem(item) {
  return {
    title: item.title || item.filename || '',
    url: item.url || '',
    data: item.data || '',
    filename: item.filename || '',
    contentType: item.contentType || '',
    uploadedAt: item.uploadedAt || null,
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function seed() {
  console.log('Fetching resources from VFM CMS (localhost:5001)...')

  let vfmData
  try {
    vfmData = await fetchJSON(VFM_RESOURCES_URL)
  } catch (err) {
    console.error(`\n❌ Could not reach vfmcms backend: ${err.message}`)
    console.error('   Make sure the vfmcms backend is running on port 5001.')
    process.exit(1)
  }

  console.log(`✓ Fetched vfmcms resources data (header title: "${(vfmData.header || {}).title || 'N/A'}")`)

  // ── Build sections array ──
  const sections = SECTION_MAP
    .map(({ field, key, title }) => {
      const items = Array.isArray(vfmData[field]) ? vfmData[field] : []
      return {
        key,
        title,
        items: items.map(transformMediaItem),
      }
    })
    .filter((section) => section.items.length > 0)  // omit empty sections

  const totalItems = sections.reduce((sum, s) => sum + s.items.length, 0)
  console.log(`✓ Mapped ${sections.length} sections, ${totalItems} total media items`)

  if (sections.length === 0) {
    console.warn('\n⚠  No media items found in vfmcms resources. Nothing to seed.')
    process.exit(0)
  }

  // ── Build Firestore document ──
  const now = new Date().toISOString()
  const headerTitle =
    vfmData.header && vfmData.header.title ? vfmData.header.title : 'Resources'

  const resourcesDoc = {
    title: headerTitle,
    description: '',
    sections,
    updatedAt: now,
  }

  // ── Write to Firestore ──
  const ref = db.collection('resourcesContent').doc('main')
  const existing = await ref.get()

  if (existing.exists && !FORCE) {
    console.log('\n✗ resourcesContent/main already exists.')
    console.log('  Run with --force to overwrite:')
    console.log('  node seeds/seedResourcesFromVFM.js --force')
    process.exit(0)
  }

  if (existing.exists && FORCE) {
    await ref.update({ ...resourcesDoc })
    console.log('\n✅ resourcesContent/main updated (--force applied).')
  } else {
    await ref.set({ ...resourcesDoc, createdAt: now })
    console.log('\n✅ resourcesContent/main created successfully.')
  }

  console.log('\nSections written:')
  sections.forEach((s) => {
    console.log(`  • ${s.title} — ${s.items.length} item(s)`)
  })

  process.exit(0)
}

seed().catch((err) => {
  console.error('\n❌ Unexpected error:', err)
  process.exit(1)
})
