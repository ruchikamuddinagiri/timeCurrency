import React, { useState } from "react";
import { useEffect } from "react";
import { object as zObject, string as zString, TypeOf, z } from "zod";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import FormInput from "../components/FormInput";
import { Button } from "../components/LoadingButton";
import Sidebar from "../components/Sidebar";
import { zodResolver } from "@hookform/resolvers/zod";

const SplitContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftSection = styled.div`
  width: 50%;
  background-color: #CCCCFF;
`;

const RightSection = styled.div`
  width: 50%;
`;

interface TimeRecord {
  punchIn: Date | undefined;
  punchOut: Date | undefined;
}

const registerTasksSchema = zObject({
  categories: zString().min(1, "Select the categories").max(100),
  taskName: zString()
    .min(1, "Task Name is required"),
  description: zString()
    .min(1, "Description is required")
    .min(10, "Description must be more than 10 characters")
    .max(100, "Password must be less than 100 characters"),
});

type TaskSchema = TypeOf<typeof registerTasksSchema>;

const TasksPage: React.FC = () => {
  const methods = useForm<TaskSchema>({
    resolver: zodResolver(registerTasksSchema),
  });

  const [timeRecord, setTimeRecord] = useState<TimeRecord>({
    punchIn: undefined,
    punchOut: undefined,
  });

  const handlePunch = (values: TaskSchema) => {
    //console.log('in handle punch:  ', values);
    //console.log('in handle punch, onion out ', values.description);
    //console.log('in handle punch, onion out ', values.categories);
    const now = new Date();
    if (!punchIn) {
      setTimeRecord({ ...timeRecord, punchIn: now });
    } else {
      setTimeRecord({ ...timeRecord, punchOut: now });
    }
    // reset();
    return undefined;
  };

  const { punchIn, punchOut } = timeRecord;

  const [loggedInTime, setLoggedInTime] = useState<number | undefined>(
    undefined
  );

  const [punchText, setPunchText] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (loggedInTime) {
      setPunchText(`Punched in for ${loggedInTime} seconds`)
    } else if (punchIn) {
      setPunchText(`Punched In. Press Punch again to punch out`);
    } else if (!punchIn && !punchOut) {
      setPunchText(`Please punch in and out to log your time`);
    }

  }, [punchIn, punchOut, loggedInTime]);

  const {
    // reset,
    handleSubmit,
  } = methods;

  useEffect(() => {
    setLoggedInTime(
      punchIn && punchOut
        ? (punchOut.getTime() - punchIn.getTime()) / 1000
        : undefined
    );
  }, [timeRecord]);

  const onSubmitHandler: SubmitHandler<TaskSchema> = (values) => {
    handlePunch(values);
  };

  return (
    <>
      <Sidebar />
      <SplitContainer>
        <LeftSection>
          <div>
            {punchText}
          </div>
        </LeftSection>
        <RightSection>
          <section className="bg-ct-black-600 min-h-screen grid place-items-center">
            <div className="w-full">
              <h1 className="text-4xl xl:text-6xl text-center font-[600] text-ct-black-600 mb-4">
                Tasks
              </h1>
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmitHandler)}
                  className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 squared-2xl p-8 space-y-5"
                >
                  <div className="my-3">
                    <label
                      htmlFor="Categories"
                      className="block text-gray-600 mb-1 font-medium"
                    >
                      Categories{" "}
                    </label>

                    <select
                      {...methods.register("categories")}
                      className="block w-full py-2 px-4 rounded-md bg-gray-100 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="fitness">Fitness</option>
                      <option value="study">Study</option>
                      <option value="work">Work</option>
                      <option value="sleep">Sleep</option>
                      <option value="travel">Travel</option>
                      <option value="Leisure">Leisure</option>
                      <option value="entertainment">Entertainment</option>
                    </select>
                  </div>
                  <FormInput
                    labelText="Task Name"
                    inputName="taskName"
                    inputType="text"
                  />
                  <FormInput
                    labelText="Description"
                    inputName="description"
                    inputType="text"
                  />

                  <Button
                    //loading={appStore.isLoading}
                    text="Punch"
                    color="ct-black-600"
                  ></Button>
                </form>
              </FormProvider>
            </div>
          </section>
        </RightSection>
      </SplitContainer>
    </>
  );
};

export default TasksPage;
