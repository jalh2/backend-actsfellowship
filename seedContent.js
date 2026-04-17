/**
 * Content Seed Script for Acts Fellowship International
 * Populates the database with initial content from actsfellowshipprofile.md
 * Run with: node seedContent.js
 */

require('dotenv').config()
const { db } = require('./config')

const now = new Date().toISOString()

const seedData = async () => {
  console.log('Starting content seeding...\n')

  // 1. About Page Content
  const aboutData = {
    title: 'About Us',
    description: `This is a vision that started in 2013 with a leadership conference in Liberia. The desire was to reach out to leaders who do not have the opportunity of attending a formal pastoral or theological School but are teaching and preaching the word of God especially in the most challenged parts of our region. The Lord connected me with two very humble experienced teachers of the word of God; Pastor Bob and Dr. Dan who decided to partner with me and my ministry in accomplishing the vision of training church leaders to build and strengthen healthy churches. We started in West Africa with Liberia being the first country to benefit from this yearly training. It is the book of Acts model where 12 church leaders are selected in every nation, then trained intensively within a four year period in different leadership and church growth principles. These will in turn train other leaders in their community and the nation at large. We have conducted training in Liberia, Sierra Leone, Guinea and now in East Africa, we have trained leaders from Uganda, Tanzania, Kenya, and Rwanda by the grace of God. Our 3 definitive approach in every nation are; Training, Prayer fellowship, and Rotational house fellowship among leaders. We are striving to accomplish the prayer of Jesus in John 17:11 "...that they may be one as we are one"`,
    sections: [
      {
        key: 'our-approach',
        title: 'Our 3-Fold Approach',
        description: 'In every nation, we focus on three key areas:',
        items: [
          'Training - Intensive leadership and church growth training',
          'Prayer Fellowship - Building unity through prayer',
          'Rotational House Fellowship - Leaders meeting in homes for fellowship'
        ],
        images: []
      },
      {
        key: 'countries-served',
        title: 'Countries We Serve',
        description: 'By the grace of God, we have conducted training in:',
        items: [
          'Liberia (West Africa)',
          'Sierra Leone (West Africa)',
          'Guinea (West Africa)',
          'Uganda (East Africa)',
          'Tanzania (East Africa)',
          'Kenya (East Africa)',
          'Rwanda (East Africa)'
        ],
        images: []
      }
    ],
    createdAt: now,
    updatedAt: now
  }

  // 2. Vision Page Content
  const visionData = {
    title: 'Our Vision',
    description: 'The vision is to reach out to leaders without formal pastoral or theological training, focusing on those teaching and preaching the word of God in challenged parts of the region.',
    sections: [
      {
        key: 'the-vision',
        title: 'The Vision',
        description: 'To reach out to leaders without formal pastoral or theological training, focusing on those teaching and preaching the word of God in challenged parts of the region. We believe every leader deserves access to quality biblical education regardless of their circumstances.'
      },
      {
        key: 'our-mission',
        title: 'Our Mission',
        description: 'Following the Acts model, we select 12 church leaders in every nation and train them intensively over a four-year period in leadership and church growth principles. These leaders then train others in their communities, creating a multiplying effect of biblical leadership.'
      },
      {
        key: 'global-impact',
        title: 'Global Impact',
        description: 'From West Africa to East Africa, we are building a network of trained pastors and church leaders who are making a difference in their communities. Our three-fold approach includes: Training, Prayer fellowship, and Rotational house fellowship among leaders.'
      }
    ],
    createdAt: now,
    updatedAt: now
  }

  // 3. Mission Page Content
  const missionData = {
    title: 'Our Mission',
    description: 'Following the Acts model, we select 12 church leaders in every nation and train them intensively over a four-year period in leadership and church growth principles.',
    sections: [
      {
        key: 'train-leaders',
        title: 'Train Leaders',
        description: 'We select 12 church leaders in every nation and provide intensive training over a four-year period in leadership and church growth principles.'
      },
      {
        key: 'multiply-effect',
        title: 'Multiply Impact',
        description: 'These trained leaders then train others in their communities, creating a multiplying effect of biblical leadership throughout their nations.'
      },
      {
        key: 'unity-goal',
        title: 'Foster Unity',
        description: 'We strive to accomplish the prayer of Jesus in John 17:11 "...that they may be one as we are one" through prayer fellowship and rotational house fellowship among leaders.'
      }
    ],
    createdAt: now,
    updatedAt: now
  }

  // 4. Impact Page Content
  const impactData = {
    title: 'Our Impact',
    description: 'Transforming church leaders across Africa',
    stats: [
      { value: '7', label: 'Countries', icon: 'globe' },
      { value: '12+', label: 'Leaders Trained per Nation', icon: 'users' },
      { value: '10,000+', label: 'Congregations Reached', icon: 'church' },
      { value: '4', label: 'Years of Training', icon: 'calendar' }
    ],
    content: `Twelve church leaders have been trained in Liberia, Sierra Leone, Guinea, Uganda, Tanzania, Kenya, and Rwanda with a total cumulative church membership of 10,000 plus congregations by the grace of God.

Each of the twelve church leaders we train in every nation represent varying sizes of congregations they lead and represent. So we instill and restore the health of the church by training their leaders because the bible states that "when a blind lead the blind, they end up into a ditch" (Mat.15:14). 

A healthy and transformed leader results to a healthy and transformed church congregation.`,
    countries: ['Liberia', 'Sierra Leone', 'Guinea', 'Uganda', 'Tanzania', 'Kenya', 'Rwanda'],
    createdAt: now,
    updatedAt: now
  }

  // 5. Partnerships Page Content
  const partnershipsData = {
    title: 'Our Partnerships',
    description: 'Acts Fellowship was birthed through partnership with Pastor Bob and Dr. Dan, along with Bishop Andrew Gombay, to train church leaders and strengthen healthy churches across West Africa and beyond.',
    partners: [
      {
        name: 'Pastor Robert Kinzel',
        title: 'Facilitator',
        description: 'A humble and experienced teacher of the word of God who partners with us in training church leaders and building healthy churches across Africa.'
      },
      {
        name: 'Dr. Dan Hopkins',
        title: 'Facilitator',
        description: 'Dedicated partner providing theological expertise and mentorship to leaders in the most challenged regions of West Africa.'
      },
      {
        name: 'Bishop Andrew Gombay',
        title: 'Coordinator',
        description: 'Key partner in the vision to train church leaders and strengthen healthy churches through collaborative ministry efforts.'
      }
    ],
    createdAt: now,
    updatedAt: now
  }

  // 6. Partner With Us Page Content
  const partnerWithUsData = {
    title: 'Partner With Us',
    description: 'Acts Fellowship was birthed through partnership, and we continue to rely on the generosity and commitment of partners like you. Together, we can equip thousands of church leaders who would otherwise have no access to biblical ministry training.',
    waysToPartner: [
      {
        title: 'Pray',
        description: 'Join us in prayer for the ministry and the leaders we train. Your prayers sustain our mission across nations.',
        iconType: 'pray'
      },
      {
        title: 'Give',
        description: 'Your financial support helps us train more church leaders who would otherwise have no access to biblical education.',
        iconType: 'give'
      },
      {
        title: 'Volunteer',
        description: 'Share your skills, time, and expertise to support our mission. From teaching to administration, every gift matters.',
        iconType: 'volunteer'
      }
    ],
    createdAt: now,
    updatedAt: now
  }

  // 7. Team Page Content
  const teamData = {
    title: 'Our Team',
    description: 'Dedicated leaders serving the mission of training church leaders across Africa.',
    members: [
      {
        name: 'Pastor Robert Kinzel',
        title: 'Facilitator',
        image: '',
        videoUrl: ''
      },
      {
        name: 'Dr. Dan Hopkins',
        title: 'Facilitator',
        image: '',
        videoUrl: ''
      },
      {
        name: 'Bishop Andrew Gombay',
        title: 'Coordinator',
        image: '',
        videoUrl: ''
      }
    ],
    advisoryBoard: 'Our advisory board is comprised of leaders from the organizations each of us are connected to, providing guidance and oversight to ensure the integrity and effectiveness of our ministry.',
    createdAt: now,
    updatedAt: now
  }

  // 8. Resources Page Content
  const resourcesData = {
    title: 'Resources',
    description: 'Tools and materials to equip church leaders for effective ministry.',
    sections: [
      {
        title: 'Training Materials',
        cards: [
          {
            title: 'Leadership Training Manual',
            description: 'Comprehensive guide for church leadership development covering biblical principles and practical skills.',
            link: '#'
          },
          {
            title: 'Church Growth Principles',
            description: 'Biblical strategies for building healthy, growing churches in any context.',
            link: '#'
          },
          {
            title: 'Pastoral Care Guide',
            description: 'Resources for shepherding congregations and providing spiritual guidance.',
            link: '#'
          }
        ]
      },
      {
        title: 'Video Resources',
        cards: [
          {
            title: 'Training Session Recordings',
            description: 'Watch past training sessions from our facilitators covering various ministry topics.',
            link: '#'
          },
          {
            title: 'Testimonial Videos',
            description: 'Stories from leaders whose lives and ministries have been transformed through our training.',
            link: '#'
          },
          {
            title: 'Conference Messages',
            description: 'Keynote addresses and teachings from our annual leadership conferences.',
            link: '#'
          }
        ]
      },
      {
        title: 'Downloads',
        cards: [
          {
            title: 'Curriculum Outlines',
            description: 'Complete training curriculum for the four-year leadership program.',
            link: '#'
          },
          {
            title: 'Study Guides',
            description: 'Companion materials for group study and self-paced learning.',
            link: '#'
          },
          {
            title: 'Forms & Documents',
            description: 'Enrollment forms, certificates, and official ministry documents.',
            link: '#'
          }
        ]
      }
    ],
    createdAt: now,
    updatedAt: now
  }

  // 9. Contact Page Content
  const contactData = {
    title: 'Contact Us',
    description: 'Get in touch with us for more information about our programs.',
    address: 'Victorious Faith Ministries Redemption Center\nOpposite Patrol Trade Gas station\nBattery Factory community\nMonrovia, Liberia',
    phone: '+231-775-024-032 OR +231-886-551-207',
    email: 'Victoriousfaithfund@gmail.com',
    createdAt: now,
    updatedAt: now
  }

  // 10. Donate Page Content
  const donateData = {
    title: 'Donate',
    description: 'Your generous donation helps us train church leaders across Africa who would otherwise have no access to biblical ministry education. Every contribution makes a lasting impact.',
    donationOptions: [
      { amount: 25, description: 'Supports training materials for one leader' },
      { amount: 50, description: 'Provides meals during training sessions' },
      { amount: 100, description: 'Funds travel for a facilitator' },
      { amount: 250, description: 'Sponsors a complete training module' },
      { amount: 500, description: 'Funds an entire training session for one nation' }
    ],
    paymentMethods: {
      bankTransfer: {
        bankName: '[To be configured]',
        accountName: 'Acts Fellowship International',
        accountNumber: '[To be configured]',
        swiftCode: ''
      },
      mobileMoney: {
        provider: '[To be configured]',
        number: '+231-XXX-XXX-XXX'
      },
      paypal: '[To be configured]'
    },
    createdAt: now,
    updatedAt: now
  }

  // 11. Home Page Content
  const homeData = {
    heroTitle: 'Equipping Church Leaders Across the Nations',
    heroDescription: 'Acts Fellowship International trains pastors and church leaders to plant, develop, and sustain healthy biblical churches — from West Africa to East Africa.',
    heroImages: [],
    missionSection: {
      title: 'Our Mission',
      description: 'The ACTS Fellowship exists to serve informal and nonformal training programs by providing a five-course biblical leadership training that empowers church leaders to plant, develop and sustain healthy biblical churches in their nations.',
      bullets: [
        'Developing a comprehensive 5-course biblical leadership training module to help raise and restore healthy churches.',
        'Promoting the UNITY of the BODY of CHRIST through monthly house-to-house fellowship and gift sharing amongst church leaders.',
        'Providing a platform for church leaders to help one another in times of need.',
        'Encouraging and supporting replication of our training module.'
      ],
      videoUrl: '',
      ctaLabel: 'Learn More About Us',
      ctaLink: '/about'
    },
    stats: [
      { value: '7', label: 'Nations Reached' },
      { value: '10,000+', label: 'Congregations Impacted' },
      { value: '84+', label: 'Leaders Trained' },
      { value: '2013', label: 'Year Founded' }
    ],
    statsTitle: 'Our Progress',
    statsDescription: 'By the grace of God, Acts Fellowship International is making an impact across seven nations through pastoral training and fellowship.',
    aboutSection: {
      title: 'About Acts Fellowship',
      description: 'This vision started in 2013 with church leadership conferences in Liberia. More than 300 church leaders attended, revealing the hunger and need for continuous church leadership training — not only in Liberia but to other nations of the world. The ACTS apostleship module came to mind prayerfully: train 12 church leaders in every nation, who then replicate the training to other church leaders in their region.',
      image: ''
    },
    fellowshipSection: {
      title: 'Fellowship Across Nations',
      description: 'We have conducted training in Liberia, Sierra Leone, Guinea and East Africa — training leaders from Uganda, Tanzania, Kenya, and Rwanda. Our 3-fold approach in every nation: Training (1 Tim. 2:15), Prayer (1 Thess. 5:17), and Rotational house fellowship among leaders (John 17:20-21).',
      image: ''
    },
    title: 'Acts Fellowship Outcomes',
    description: 'A healthy and transformed leader results in a healthy and transformed church congregation.',
    cards: [
      {
        title: 'Biblical Leadership Training',
        description: 'A 5-course training module carefully crafted to empower church leaders with the tools for effective ministry.'
      },
      {
        title: 'Unity Through Fellowship',
        description: 'Monthly house-to-house fellowship and rotational gatherings build unity among leaders across nations.'
      },
      {
        title: 'Multiplication Model',
        description: 'Every trained leader replicates the training to others in their community, creating an ever-growing network of equipped pastors.'
      }
    ],
    partnerSection: {
      title: 'Partner With Us',
      description: 'Your support helps us equip church leaders who would otherwise have no access to biblical ministry training. Partner with us today and play a vital role in shaping the future of the church across Africa.',
      ctaLabel: 'Get Involved',
      ctaLink: '/partner-with-us'
    },
    createdAt: now,
    updatedAt: now
  }

  try {
    // Seed About
    const aboutRef = db.collection('aboutContent').doc('main')
    const aboutDoc = await aboutRef.get()
    if (!aboutDoc.exists) {
      await aboutRef.set(aboutData)
      console.log('✓ About content seeded')
    } else {
      console.log('✗ About content already exists, skipping...')
    }

    // Seed Vision
    const visionRef = db.collection('visionContent').doc('main')
    const visionDoc = await visionRef.get()
    if (!visionDoc.exists) {
      await visionRef.set(visionData)
      console.log('✓ Vision content seeded')
    } else {
      console.log('✗ Vision content already exists, skipping...')
    }

    // Seed Mission
    const missionRef = db.collection('missionContent').doc('main')
    const missionDoc = await missionRef.get()
    if (!missionDoc.exists) {
      await missionRef.set(missionData)
      console.log('✓ Mission content seeded')
    } else {
      console.log('✗ Mission content already exists, skipping...')
    }

    // Seed Impact
    const impactRef = db.collection('impactContent').doc('main')
    const impactDoc = await impactRef.get()
    if (!impactDoc.exists) {
      await impactRef.set(impactData)
      console.log('✓ Impact content seeded')
    } else {
      console.log('✗ Impact content already exists, skipping...')
    }

    // Seed Partnerships
    const partnershipsRef = db.collection('partnershipsContent').doc('main')
    const partnershipsDoc = await partnershipsRef.get()
    if (!partnershipsDoc.exists) {
      await partnershipsRef.set(partnershipsData)
      console.log('✓ Partnerships content seeded')
    } else {
      console.log('✗ Partnerships content already exists, skipping...')
    }

    // Seed Partner With Us
    const partnerWithUsRef = db.collection('partnerWithUsContent').doc('main')
    const partnerWithUsDoc = await partnerWithUsRef.get()
    if (!partnerWithUsDoc.exists) {
      await partnerWithUsRef.set(partnerWithUsData)
      console.log('✓ Partner With Us content seeded')
    } else {
      console.log('✗ Partner With Us content already exists, skipping...')
    }

    // Seed Team (merge so existing docs also get new fields)
    const teamRef = db.collection('teamContent').doc('main')
    await teamRef.set(teamData, { merge: true })
    console.log('✓ Team content seeded/updated')

    // Seed Resources
    const resourcesRef = db.collection('resourcesContent').doc('main')
    const resourcesDoc = await resourcesRef.get()
    if (!resourcesDoc.exists) {
      await resourcesRef.set(resourcesData)
      console.log('✓ Resources content seeded')
    } else {
      console.log('✗ Resources content already exists, skipping...')
    }

    // Seed Contact
    const contactRef = db.collection('contactContent').doc('main')
    const contactDoc = await contactRef.get()
    if (!contactDoc.exists) {
      await contactRef.set(contactData)
      console.log('✓ Contact content seeded')
    } else {
      console.log('✗ Contact content already exists, skipping...')
    }

    // Seed Donate
    const donateRef = db.collection('donateContent').doc('main')
    const donateDoc = await donateRef.get()
    if (!donateDoc.exists) {
      await donateRef.set(donateData)
      console.log('✓ Donate content seeded')
    } else {
      console.log('✗ Donate content already exists, skipping...')
    }

    // Seed Home (merge so existing docs also get new fields)
    const homeRef = db.collection('homeContent').doc('main')
    await homeRef.set(homeData, { merge: true })
    console.log('✓ Home content seeded/updated')

    console.log('\n✅ Content seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Error seeding content:', error)
    process.exit(1)
  }
}

// Run the seed function
seedData()
