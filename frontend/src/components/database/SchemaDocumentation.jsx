import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Info } from 'lucide-react';

const SchemaDocumentation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Documentación del Esquema
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <Info className="w-12 h-12 mb-4 text-gray-400" />
          <p className="text-lg font-medium mb-2">Documentación</p>
          <p className="text-sm text-center max-w-md">
            La documentación del esquema está en desarrollo. 
            Pronto podrás generar y visualizar documentación detallada de tu base de datos.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchemaDocumentation;