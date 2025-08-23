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
        <div className="text-center py-12">
          <CheckCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Validador de esquema en desarrollo</p>
          <p className="text-sm text-gray-500 mt-2">
            La validación de esquemas estará disponible próximamente
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchemaValidator;