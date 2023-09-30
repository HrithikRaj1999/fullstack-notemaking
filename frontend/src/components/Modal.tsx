import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Card,
} from "@material-tailwind/react";
import axios from "axios";
import { useNotes } from "../context/NoteContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { NoteSubmitType } from "../model/noteModel";
import * as Yup from "yup";
interface ModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Modal({ showModal, setShowModal }: ModalProps) {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
  });
  const { notes, setNotes } = useNotes();
  const initialValue: NoteSubmitType = { title: "", description: "" };

  const handleSave = async (values: NoteSubmitType) => {
    try {
      const { data } = await axios.post(`http://localhost:5000/api/notes/`, {
        title: values.title,
        description: values.description,
      });
      setNotes(data.notes);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Dialog open={showModal} handler={handleSave}>
        <DialogHeader>Create New Note</DialogHeader>
        <DialogBody divider>
          <Card color="transparent" shadow={false}>
            <Formik
              initialValues={initialValue}
              validationSchema={validationSchema}
              enableReinitialize={true}
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              onSubmit={handleSave}
            >
              {(values) => (
                <Form>
                  <div className="mb-4 flex flex-col gap-6">
                    <Field
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                      id="title"
                      name="title"
                      placeholder="Enter title"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-600"
                    />
                    <Field
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      as="textarea"
                      id="description"
                      name="description"
                      placeholder="Enter description"
                    />
                    <ErrorMessage
                      name="description"
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
