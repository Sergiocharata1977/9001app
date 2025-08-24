import React from 'react';
import { hallazgoWorkflow } from '@/config/hallazgoWorkflow';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Hallazgo, HallazgoEstado } from '@/types/hallazgos';

interface HallazgoWorkflowManagerProps {
  hallazgo: Hallazgo;
  onUpdate: (updateData: Partial<Hallazgo>) => void;
  onCancel?: () => void;
}

interface FormSubmitData {
  [key: string]: any;
  decision?: string;
  eficacia_verificacion?: string;
}

const HallazgoWorkflowManager: React.FC<HallazgoWorkflowManagerProps> = ({ 
  hallazgo, 
  onUpdate, 
  onCancel 
}) => {
  const handleSubmit = async (formData: Record<string, any>, nextState: HallazgoEstado) => {
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

    const handleFormSubmit = (formData: FormSubmitData) => {
      let finalNextState = nextState;
      // Lógica de bifurcación centralizada
      if (typeof nextState === 'object' && nextState !== null) {
        // Para FormAnalisisAccion
        if (formData.decision) {
          finalNextState = (nextState as Record<string, HallazgoEstado>)[formData.decision];
        }
        // Para FormVerificacionCierre
        else if (formData.eficacia_verificacion) {
          finalNextState = (nextState as Record<string, HallazgoEstado>)[formData.eficacia_verificacion];
        }
      }
      handleSubmit(formData, finalNextState as HallazgoEstado);
    };

    return <Component hallazgo={hallazgo} onSubmit={handleFormSubmit} onCancel={onCancel} />;
  };

  return <div>{renderCurrentStep()}</div>;
};

export default HallazgoWorkflowManager;