const http = require('http')

http.get('http://localhost:5000/api/resources', (res) => {
  let data = ''
  res.on('data', chunk => data += chunk)
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data)
      console.log('=== STATUS:', res.statusCode)
      console.log('=== KEYS:', Object.keys(parsed))
      console.log('=== title:', parsed.title)
      console.log('=== sections count:', parsed.sections ? parsed.sections.length : 'NO SECTIONS FIELD')
      if (parsed.sections && parsed.sections.length > 0) {
        parsed.sections.forEach((s, i) => {
          console.log(`  section[${i}]: title="${s.title}", cards=${JSON.stringify(s.cards?.length)}, items=${JSON.stringify(s.items?.length)}, keys=${Object.keys(s).join(',')}`)
        })
      } else {
        console.log('=== RAW:', JSON.stringify(parsed, null, 2))
      }
    } catch (e) {
      console.log('RAW RESPONSE:', data)
    }
  })
}).on('error', e => {
  console.log('CONNECTION ERROR:', e.message)
  console.log('(Is the backend running on port 5000?)')
})
