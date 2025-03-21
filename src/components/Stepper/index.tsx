import { FC, useEffect, useRef, useState } from "react";
import './style.css';
import { Avatar, Button, StackLayout, useTheme } from "@salt-ds/core";
import { CheckmarkIcon } from "@salt-ds/icons";
type StepConfigProps = {
  name: string;
  Component: any;
}[]
const Stepper: FC<{ stepsConfig: StepConfigProps }> = ({ stepsConfig }) => {
  const { mode } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef<any>([]);

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepsConfig.length - 1].offsetWidth / 2,
    });
  }, [stepRef, stepsConfig.length]);

  if (!stepsConfig.length) {
    return <></>;
  }

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === 1) {
        return prevStep;
      } else {
        setIsComplete(false);
        return prevStep - 1;
      }
    }
    );
  };
  const onClickStepNumber = (sNumber : number) => {
    if (currentStep > sNumber) {
      setCurrentStep(sNumber);
    }
  };
  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;
  return (
    <>
      <div className="stepper">
        {stepsConfig.map((step, index) => {
          return (
            <div
              key={step.name}
              //@ts-ignore
              ref={(el) => (stepRef.current[index] = el)}
              className={`step ${currentStep > index + 1 || isComplete ? "complete" : ""
                } ${currentStep === index + 1 ? "active" : ""} `}
            >
              <Avatar
                onClick={()=>onClickStepNumber(index + 1)}
                fallbackIcon={<CheckmarkIcon />}
                className={`step-number ${(currentStep > index + 1 || isComplete) ? `success-bg-${mode}` : ''}`} size={1.2} name={(currentStep > index + 1 || isComplete ? (
                  ""
                ) : (
                  index + 1
                ))?.toString()} />
              <div className="step-name">{step.name}</div>
            </div>
          );
        })}

        <div
          className="progress-bar"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className={`progress success-bg-${mode}`}
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>

      <ActiveComponent />

      <StackLayout direction={"row"}  >
        {
          (currentStep !== 1 && currentStep !== stepsConfig.length) &&
          <Button
            sentiment="accented"
            appearance="solid"
            className="step-btn"
            onClick={(handleBack)}>
            Back
          </Button>
        }

        {!isComplete && (
          <Button
            sentiment="accented"
            appearance="solid"
            className="step-btn"
            onClick={handleNext}>
            {currentStep === stepsConfig.length ? "Finish" : "Next"}
          </Button>
        )}
      </StackLayout>
    </>
  );
};

export default Stepper;