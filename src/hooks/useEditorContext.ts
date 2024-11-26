import { useContext } from 'react'
import { EditorContext } from '../context/EditorContext'

const useEditorContext = () => {
  const context = useContext(EditorContext)

  if (!context) {
    throw new Error('useEditorContext must be used within an EditorProvider')
  }

  return context
}

export default useEditorContext
