import productApiRequest from '@/apiRequest/product';
import React from 'react';
import ProductAddForm from '../_components/product-add-form';
import Image from 'next/image';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import DeleteProduct from '../_components/delete-product';

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const isLogin = Boolean(sessionToken);
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
        <>
          <Image
            className="w-64 h-32 object-cover"
            src={product.image}
            alt={product.name}
            width={150}
            height={150}
            priority
          />
          <h3>{product.name}</h3>
          <div>{product.price}</div>
          {isLogin && (
            <Link href={`/products/${product.id}/edit`}>
              <Button variant={'outline'}>Edit</Button>
            </Link>
          )}

          {isLogin && <DeleteProduct product={product} />}
        </>
      )}
    </div>
  );
}
