import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { Label, Pie, PieChart } from 'recharts'
import Carousels from '../core/specifics/Carousels'
import { useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'

const ProfileFifth = () => {
  const [completedAction, setCompletedAction] = useState('')
  const { language } = useLanguage()
  const actions = [
    {
      action: 'borrow',
      number: 1,
      fill: '#e76e50',
    },
    {
      action: 'lend',
      number: 1,
      fill: '#7fc4bc',
    },
  ]
  const labels = {
    number: {
      label: 'total',
    },
    borrow: {
      label: language === 'en' ? 'Borrow' : '빌리기',
      color: '#e76e50',
    },
    lend: {
      label: language === 'en' ? 'Lend' : '빌려주기',
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
                setCompletedAction(action)
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
                          setCompletedAction('')
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
                          {language === 'en' ? 'Activities Completed' : '활동 완료'}
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
      <Carousels completedAction={completedAction}/>
    </div>
  )
}

export default ProfileFifth
