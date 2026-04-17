const TeamModel = require('../models/teamModel')

const getTeam = async (req, res) => {
  try {
    const doc = await TeamModel.findOne()
    if (!doc) return res.json(TeamModel.defaults)
    
    // Fetch images from subcollection for each member
    const imagesCollection = require('../config').db.collection('teamMemberImages')
    const membersWithImages = await Promise.all(
      (doc.members || []).map(async (member, index) => {
        const imageDoc = await imagesCollection.doc(String(index)).get()
        if (imageDoc.exists) {
          return { ...member, image: imageDoc.data().image }
        }
        return member
      })
    )
    
    res.json({ ...doc, members: membersWithImages })
  } catch (e) {
    console.error('getTeam error:', e)
    res.status(500).json({ message: 'Server error', error: e.message })
  }
}

const updateTeam = async (req, res) => {
  try {
    const payload = req.body
    const updateData = {}
    if (payload.title !== undefined) updateData.title = payload.title
    if (payload.description !== undefined) updateData.description = payload.description
    if (payload.advisoryBoard !== undefined) updateData.advisoryBoard = payload.advisoryBoard
    
    // Handle members - strip out images and store separately
    if (payload.members !== undefined) {
      const imagesCollection = require('../config').db.collection('teamMemberImages')
      const batch = require('../config').db.batch()
      
      const membersWithoutImages = payload.members.map((member, index) => {
        // If member has a new image (base64), store it separately
        if (member.image && member.image.startsWith('data:')) {
          const imageRef = imagesCollection.doc(String(index))
          batch.set(imageRef, { 
            image: member.image, 
            memberIndex: index,
            updatedAt: new Date().toISOString() 
          }, { merge: true })
        }
        // Return member without the image data for the main doc
        const { image, ...memberWithoutImage } = member
        return memberWithoutImage
      })
      
      await batch.commit()
      updateData.members = membersWithoutImages
    }

    const doc = await TeamModel.upsert(updateData)
    res.json(doc)
  } catch (e) {
    console.error('updateTeam error:', e)
    res.status(500).json({ message: 'Server error', error: e.message })
  }
}

const updateMemberImage = async (req, res) => {
  try {
    const { index } = req.params
    const { image } = req.body
    
    if (!image || typeof image !== 'string') {
      return res.status(400).json({ message: 'Valid image data is required' })
    }
    
    const imagesCollection = require('../config').db.collection('teamMemberImages')
    await imagesCollection.doc(String(index)).set({
      image,
      memberIndex: parseInt(index),
      updatedAt: new Date().toISOString()
    }, { merge: true })
    
    res.json({ message: 'Image updated successfully' })
  } catch (e) {
    console.error('updateMemberImage error:', e)
    res.status(500).json({ message: 'Failed to update image', error: e.message })
  }
}

const removeMemberImage = async (req, res) => {
  try {
    const { index } = req.params
    const imagesCollection = require('../config').db.collection('teamMemberImages')
    await imagesCollection.doc(String(index)).delete()
    res.json({ message: 'Image removed successfully' })
  } catch (e) {
    console.error('removeMemberImage error:', e)
    res.status(500).json({ message: 'Failed to remove image', error: e.message })
  }
}

module.exports = { getTeam, updateTeam, updateMemberImage, removeMemberImage }
