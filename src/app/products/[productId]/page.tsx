import ProductForm from '@/components/form/ProductForm';
import { getTranslations } from 'next-intl/server';
import React from 'react'

type tParams = Promise<{ productId: string }>;

export default async function EditProductpage({ params }: { params: tParams }) {
  const { productId } = await params;
  const t = await getTranslations("product")
  return (
    <div className='flex justify-center'>
      <div className='flex flex-col max-w-md w-full'>
        <h2 className='text-2xl text-center'>{t("editProduct")}</h2>
        <ProductForm productId={Number(productId)}/>
      </div>
    </div>
  )
}