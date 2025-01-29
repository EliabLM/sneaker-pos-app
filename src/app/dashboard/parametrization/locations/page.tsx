export const dynamic = 'force-dynamic';
export const revalidate = 0;

import TableHeader from '@/components/ui/table-header';

import { DataTable } from '../shared/data-table';
import { columns } from './components/columns';
import CreateLocationForm from './components/create-location-form';
import { getLocations } from './locations-actions';

export const metadata = {
  title: 'Locales',
  description: 'Administra todos tus locales existentes o agrega uno nuevo',
};

const LocationPage = async () => {
  const locationsResponse = await getLocations();

  return (
    <div className='p-2'>
      <TableHeader
        title='Locales'
        subtitle='Administra todos tus locales existentes o agrega uno nuevo'
      >
        <CreateLocationForm />
      </TableHeader>

      <div className='w-full max-w-screen-xl px-4 mx-auto lg:px-12 mt-5'>
        <DataTable columns={columns} data={locationsResponse.data || []} />
      </div>
    </div>
  );
};

export default LocationPage;
