import React from 'react';
import { hallazgoWorkflow } from '@/config/hallazgoWorkflow';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Tipos
interface Hallazgo {
  id?: number;
  titulo?: string;
  descripcion?: string;
  estado: string;
  [key: string]: any;
}

interface FormData {
  decision?: string;
  eficacia_verificacion?: string;
  [key: string]: any;
}

interface HallazgoWorkflowManagerProps {
  hallazgo: Hallazgo;
  onUpdate: (data: any) => void;
  onCancel: () => void;
}

const HallazgoWorkflowManager: React.FC<HallazgoWorkflowManagerProps> = ({ hallazgo, onUpdate, onCancel }) => {
  const handleSubmit = async (formData: FormData, nextState: string) => {
    const dataToUpdate = {
      ...formData,
      estado: nextState,
    };
    onUpdate(dataToUpdate);
  };

  const renderCurrentStep = () => {
    const currentStateConfig = hallazgoWorkflow[hallazgo.estado];

    if (!currentStateConfig) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Estado no reconocido</CardTitle>
            <CardDescription>El estado actual del hallazgo ({hallazgo.estado}) no corresponde a un paso procesable.</CardDescription>
          </CardHeader>
        </Card>
      );
    }

    const { Component, nextState } = currentStateConfig;

    if (!Component) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Proceso Finalizado</CardTitle>
            <CardDescription>Este hallazgo ha sido verificado y cerrado.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>No hay acciones pendientes para este hallazgo.</p>
          </CardContent>
        </Card>
      );
    }

    const handleFormSubmit = (formData: FormData) => {
      let finalNextState = nextState;
      // Lógica de bifurcación centralizada
      if (typeof nextState === 'object' && nextState !== null) {
        // Para FormAnalisisAccion
        if (formData.decision) {
          finalNextState = (nextState as any)[formData.decision];
        }
        // Para FormVerificacionCierre
        else if (formData.eficacia_verificacion) {
          finalNextState = (nextState as any)[formData.eficacia_verificacion];
        }
      }
      handleSubmit(formData, finalNextState);
    };

    return <Component hallazgo={hallazgo} onSubmit={handleFormSubmit} onCancel={onCancel} />;
  };

  return <div>{renderCurrentStep()}</div>;
};

export default HallazgoWorkflowManager;