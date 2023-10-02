import React from "react";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useUser } from "../context/UserContext";
interface SignInModalProp {
  showSignUpModal: boolean;
  setShowSignUpModal: React.Dispatch<React.SetStateAction<boolean>>;
}
interface SignUpType {
  username: string;
  email: string;
  password: string;
}
export function SignInModal({
  showSignUpModal,
  setShowSignUpModal,
}: SignInModalProp) {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Title is required"),
    email: Yup.string().email().required("Title is required"),
    password: Yup.string().required("Title is required"),
  });
  const { user, setUser } = useUser();
  const initialValue: SignUpType = {
    username: "",
    email: "",
    password: "",
  };

  const handleSave = async (values: SignUpType) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/user/signup`,
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      //console.log({ data });
      setUser({ ...data.newUser });

      setShowSignUpModal(false);
      //console.log("set");
    } catch (error) {
      //console.log(error);
    }
  };

  const handleClose = () => {
    setShowSignUpModal(false);
  };

  return (
    <>
      <Dialog
        open={showSignUpModal}
        handler={handleClose}
        dismiss={{
          enabled: false,
          outsidePress: false,
          bubbles: false,
          outsidePressEvent: undefined,
        }}
      >
        <DialogHeader>Sign Up</DialogHeader>
        <DialogBody divider>
          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            enableReinitialize={true}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSave}
          >
            {({ values, touched }) => (
              <Form>
                <div className="mb-4 flex flex-col gap-6">
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                    id="username"
                    name="username"
                    placeholder="Enter User Name"
                  />

                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-600"
                  />

                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                  />

                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600"
                  />
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                  />

                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <DialogFooter>
                  <Button
                    variant="text"
                    color="red"
                    onClick={handleClose}
                    className="mr-1"
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button variant="gradient" color="green" type="submit">
                    <span>Save</span>
                  </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogBody>
      </Dialog>
    </>
  );
}
