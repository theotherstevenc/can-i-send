import Split from 'react-split'
import { WorkspaceEditorPreview, WorkspaceFileBrowser } from '../components'

const WorkspaceEditorContainer = () => {
  return (
    <Split className='split' sizes={[10, 90]}>
      <WorkspaceFileBrowser />
      <WorkspaceEditorPreview />
    </Split>
  )
}

export default WorkspaceEditorContainer
