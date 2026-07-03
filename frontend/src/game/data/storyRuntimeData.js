export const STORY_SCENES = {
  STSC00001: {
    id: 'STSC00001',
    title: 'Home by the River: Arrival',
    chapter: 'STCH001',
    triggerFlag: 'story_STSC00001_seen',
    body: 'Barangay San Isidro opens slowly: warm paths, watchful elders, and stories that treat Nilalang as neighbors before they are ever dangers.',
  },
  STSC00002: {
    id: 'STSC00002',
    title: 'Home by the River: Decision',
    chapter: 'STCH001',
    triggerFlag: 'story_STSC00002_seen',
    body: 'Babaylan Lira speaks of balance without claiming one final truth. The path ahead asks you to listen before acting.',
  },
  STSC00003: {
    id: 'STSC00003',
    title: 'First Oath of Trust: Forest Threshold',
    chapter: 'STCH002',
    triggerFlag: 'story_STSC00003_seen',
    body: 'The Balete Forest is not empty. Roots, mounds, and rustling leaves answer your steps with warnings older than the road.',
  },
  STSC00004: {
    id: 'STSC00004',
    title: 'First Oath of Trust: After the Nightmare',
    chapter: 'STCH002',
    triggerFlag: 'story_STSC00004_seen',
    body: 'The shrine breathes easier after the Batibat presence recedes. A bond with a Nilalang can now become a promise, not a prize.',
  },
}

export function storySceneById(sceneId) {
  return STORY_SCENES[sceneId] ?? null
}

export function shouldPlayStoryScene(save, sceneId) {
  const scene = storySceneById(sceneId)
  return Boolean(scene && !save.world.story_flags.includes(scene.triggerFlag))
}

export function markStorySceneSeen(save, sceneId) {
  const scene = storySceneById(sceneId)
  if (!scene) return null
  if (!save.world.story_flags.includes(scene.triggerFlag)) save.world.story_flags.push(scene.triggerFlag)
  if (sceneId === 'STSC00004' && !save.world.story_flags.includes('scene_4_seen')) {
    save.world.story_flags.push('scene_4_seen')
  }
  return scene
}
