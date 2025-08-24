import React, { FC } from 'react';
import { hallazgoWorkflow } from '@/config/hallazgoWorkflow';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Interfaces
interface Hallazgo {
  id?: number | string;
  titulo?: string;
  descripcion?: string;
  estado: string;
  [key: string]: any;
}

interface HallazgoWorkflowManagerProps {
  hallazgo: Hallazgo;
  onUpdate: (dataToUpdate: any) => void;
  onCancel?: () => void;
}

interface WorkflowFormData {
  decision?: string;
  eficacia_verificacion?: string;
  [key: string]: any;
}

const HallazgoWorkflowManager: FC<HallazgoWorkflowManagerProps> = ({ hallazgo, onUpdate, onCancel }) => {
  const handleSubmit = async (formData: WorkflowFormData, nextState: string): Promise<void> => {
    const dataToUpdate = {
      ...formData,
      estado: nextState,
    };
    onUpdate(dataToUpdate);
  };

  const renderCurrentStep = (): JSX.Element => {
    const currentStateConfig = hallazgoWorkflow[hallazgo.estado];

    if (!currentStateConfig) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Estado no reconocido</CardTitle>
            <CardDescription>
              El estado actual del hallazgo ({hallazgo.estado}) no corresponde a un paso procesable.
            </CardDescription>
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

    const handleFormSubmit = (formData: WorkflowFormData): void => {
      let finalNextState = nextState;
      // Lógica de bifurcación centralizada
      if (typeof nextState === 'object' && nextState !== null) {
        // Para FormAnalisisAccion
        if (formData.decision) {
          finalNextState = nextState[formData.decision];
        }
        // Para FormVerificacionCierre
        else if (formData.eficacia_verificacion) {
          finalNextState = nextState[formData.eficacia_verificacion];
        }
      }
      handleSubmit(formData, finalNextState as string);
    };

    return <Component hallazgo={hallazgo} onSubmit={handleFormSubmit} onCancel={onCancel} />;
  };

  return <div>{renderCurrentStep()}</div>;
};

export default HallazgoWorkflowManager;