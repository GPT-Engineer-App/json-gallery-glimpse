import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination';

const Dashboard = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((item, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-4">
              <img
                src={`/images/${item.media_id}.jpg`}
                alt={`Image ${item.media_id}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `/images/${item.media_id}.jpeg`;
                }}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <ul className="space-y-2">
                {Object.entries(item).map(([key, value]) => (
                  key !== 'media_id' && (
                    <li key={key} className="text-sm">
                      <span className="font-semibold">{key}:</span> {value}
                    </li>
                  )
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination
        className="mt-8"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Dashboard;
