// stories/components/common/FormTextField.stories.tsx
import FormTextField from "@/components/common/FormTextField";
import { Form, Formik } from "formik";
import type { Meta, StoryObj } from "@storybook/react";
import type { FormTextFieldProps } from "@/components/common/FormTextField";

const meta: Meta<typeof FormTextField> = {
  title: "components/common/FormTextField",
  component: FormTextField,
  decorators: (Story, { args }) => {
    const initialValues: { username: string } = { username: "" };
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <Story {...args} />
        </Form>
      </Formik>
    );
  },
};

export default meta;

type Story = StoryObj<typeof FormTextField>;

const defaultArgs: FormTextFieldProps = {
  id: "username",
  name: "username",
  type: "text",
  required: true,
  label: "Username",
  placeholder: "ex) john.doe",
  variant: "outlined",
  margin: "normal",
  fullWidth: true,
  autoFocus: true,
};

export const Default: Story = {
  args: { ...defaultArgs },
};
