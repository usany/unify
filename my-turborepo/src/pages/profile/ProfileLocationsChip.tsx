import { Button, Chip, ClickAwayListener, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'
import useTexts from 'src/hooks/useTexts'

const ProfileLocationsChip = () => {
  const [open, setOpen] = useState(false)
  const {
    areYouInCampus,
    letOthersKnowYouAreInCampusByLocationConfirmation,
    locationConfirmationLastsUntilTheNextDay,
  } = useTexts()
  const handleTooltipClose = () => {
    setOpen(false)
  }
  const handleTooltipOpen = () => {
    setOpen(true)
  }

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={
            <div className="text-xl">
              <div>{areYouInCampus}</div>
              <div>
                {letOthersKnowYouAreInCampusByLocationConfirmation}
              </div>
              <div>{locationConfirmationLastsUntilTheNextDay}</div>
            </div>
          }
          slotProps={{
            popper: {
              disablePortal: true,
            },
          }}
        >
          <div
            className="rounded-xl border border-solid px-1 bg-light-2 dark:bg-dark-2"
            onClick={handleTooltipOpen}
          >
            ?
          </div>
        </Tooltip>
    </ClickAwayListener>
  )
}

export default ProfileLocationsChip
