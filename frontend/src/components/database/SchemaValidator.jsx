import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';

const SchemaValidator = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Validador de Esquema
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <AlertTriangle className="w-12 h-12 mb-4 text-yellow-400" />
          <p className="text-lg font-medium mb-2">Validación de Esquema</p>
          <p className="text-sm text-center max-w-md">
            El validador de esquema está en desarrollo. 
            Pronto podrás verificar la integridad y consistencia de tu base de datos.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchemaValidator;