
import BerryTable from '@/components/table/BerryTable'
import { getTranslations } from 'next-intl/server'
import React from 'react'

export default async function BerriesPage() {
  const t = await getTranslations("berry")
  return (
    <div className='size-full flex flex-col'>
      <h2 className='text-2xl font-bold mb-5'>{t("title")}</h2>
      <BerryTable/>
    </div>
  )
}