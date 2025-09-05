import React, { useContext, useEffect, useState } from "react";
import { getDonatedItem, updateClaimed } from "@/Api/postApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/Context/UserContext";

const Donated = () => {
  const [items, setItems] = useState([]);
  const {userId} = useContext(UserContext)
  const fetchDonatedItem = async () => {
    try {
      const response = await getDonatedItem();
      setItems(response.data.data || []);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDonatedItem();
  }, []);

  const handleClaim = async(itemId) => {
    console.log("Claim clicked for item:", itemId);
    try{
        await updateClaimed(itemId)
        fetchDonatedItem();
    }catch(error){
        console.log(error)
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6">Donated Items</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length > 0 ? (
            items.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.itemName}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  {item.imageUrl && (
                    <img
                      src={`http://localhost:8000/${item.imageUrl}`}
                      alt={item.itemName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleClaim(item._id,userId)}
                  >
                    Claim
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500">
                No items found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Donated;

