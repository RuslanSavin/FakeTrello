const collectFormData = (event) => {
  const formData = new FormData(event.target);

  const json = JSON.stringify(Object.fromEntries(formData.entries()));
  return json;
}

export default collectFormData;