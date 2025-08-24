import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle } from 'lucide-react';

const SchemaValidator = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Validador de Esquema
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <CheckCircle className="h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Validador en Construcción
          </h3>
          <p className="text-gray-500 max-w-md">
            La herramienta de validación del esquema de base de datos estará disponible próximamente.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchemaValidator;