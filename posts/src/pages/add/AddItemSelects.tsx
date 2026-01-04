import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import useSelectors from 'src/hooks/useSelectors';

interface Props {
  item: string
  changeItem: () => void
}
function AddItemSelects({ item, changeItem }: Props) {
  const languages = useSelectors((state) => state.languages.value)

  return (
    <div>
      <FormControl variant="standard" sx={{ minWidth: 150 }}>
        <InputLabel
        >{languages === 'ko' ? '우산 / 양산 선택' : 'Select Usan / Parasol'}</InputLabel>
        <Select
          value={item}
          onChange={changeItem}
        >
          <MenuItem value={'우산'}>{languages === 'ko' ? '우산' : 'Umbrella'}</MenuItem>
          <MenuItem value={'양산'}>{languages === 'ko' ? '양산' : 'Parasol'}</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default AddItemSelects
