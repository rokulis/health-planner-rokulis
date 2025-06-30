'use client';

import type { ReactNode } from 'react';

export interface Step {
  id: number;
  label: string;
  content: ReactNode;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepChange?: (step: number) => void;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full flex flex-col h-full mb-4">
      <div className="flex items-center justify-start mb-4">
        {steps.map((step, index) => (
          <button type="button" key={step.id} className="flex items-center">
            <div
              className={`flex text-sm items-center justify-center w-[20px] h-[20px] rounded-full border-2 ${
                step.id === currentStep
                  ? 'bg-light-blue border-transparent text-black font-semibold'
                  : 'bg-white border-gray/50 text-black'
              }`}
            >
              {step.id}
            </div>
            <span className="ml-1 text-xs font-medium">{step.label}</span>

            {index < steps.length - 1 && (
              <div className="text-gray-300 scale-75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="flex-grow mt-4">
        {steps.find(step => step.id === currentStep)?.content}
      </div>
    </div>
  );
}
