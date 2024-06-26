import authApiRequest from '@/apiRequest/auth';
import productApiRequest from '@/apiRequest/product';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

export default async function ProductList() {
  const { payload } = await productApiRequest.getList();
  const listProducts = payload.data;
  console.log(listProducts);
  return (
    <div>
      <h2>Danh sach san pham</h2>
      <div className="space-y-8">
        {listProducts.map((product) => (
          <div className="flex space-x-6" key={product.id}>
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
            <Button variant={'outline'}>Edit</Button>
            <Button variant={'destructive'}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
