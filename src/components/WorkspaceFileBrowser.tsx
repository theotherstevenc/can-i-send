import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'
import { useState } from 'react'
import useEditorContext from '../hooks/useEditorContext'

const WorkspaceFileBrowser = () => {
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null)

  const { setHtml, setText, setAmp } = useEditorContext()

  const objectsArray = [
    {
      uuid: '9eac7849-5eb7-4b5a-915c-ba63323d66d9',
      html: '<div>HTML Content 1</div>',
      text: 'Text Content 1',
      amp: '<amp-img src="image1.jpg" width="300" height="200"></amp-img>',
      name: 'Filename 1',
    },
    {
      uuid: '530dc605-f2a0-49a4-8cea-c55cf23bb56d',
      html: '<div>HTML Content 2</div>',
      text: 'Text Content 2',
      amp: '<amp-img src="image2.jpg" width="300" height="200"></amp-img>',
      name: 'Filename 2',
    },
    {
      uuid: '6a844877-211d-4b22-83d0-9e22549f31dc',
      html: '<div>HTML Content 3</div>',
      text: 'Text Content 3',
      amp: '<amp-img src="image3.jpg" width="300" height="200"></amp-img>',
      name: 'Filename 3',
    },
  ]

  const handleListItemClick = (file: { uuid: string }) => {
    const selectedObject = objectsArray.find((obj) => obj.uuid === file.uuid)
    if (selectedObject) {
      setSelectedIndex(file.uuid)
      setHtml(selectedObject.html)
      setText(selectedObject.text)
      setAmp(selectedObject.amp)
    }
  }

  return (
    <List>
      {objectsArray.map((file) => (
        <ListItemButton selected={selectedIndex === file.uuid} onClick={() => handleListItemClick(file)}>
          <ListItemIcon sx={{ minWidth: '30px' }}>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={`File ${file.name}`} />
        </ListItemButton>
      ))}
    </List>
  )
}

export default WorkspaceFileBrowser
