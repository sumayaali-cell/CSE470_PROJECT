import { deleteItem, getMyItems, updateResolved } from '@/Api/postApi';
import { UserContext } from '@/Context/UserContext';
import React, { useContext, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const MyItems = () => {
  const { userId } = useContext(UserContext);
  const [myItems, setMyItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await getMyItems(userId);
      console.log(response.data)
      setMyItems(response.data|| []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await deleteItem(itemId)
      fetchItems();
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);



  const handleResolved = async(itemId)=>{
    try{
      await updateResolved(itemId)
      fetchItems();
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-black text-center">
          My Items
        </h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myItems.length > 0 ? (
              myItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    {new Date(item.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                    <Button 
  size="sm" 
  variant="Default" 
  className={`ml-2 ${item.isResolved ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 text-white"}`}
  onClick={() => handleResolved(item._id)}
  disabled={item.isResolved} // disable if already resolved
>
  {item.isResolved ? "Resolved" : "Mark as Resolved"}
</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-black">
                  No items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyItems;
