import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemsById } from "@/Api/postApi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  const fetchItem = async () => {
    try {
      const response = await getItemsById(id);
      setItem(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  if (!item)
    return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <div className="w-full h-screen p-6 bg-zinc-900 flex justify-center items-center">
      <Card className="w-full h-full max-w-6xl shadow-xl  overflow-hidden bg-zinc-800 text-white">
        <div className="grid md:grid-cols-2 gap-6 h-full">
          {/* Image */}
          <div className="relative h-full">
            <img
              src={`http://localhost:8000/${item.imageUrl}`}
              alt={item.itemName}
              className="w-full h-full object-cover  shadow-lg border border-zinc-700"
            />
            <Badge
              className={`absolute top-4 left-4 px-3 py-1 text-sm font-semibold ${
                item.status === "lost" ? "bg-red-600" : "bg-green-600"
              }`}
            >
              {item.status.toUpperCase()}
            </Badge>
          </div>

          {/* Details */}
          <CardContent className="flex flex-col justify-between space-y-4 h-full text-white">
            <h2 className="text-4xl font-bold text-white">{item.itemName}</h2>
            <div className="space-y-3 overflow-y-auto pr-2 text-white">
              <p>
                <span className="font-semibold">Category:</span> {item.category}
              </p>
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {item.description}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {new Date(item.date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Latitude:</span> {item.latitude}
              </p>
              <p>
                <span className="font-semibold">Longitude:</span>{" "}
                {item.longitude}
              </p>
              <p>
                <span className="font-semibold">Created At:</span>{" "}
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>

            <Button
              variant="default"
              className="mt-4 flex items-center gap-2 w-fit"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps?q=${item.latitude},${item.longitude}`,
                  "_blank"
                )
              }
            >
              <MapPin size={16} /> View on Map
            </Button>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default ItemDetails;
