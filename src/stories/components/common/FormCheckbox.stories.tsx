// stories/components/common/FormCheckbox.stories.tsx
import FormCheckbox from "@/components/common/FormCheckbox";
import { Form, Formik } from "formik";
import type { Meta, StoryObj } from "@storybook/react";
import type { FormCheckboxProps } from "@/components/common/FormCheckbox";

const meta: Meta<typeof FormCheckbox> = {
  title: "components/common/FormCheckbox",
  component: FormCheckbox,
  decorators: (Story, { args }) => {
    const initialValues: { remember?: boolean } = {};
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

type Story = StoryObj<typeof FormCheckbox>;

const defaultArgs: FormCheckboxProps = {
  name: "remember",
  label: "Remember me",
  color: "primary",
};

export const Default: Story = {
  args: { ...defaultArgs },
};
