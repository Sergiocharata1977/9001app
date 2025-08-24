import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Info } from 'lucide-react';

const ERDDiagram = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Diagrama Entidad-Relación
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <Info className="w-12 h-12 mb-4 text-gray-400" />
          <p className="text-lg font-medium mb-2">Diagrama ERD</p>
          <p className="text-sm text-center max-w-md">
            El diagrama entidad-relación está en desarrollo. 
            Pronto podrás visualizar las relaciones entre las tablas de la base de datos.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ERDDiagram;