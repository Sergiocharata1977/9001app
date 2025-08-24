import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Database } from 'lucide-react';

const ERDDiagram = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Diagrama Entidad-Relación
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Database className="h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Diagrama ERD en Construcción
          </h3>
          <p className="text-gray-500 max-w-md">
            El diagrama entidad-relación de la base de datos estará disponible próximamente.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ERDDiagram;