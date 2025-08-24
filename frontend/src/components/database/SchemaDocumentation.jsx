import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FileText } from 'lucide-react';

const SchemaDocumentation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Documentación del Esquema
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Documentación en Construcción
          </h3>
          <p className="text-gray-500 max-w-md">
            La documentación completa del esquema de base de datos estará disponible próximamente.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchemaDocumentation;