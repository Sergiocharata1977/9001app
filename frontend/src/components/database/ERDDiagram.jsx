import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Database } from 'lucide-react';

const ERDDiagram = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Diagrama ERD
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <Database className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Diagrama ERD en desarrollo</p>
          <p className="text-sm text-gray-500 mt-2">
            El diagrama de entidad-relación estará disponible próximamente
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ERDDiagram;