import React from 'react'
import { hallazgoWorkflow } from '@/config/hallazgoWorkflow'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export interface HallazgoEntity {
  estado: string
  [key: string]: unknown
}

export interface HallazgoWorkflowManagerProps {
  hallazgo: HallazgoEntity
  onUpdate: (update: Record<string, unknown>) => void
  onCancel: () => void
}

const HallazgoWorkflowManager: React.FC<HallazgoWorkflowManagerProps> = ({ hallazgo, onUpdate, onCancel }) => {
  const handleSubmit = async (formData: Record<string, unknown>, nextState: unknown) => {
    const dataToUpdate = {
      ...formData,
      estado: nextState as string,
    }
    onUpdate(dataToUpdate)
  }

  const renderCurrentStep = () => {
    const currentStateConfig = hallazgoWorkflow[hallazgo.estado as keyof typeof hallazgoWorkflow]

    if (!currentStateConfig) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Estado no reconocido</CardTitle>
            <CardDescription>El estado actual del hallazgo ({hallazgo.estado}) no corresponde a un paso procesable.</CardDescription>
          </CardHeader>
        </Card>
      )
    }

    const { Component, nextState } = currentStateConfig as any

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
      )
    }

    const handleFormSubmit = (formData: any) => {
      let finalNextState: any = nextState
      if (typeof nextState === 'object' && nextState !== null) {
        if (formData.decision) {
          finalNextState = nextState[formData.decision]
        } else if (formData.eficacia_verificacion) {
          finalNextState = nextState[formData.eficacia_verificacion]
        }
      }
      handleSubmit(formData, finalNextState)
    }

    const StepComponent = Component as React.ComponentType<any>
    return <StepComponent hallazgo={hallazgo} onSubmit={handleFormSubmit} onCancel={onCancel} />
  }

  return <div>{renderCurrentStep()}</div>
}

export default HallazgoWorkflowManager