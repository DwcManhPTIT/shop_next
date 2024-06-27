import authApiRequest from '@/apiRequest/auth';
import productApiRequest from '@/apiRequest/product';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import DeleteProduct from './_components/delete-product';
import { cookies } from 'next/headers';

export default async function ProductList() {
  const { payload } = await productApiRequest.getList();
  const listProducts = payload.data;
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const isLogin = Boolean(sessionToken);
  return (
    <div className="space-y-5">
      <h2>Danh sach san pham</h2>
      {isLogin && (
        <Link href={'/products/add'}>
          <Button variant={'secondary'}>Thêm sản phẩm</Button>
        </Link>
      )}

      <div className="space-y-8">
        {listProducts.map((product) => (
          <div className="flex space-x-6" key={product.id}>
            <Link href={`/products/${product.id}`}>
              <Image
                className="w-64 h-32 object-cover"
                src={product.image}
                alt={product.name}
                width={150}
                height={150}
                priority
              />
            </Link>

            <h3>{product.name}</h3>
            <div>{product.price}</div>
            {isLogin && (
              <Link href={`/products/${product.id}/edit`}>
                <Button variant={'outline'}>Edit</Button>
              </Link>
            )}

            {isLogin && <DeleteProduct product={product} />}
          </div>
        ))}
      </div>
    </div>
  );
}
