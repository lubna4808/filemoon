const toast = new Notyf({
  position: { x: "center", y: "top" },
});

const login = async (e) => {
  try {
    e.preventDefault();
    const form = e.target;
    const elements = form.elements;
    const payload = {
      email: elements.email.value,
      password: elements.password.value,
    };
    const { data } = await axios.post("http://localhost:8080/login", payload);
    toast.success(data.message);
    localStorage.setItem("authToken",data.token)
    setTimeout(() => {
      location.href = "app/dashbord.html";
    }, 2000);
  } catch (err) {
    console.log(err);
    toast.error(err.response ? err.response.data.message : err.message);
  }
};
