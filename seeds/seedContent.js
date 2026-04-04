require('dotenv').config()
const { db } = require('../config')

const now = new Date().toISOString()

const seedContent = async () => {
  try {
    console.log('Seeding content data...\n')

    // --- Home Page ---
    console.log('Seeding Home Page...')
    await db.collection('homeContent').doc('main').set({
      heroTitle: 'Acts Fellowship International',
      heroDescription: 'Training church leaders to build and strengthen healthy churches across nations.',
      heroImages: [],
      title: 'Welcome to Acts Fellowship International',
      description: 'Founded in 2013, Acts Fellowship International is a pastoral training program dedicated to equipping church leaders who do not have access to formal theological education. Using the book of Acts model, we select and intensively train leaders across West and East Africa.',
      createdAt: now,
      updatedAt: now
    })
    console.log('  Home Page seeded.')

    // --- About Page ---
    console.log('Seeding About Page...')
    await db.collection('aboutContent').doc('main').set({
      title: 'About Acts Fellowship International',
      description: 'Acts Fellowship International is a pastoral training program founded in 2013 with a leadership conference in Liberia.',
      sections: [
        {
          key: 'about',
          title: 'About',
          description: 'This is a vision that started in 2013 with a leadership conference in Liberia. The desire was to reach out to leaders who do not have the opportunity of attending a formal pastoral or theological School but are teaching and preaching the word of God especially in the most challenged parts of our region. The Lord connected me with two very humble experienced teachers of the word of God; Pastor Bob and Dr. Dan who decided to partner with me and my ministry in accomplishing the vision of training church leaders to build and strengthen healthy churches. We started in West Africa with Liberia being the first country to benefit from this yearly training. It is the book of Acts model where 12 church leaders are selected in every nation, then trained intensively within a four year period in different leadership and church growth principles. These will in turn train other leaders in their community and the nation at large. We have conducted training in Liberia, Sierra Leone, Guinea and now in East Africa, we have trained leaders from Uganda, Tanzania, Kenya, and Rwanda by the grace of God. Our 3 definitive approach in every nation are; Training, Prayer fellowship, and Rotational house fellowship among leaders. We are striving to accomplish the prayer of Jesus in John 17:11 "…that they may be one as we are one"',
          items: [
            'Training',
            'Prayer fellowship',
            'Rotational house fellowship among leaders'
          ],
          images: []
        },
        {
          key: 'vision',
          title: 'Vision',
          description: 'The vision is to reach out to leaders without formal pastoral or theological training, focusing on those teaching and preaching the word of God in challenged parts of the region.',
          items: [],
          images: []
        },
        {
          key: 'partnerships',
          title: 'Partnerships',
          description: 'Acts Fellowship was birthed through partnership with Pastor Bob and Dr. Dan, along with Bishop Andrew Gombay, to train church leaders and strengthen healthy churches across West Africa.',
          items: [],
          images: []
        }
      ],
      createdAt: now,
      updatedAt: now
    })
    console.log('  About Page seeded.')

    // --- Fellowship Pages (dropdown pages) ---
    console.log('Seeding Fellowship Pages...')
    const fellowshipPagesRef = db.collection('fellowshipPages')

    const fellowshipPages = [
      {
        slug: 'liberia',
        title: 'Acts Fellowship Liberia',
        description: 'Liberia was the first country to benefit from the yearly training program. The leadership conference began here in 2013, laying the foundation for the Acts Fellowship model across the region.',
        images: [],
        menuLabel: 'Acts Fellowship Liberia',
        isPublished: true,
        sortOrder: 1,
        createdAt: now,
        updatedAt: now
      },
      {
        slug: 'sierra-leone',
        title: 'Acts Fellowship Sierra Leone',
        description: 'The training program expanded to Sierra Leone, where church leaders have been selected and trained intensively in leadership and church growth principles.',
        images: [],
        menuLabel: 'Acts Fellowship Sierra Leone',
        isPublished: true,
        sortOrder: 2,
        createdAt: now,
        updatedAt: now
      },
      {
        slug: 'guinea',
        title: 'Acts Fellowship Guinea',
        description: 'Guinea is one of the West African nations where Acts Fellowship has conducted training for church leaders, empowering them to strengthen their communities.',
        images: [],
        menuLabel: 'Acts Fellowship Guinea',
        isPublished: true,
        sortOrder: 3,
        createdAt: now,
        updatedAt: now
      },
      {
        slug: 'east-africa',
        title: 'Acts Fellowship East Africa',
        description: 'In East Africa, Acts Fellowship has trained leaders from Uganda, Tanzania, Kenya, and Rwanda, extending the vision of building healthy churches to the eastern part of the continent.',
        images: [],
        menuLabel: 'Acts Fellowship East Africa',
        isPublished: true,
        sortOrder: 4,
        createdAt: now,
        updatedAt: now
      }
    ]

    for (const page of fellowshipPages) {
      await fellowshipPagesRef.add(page)
    }
    console.log(`  ${fellowshipPages.length} fellowship pages seeded.`)

    // --- Contact Page ---
    console.log('Seeding Contact Page...')
    await db.collection('contactPage').doc('main').set({
      title: 'Contact Us',
      description: 'Get in touch with Acts Fellowship International. We would love to hear from you.',
      address: '',
      email: '',
      phone: '',
      socialLinks: [],
      createdAt: now,
      updatedAt: now
    })
    console.log('  Contact Page seeded.')

    console.log('\n--- All content seeded successfully! ---')
    console.log('\nYou can now start the backend and frontend to test the website.')
    console.log('Admin login: username: admin, password: admin123')
    process.exit(0)
  } catch (e) {
    console.error('Seed error:', e)
    process.exit(1)
  }
}

seedContent()
