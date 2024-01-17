'use client'
import { Tabs } from '@/components/ui/tabs'
import { useState, useEffect } from 'react'

export default function HomeTabs ({ query, page, children }: { query: string, page: string, children: React.ReactNode }) {
  const [value, setValue] = useState('serieslist')
  const [firstRender, setFirstRender] = useState(true)
  useEffect(() => {
    if (query.length > 0) {
      setValue('search')
    }
    if (query.length === 0) {
      setValue('serieslist')
    }
  }, [query])
  const onValueChange = (value: string) => {
    setValue(query.length > 0 && firstRender ? 'search' : value)
    setFirstRender(false)
  }
  return (
        <Tabs
            defaultValue={'serieslist'}
            value={firstRender && query.length > 0 ? 'search' : value}
            className="text-white flex flex-col items-center"
            onValueChange={onValueChange}
        >
          {children}
        </Tabs>
  )
}
