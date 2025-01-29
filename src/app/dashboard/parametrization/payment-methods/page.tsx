export const dynamic = 'force-dynamic';
export const revalidate = 0;

import TableHeader from '@/components/ui/table-header';

import { DataTable } from '../shared/data-table';
import { columns } from './components/columns';
import CreatePaymentMethodForm from './components/create-payment-method-form';
import { getPaymentMethods } from './payment-method-actions';

export const metadata = {
  title: 'Métodos de pago',
  description:
    'Administra todos tus método de pago existentes o agrega uno nuevo',
};

const PaymentMethodPage = async () => {
  const paymentMethodsResponse = await getPaymentMethods();

  return (
    <div className='p-2'>
      <TableHeader
        title='Métodos de pago'
        subtitle='Administra todos tus métodos de pago o agrega uno nuevo'
      >
        <CreatePaymentMethodForm />
      </TableHeader>

      <div className='w-full max-w-screen-xl px-4 mx-auto lg:px-12 mt-5'>
        <DataTable columns={columns} data={paymentMethodsResponse.data || []} />
      </div>
    </div>
  );
};

export default PaymentMethodPage;
