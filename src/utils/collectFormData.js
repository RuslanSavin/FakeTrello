const collectFormData = (event) => {
  const formData = new FormData(event.target);

  const data = Object.fromEntries(formData.entries());
  return data;
}

export default collectFormData;