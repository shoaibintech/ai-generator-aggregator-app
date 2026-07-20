import { Download, RotateCcw } from '../../../shared/icons'
import { Modal } from '../../../shared/components/ui'
import type { Generation } from '../generationsSlice'
import '../generations.css'

type GenerationDetailDialogProps = {
  generation: Generation
  onClose: () => void
}

export function GenerationDetailDialog({ generation, onClose }: GenerationDetailDialogProps) {
  const isGenerating = generation.status !== 'complete'

  return (
    <Modal className="generation-detail-dialog" onClose={onClose} title={isGenerating ? 'Creating your video' : 'Generation details'}>
      <div className="generation-detail-content">
        <div className="generation-detail-preview">
          <img alt={generation.alt} src={generation.imageUrl} />
          {isGenerating && <div aria-live="polite" className="generation-processing"><span className="processing-spinner" /><strong>Generating {generation.progress}%</strong><small>Mock processing state — the finished item will appear in your gallery.</small></div>}
        </div>
        <div className="generation-detail-body">
          <div className="generation-detail-status"><span>{generation.status === 'complete' ? 'Ready' : 'In progress'}</span><b>{generation.model}</b></div>
          <section>
            <h3>Prompt</h3>
            <p>{generation.prompt}</p>
          </section>
          <section>
            <h3>Settings</h3>
            <dl className="generation-settings-list">
              <div><dt>Aspect ratio</dt><dd>{generation.settings.aspectRatio}</dd></div>
              <div><dt>Resolution</dt><dd>{generation.settings.resolution}</dd></div>
              <div><dt>Duration</dt><dd>{generation.settings.duration}</dd></div>
              <div><dt>Audio</dt><dd>{generation.settings.audio ? 'On' : 'Off'}</dd></div>
              {generation.settings.attachmentName && <div><dt>Reference</dt><dd>{generation.settings.attachmentName}</dd></div>}
            </dl>
          </section>
          {!isGenerating && <div className="generation-detail-actions"><button type="button"><RotateCcw size={16} /> Remix</button><a download href={generation.imageUrl}><Download size={16} /> Download preview</a></div>}
        </div>
      </div>
    </Modal>
  )
}
