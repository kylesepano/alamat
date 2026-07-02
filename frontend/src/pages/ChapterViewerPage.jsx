import { PageHeader } from '../components/PageHeader'
import { StoryChapterCard } from '../components/StoryChapterCard'
import { useStoryChapters } from '../hooks/useStory'

export function ChapterViewerPage() {
  const { data: chapters } = useStoryChapters()
  return <div className="space-y-5"><PageHeader kicker="Phase K" title="Chapter Viewer" description="Chapter progression with major quests, NPCs, Nilalang references, legendary encounters, and moral choice axes." />{chapters.map((chapter) => <StoryChapterCard key={chapter.chapter_id} chapter={chapter} />)}</div>
}
