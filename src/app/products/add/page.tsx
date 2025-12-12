import ProductForm from '@/components/form/ProductForm'
import { getTranslations } from 'next-intl/server'
import React from 'react'

export default async function AddProductPage() {
  const t = await getTranslations("product")
  return (
    <div className='flex justify-center'>
      <div className='flex flex-col max-w-md w-full'>
        <h2 className='text-2xl text-center'>{t("addProduct")}</h2>
        <ProductForm/>
      </div>
    </div>
  )
}