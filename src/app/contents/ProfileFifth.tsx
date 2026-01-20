import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { useDispatch } from 'react-redux'
import { Label, Pie, PieChart } from 'recharts'
import useTexts from 'src/hooks/useTexts'
import { changeCompletedAction } from 'src/stateSlices/completedActionSlice'
import Carousels from '../core/specifics/Carousels'
import { Card } from 'src/components/ui/card'
import useSelectors from 'src/hooks/useSelectors'
import { useLocation } from 'react-router-dom'

const ProfileFifth = () => {
  const { state } = useLocation()
  const profile = useSelectors((state) => state.profile.value)
  const userUid = state?.element.uid || profile?.uid
  const dispatch = useDispatch()
  const {startCollectingCardsBySharingItemsWithUsers, noCards} = useTexts()
  const { borrowing, lending, activitiesCompleted } = useTexts()
  const actions = [
    {
      action: 'borrow',
      number: cards.borrowDone.length,
      fill: '#e76e50',
    },
    {
      action: 'lend',
      number: cards.lendDone.length,
      fill: '#7fc4bc',
    },
  ]
  const labels = {
    number: {
      label: 'total',
    },
    borrow: {
      label: borrowing,
      color: '#e76e50',
    },
    lend: {
      label: lending,
      color: '#7fc4bc',
    },
  } satisfies ChartConfig
  const totalNumber = actions.reduce((acc, curr) => acc + curr.number, 0)
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-center h-[250px] pt-5">
        <ChartContainer config={labels} className="aspect-square max-h-[250px]">
          <PieChart>
            <ChartLegend
              content={<ChartLegendContent nameKey="action" />}
              className="text-base font-bold gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              verticalAlign="bottom"
            />
            <Pie
              data={actions}
              dataKey="number"
              nameKey="action"
              onClick={(value) => {
                const action = value.action
                dispatch(changeCompletedAction(action))
              }}
              innerRadius={60}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        onClick={() => {
                          dispatch(changeCompletedAction(''))
                        }}
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalNumber.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-foreground"
                        >
                          {activitiesCompleted}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="action" />}
              className="text-base font-bold gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              verticalAlign="top"
            />
          </PieChart>
        </ChartContainer>
      </div>
      <Carousels />
    </div>
  )
}

export default ProfileFifth
