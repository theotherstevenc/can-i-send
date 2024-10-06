import { Checkbox, FormControlLabel } from '@mui/material'
import { OptionCheckBoxProps } from '../util/types'

export const OptionCheckBox: React.FC<OptionCheckBoxProps> = ({
  minifyHTML,
  wordWrap,
  preventThreading,
  setMinifyHTML,
  setWordWrap,
  setPreventThreading,
}) => {
  return (
    <>
      <FormControlLabel
        control={<Checkbox checked={minifyHTML} onChange={(e) => setMinifyHTML(e.target.checked)} name='minifyHTML' color='primary' />}
        label='Minify'
      />

      <FormControlLabel
        control={<Checkbox checked={wordWrap} onChange={(e) => setWordWrap(e.target.checked)} name='wordWrap' color='primary' />}
        label='Word wrap'
      />

      <FormControlLabel
        control={
          <Checkbox checked={preventThreading} onChange={(e) => setPreventThreading(e.target.checked)} name='preventThreading' color='primary' />
        }
        label='Prevent Threading'
      />
    </>
  )
}
