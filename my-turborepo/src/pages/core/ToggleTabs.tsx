import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Maximize2, Minimize2 } from 'lucide-react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import useSelectors from 'src/hooks/useSelectors';
import { changeTabs } from 'src/stateSlices/tabsSlice';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ToggleTabs() {
  const [searchParams, setSearchParams] = useSearchParams()
  const handleChange = (event, newValue) => {
    dispatch(changeTabs(newValue))
    setSearchParams(searchParams => {
      searchParams.set('action', !newValue ? 'borrow' : 'lend')
      return searchParams
    })
  };
  const tabs = useSelectors(state => state.tabs.value)
  const dispatch = useDispatch()
  const tabsBox = useMemo(() => {
    return (
      <Box sx={{
        width: '148px'
      }}>
        <Tabs
          sx={{
            animation: 0,
            animationDuration: 0
          }}
          value={tabs} onChange={handleChange} aria-label="basic tabs example"
        >
          <Tab
            sx={{ width: '64px' }}
            label={<Minimize2 />} {...a11yProps(0)} />
          <Tab
            sx={{ width: '64px' }}
            label={<Maximize2 />} {...a11yProps(1)} />
        </Tabs>
      </Box>
    )
  }, [tabs])
  return (
    <>
      {tabsBox}
    </>
  );
}
