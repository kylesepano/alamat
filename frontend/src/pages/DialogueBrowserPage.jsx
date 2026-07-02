import { DialogueNodeCard } from '../components/DialogueNodeCard'
import { PageHeader } from '../components/PageHeader'
import { useStoryDialogues } from '../hooks/useStory'

export function DialogueBrowserPage() {
  const { data: dialogues } = useStoryDialogues()
  return <div className="space-y-5"><PageHeader kicker="Phase K" title="Dialogue Browser" description="Reusable dialogue nodes with speakers, portraits, emotions, cues, conditions, choices, consequences, and localization keys." />{dialogues.slice(0, 40).map((node) => <DialogueNodeCard key={node.dialogue_id} node={node} />)}</div>
}
