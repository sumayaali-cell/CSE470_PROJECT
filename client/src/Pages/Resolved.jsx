import { getResolved } from '@/Api/postApi';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const Resolved = () => {
  const [resolvedItems, setResolvedItems] = useState([]);

  const fetchResolved = async () => {
    try {
      const response = await getResolved();
      console.log(response)
      setResolvedItems(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResolved();
  }, []);

  return (
    <div className="min-h-screen px-4 py-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-black text-center">
          Resolved Items
        </h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Lost Location</TableHead>
              <TableHead>Found Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resolvedItems.length > 0 ? (
              resolvedItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.lostItem.itemName}</TableCell>
                  <TableCell>{item.lostItem.category}</TableCell>
                  <TableCell>
                    Lat: {item.lostItem.latitude.toFixed(4)}, Lng:{' '}
                    {item.lostItem.longitude.toFixed(4)}
                  </TableCell>
                  <TableCell>
                    Lat: {item.foundItem.latitude.toFixed(4)}, Lng:{' '}
                    {item.foundItem.longitude.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-green-600 font-semibold">
                    Resolved
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-black">
                  No resolved items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Resolved;
