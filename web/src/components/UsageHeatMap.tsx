import { useState } from 'react'

import './UsageHeatMap.less'

const heatMapConfig = {
  columns: 10,
  rows: 7
}

type Heat = number

function getInitialHeapMap(usedDay: number) {
  let heats = new Array(usedDay)
  for (let i = 0; i < usedDay; i++) heats[i] = 0
  return heats
}

function UsageHeatMap() {
  const today = new Date().getDay() // 获取今天是星期几
  const usedDay = heatMapConfig.rows * (heatMapConfig.columns - 1) + today + 1
  const unusedDay = heatMapConfig.columns * heatMapConfig.rows - usedDay

  const [usedHeatMap, setHeatMap] = useState<Heat[]>(getInitialHeapMap(usedDay))
  const [unusedHeatMap, setUnHeatMap] = useState<Heat[]>(getInitialHeapMap(unusedDay))

  return (
    <div className='heats'>
      <div className='top'>
        <div className='heats-map'>
          {usedHeatMap.length > 0 && usedHeatMap.map(() => <div className='heat'></div>)}
          {unusedHeatMap.length > 0 && unusedHeatMap.map(() => <div className='unheat'></div>)}
        </div>
        <div className='day'>
          <span>日</span>
          <span>二</span>
          <span>四</span>
          <span>六</span>
        </div>
      </div>
      <div className='bottom'>三十六 <span className='utip'>memos in</span> 壹 <span className='utip'>天</span></div>
    </div>
  )
}

export default UsageHeatMap
