type Form = {
  name: string | undefined;
  email: string | undefined;
};

export const findFormErrors = (form: Form) => {
  if (form) {
    const { name, email } = form;
    const emailPattern = /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/;
    const newErrors = { name: "", email: "" };
    if (!name || name === "") newErrors.name = "Fill in this field.";
    else if (name.length > 30) newErrors.name = "Name is too long.";
    if (!email || email === "") newErrors.email = "Fill in this field.";
    else if (!email.match(emailPattern))
      newErrors.email = "Please provide a valid email address.";
    return newErrors;
  }
};
