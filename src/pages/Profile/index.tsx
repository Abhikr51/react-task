import React, { useState } from 'react';
import Stepper from '../../components/Stepper';
import PersonalDetails from './PersonalDetails';
import CurrentAddress from './CurrentAddress';
import PermanentAddress from './PermanentAddress';
import Confirmation from './Confirmation';

interface FormData {
  name: string;
  email: string;
  address: string;
  city: string;
  cardNumber: string;
  expiryDate: string;
}

export interface StepProps {
  data: FormData;
  onChange: (data: FormData) => void;
}

const DummyComp: React.FC<StepProps> = ({ data, onChange }) => (
  <div>
    <h2>Dummy Comp</h2>
  </div>
);

interface ConfirmationProps {
  data: FormData;
}

const PROFILE_STEPS = [
  {
    name: "Personal Details",
    Component: PersonalDetails,
  },
  {
    name: "Current Address",
    Component: CurrentAddress,
  },
  {
    name: "Permanent Address",
    Component: PermanentAddress,
  },
  {
    name: "Confirmation",
    Component: Confirmation,
  },
];

const Profile: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const StepComponent = PROFILE_STEPS[currentStep].Component;

  const handleNext = () => {
    if (currentStep < PROFILE_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <Stepper stepsConfig={PROFILE_STEPS} />
    </div>
  );
};

export default Profile;