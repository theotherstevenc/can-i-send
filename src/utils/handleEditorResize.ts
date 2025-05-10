const handleEditorResize = (sizes: number[], storageKey: string, setState: React.Dispatch<React.SetStateAction<number[]>>) => {
  localStorage.setItem(storageKey, JSON.stringify(sizes))
  setState(sizes)
}

export default handleEditorResize
