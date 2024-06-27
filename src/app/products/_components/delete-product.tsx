'use client';
import productApiRequest from '@/apiRequest/product';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { handleErrorApi } from '@/lib/utils';
import { ProductResType } from '@/schemaValidations/product.schema';
import { useRouter } from 'next/navigation';
type Product = ProductResType['data'];

export default function DeleteProduct({ product }: { product: Product }) {
  const { toast } = useToast();
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const result = await productApiRequest.delete(product.id);
      router.refresh();
      toast({ description: result.payload.message });
    } catch (error) {
      handleErrorApi({ error });
    }
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={'destructive'}>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có muốn xóa sản phẩm này ?</AlertDialogTitle>
            <AlertDialogDescription>
              Đây là sản phẩm "{product.name}"
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
