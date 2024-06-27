import productApiRequest from '@/apiRequest/product';
import React from 'react';
import ProductAddForm from '../../_components/product-add-form';

export default async function ProductEdit({
  params,
}: {
  params: { id: string };
}) {
  let product = null;
  try {
    const { payload } = await productApiRequest.getDetail(Number(params.id));
    product = payload.data;
    console.log(product);
  } catch (error) {}

  return (
    <div>
      {!product ? (
        <div>Không tim thấy dữ liệu</div>
      ) : (
        <ProductAddForm product={product} />
      )}
    </div>
  );
}
