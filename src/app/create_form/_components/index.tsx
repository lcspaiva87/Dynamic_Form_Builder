"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { GripVertical, Plus, X } from 'lucide-react'
import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

type FieldType = 'text' | 'number' | 'email' | 'textarea' | 'select'

interface Field {
  id: string
  type: FieldType
  label: string
  options?: string[] // for select fields
}

interface Step {
  id: string
  title: string
  fields: Field[]
}

const FieldComponent: React.FC<{ 
  field: Field; 
  index: number; 
  onRemove: () => void;
  onUpdateOptions: (options: string[]) => void;
}> = ({ field, index, onRemove, onUpdateOptions }) => {
  const [newOption, setNewOption] = useState<string>('')

  const getFieldComponent = () => {
    switch (field.type) {
      case 'text':
      case 'number':
      case 'email':
        return <Input type={field.type} id={field.id} placeholder={`Enter ${field.label}`} />
      case 'textarea':
        return <Textarea id={field.id} placeholder={`Enter ${field.label}`} />
      case 'select':
        return (
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${field.label}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option, i) => (
                  <SelectItem key={i} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-2">
              <Input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="New option"
              />
              <Button 
                onClick={() => {
                  if (newOption) {
                    onUpdateOptions([...(field.options || []), newOption])
                    setNewOption('')
                  }
                }}
                className="mt-1"
              >
                <Plus size={16} className="mr-1" /> Add Option
              </Button>
            </div>
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center mt-1">
                <span>{option}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onUpdateOptions(field.options?.filter((_, i) => i !== index) || [])}
                  className="ml-2"
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Draggable draggableId={field.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="mb-4 p-2 bg-white rounded shadow"
        >
          <div className="flex items-center mb-2 justify-between">
            <div className="flex items-center">
              <div {...provided.dragHandleProps} className="mr-2">
                <GripVertical size={20} />
              </div>
              <Label htmlFor={field.id}>{field.label}</Label>
            </div>
            <Button variant="ghost" size="icon" onClick={onRemove}>
              <X size={20} />
            </Button>
          </div>
          {getFieldComponent()}
        </div>
      )}
    </Draggable>
  )
}

const fieldTypes: FieldType[] = ['text', 'number', 'email', 'textarea', 'select']

export default function DynamicFormBuilder() {
  const [steps, setSteps] = useState<Step[]>([])
  const [activeStep, setActiveStep] = useState<string | null>(null)
  const [newField, setNewField] = useState<Field>({ id: '', type: 'text', label: '' })
  const [newStepTitle, setNewStepTitle] = useState<string>('')

  const addField = () => {
    if (newField.label && activeStep) {
      setSteps(steps.map(step => 
        step.id === activeStep 
          ? { ...step, fields: [...step.fields, { ...newField, id: `field-${Date.now()}`, options: newField.type === 'select' ? [] : undefined }] }
          : step
      ))
      setNewField({ id: '', type: 'text', label: '' })
    }
  }

  const addStep = () => {
    if (newStepTitle) {
      const newStep: Step = {
        id: `step-${Date.now()}`,
        title: newStepTitle,
        fields: []
      }
      setSteps([...steps, newStep])
      setNewStepTitle('')
      setActiveStep(newStep.id)
    }
  }

  const removeStep = (stepId: string) => {
    setSteps(steps.filter(step => step.id !== stepId))
    if (activeStep === stepId) {
      setActiveStep(steps[0]?.id || null)
    }
  }

  const removeField = (stepId: string, fieldId: string) => {
    setSteps(steps.map(step => 
      step.id === stepId 
        ? { ...step, fields: step.fields.filter(field => field.id !== fieldId) }
        : step
    ))
  }

  const updateFieldOptions = (stepId: string, fieldId: string, newOptions: string[]) => {
    setSteps(steps.map(step => 
      step.id === stepId 
        ? { 
            ...step, 
            fields: step.fields.map(field => 
              field.id === fieldId 
                ? { ...field, options: newOptions }
                : field
            )
          }
        : step
    ))
  }

  const onDragEnd = (result: any) => {
    const { source, destination } = result

    if (!destination) return

    const sourceStep = steps.find(step => step.id === source.droppableId)
    const destStep = steps.find(step => step.id === destination.droppableId)

    if (sourceStep && destStep) {
      const newSteps = steps.map(step => {
        if (step.id === sourceStep.id) {
          const newFields = Array.from(step.fields)
          const [removed] = newFields.splice(source.index, 1)
          if (step.id === destStep.id) {
            newFields.splice(destination.index, 0, removed)
            return { ...step, fields: newFields }
          }
          return { ...step, fields: newFields }
        }
        if (step.id === destStep.id && step.id !== sourceStep.id) {
          const newFields = Array.from(step.fields)
          newFields.splice(destination.index, 0, sourceStep.fields[source.index])
          return { ...step, fields: newFields }
        }
        return step
      })
      setSteps(newSteps)
    }
  }

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Add New Step</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="stepTitle">Step Title</Label>
                <Input
                  id="stepTitle"
                  value={newStepTitle}
                  onChange={(e) => setNewStepTitle(e.target.value)}
                  placeholder="Enter step title"
                />
              </div>
              <Button onClick={addStep}>Add Step</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Add New Field to {steps.find(s => s.id === activeStep)?.title || 'Step'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fieldType">Field Type</Label>
                <Select
                  value={newField.type}
                  onValueChange={(value: FieldType) => setNewField({ ...newField, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select field type" />
                  </SelectTrigger>
                  <SelectContent>
                    {fieldTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fieldLabel">Field Label</Label>
                <Input
                  id="fieldLabel"
                  value={newField.label}
                  onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                  placeholder="Enter field label"
                />
              </div>
              <Button onClick={addField} disabled={!activeStep}>Add Field</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Form Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.id} className="border p-4 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <Button
                      variant={activeStep === step.id ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setActiveStep(step.id)}
                    >
                      {step.title}
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => removeStep(step.id)}>
                      <X size={20} />
                    </Button>
                  </div>
                  <Droppable droppableId={step.id}>
                    {(provided) => (
                      <div 
                        {...provided.droppableProps} 
                        ref={provided.innerRef} 
                        className="space-y-2 p-2 bg-gray-100 rounded min-h-[50px]"
                      >
                        {step.fields.map((field, fieldIndex) => (
                          <FieldComponent 
                            key={field.id} 
                            field={field} 
                            index={fieldIndex} 
                            onRemove={() => removeField(step.id, field.id)}
                            onUpdateOptions={(newOptions) => updateFieldOptions(step.id, field.id, newOptions)}
                          />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        </CardContent>
      </Card>
    </div>
  )
}