/* eslint-disable react-hooks/exhaustive-deps */
import { TagsInput } from 'react-tag-input-component'
import { useAppContext } from '../context/AppContext'

const InputEmailAddresses = () => {
  const { emailAddresses, setEmailAddresses } = useAppContext()

  return <TagsInput value={emailAddresses} onChange={setEmailAddresses} />
}
export default InputEmailAddresses
