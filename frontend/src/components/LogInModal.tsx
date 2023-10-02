import React from "react";

import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useUser } from "../context/UserContext";
interface LoginSubmitType {
  email: string;
  password: string;
}
interface LoginModalProp {
  showLogInModal: boolean;
  setShowLogInModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function LoginModal({
  showLogInModal,
  setShowLogInModal,
}: LoginModalProp) {
  const { user, setUser } = useUser();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const initialValue: LoginSubmitType = { email: "", password: "" };

  const handleSave = async (values: LoginSubmitType) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/user/login`,
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      setUser({ ...data.user });
      setShowLogInModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setShowLogInModal(false);
  };

  return (
    <>
      <Dialog open={showLogInModal} handler={handleSave}>
        <DialogHeader>Sign Up</DialogHeader>
        <DialogBody divider>
          <Card color="transparent" shadow={false}>
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
          </Card>
        </DialogBody>
      </Dialog>
    </>
  );
}
