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
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Documentación en desarrollo</p>
          <p className="text-sm text-gray-500 mt-2">
            La documentación del esquema estará disponible próximamente
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchemaDocumentation;