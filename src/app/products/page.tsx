import ProductTable from '@/components/table/ProductTable'
import { getTranslations } from 'next-intl/server'
import React from 'react'

export default async function ProductsPage() {
  const t = await getTranslations("product")
  return (
    <div className='size-full flex flex-col'>
      <h2 className='text-2xl font-bold mb-5'>{t("title")}</h2>
      <ProductTable/>
    </div>
  )
}