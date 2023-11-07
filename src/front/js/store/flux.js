const getState = ({ getStore, getActions, setStore }) => {
  let backend = process.env.BACKEND_URL;
  return {
    store: {
      message: null,
      accessToken: null,
      user: {},
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      allbooks: [],
      ascendingbooks: [],
      descendingbooks: [],
      singlebook: [],
      years: [],
      users: [],
      singleUser: [],
      reverseallbook: [],
      activeuser: undefined,
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      logout: () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        setStore({ accessToken: null });
        setStore({ user: null });
      },
      handleLogout: () => {
        const { logout } = getActions();
        const confirmLogout = window.confirm("Are you sure?");
        if (confirmLogout) {
          logout();
          window.location.reload();
        }
      },

      updateStoreFromStorage: () => {
        let accessToken = sessionStorage.getItem("token");
        let userString= sessionStorage.getItem("user");
        let userObject= JSON.parse(userString);
        if (accessToken && accessToken != "" && accessToken != "undefined") {
          setStore({ accessToken: accessToken });
          setStore({ user: userObject });
        }
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      signup: (email, password, age, location, first_name, last_name) => {
        return fetch(backend + "api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name,
            age: age,
            location: location,
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            setStore({
              user: data.user,
              accessToken: data.token,
              activeuser: data.user.id,
            });
            const userToString = JSON.stringify(data.user);
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("user", userToString);
          });
      },

      login: (email, password) => {
        const store = getStore();
        return fetch(backend + "api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            setStore({
              user: data.user,
              accessToken: data.token,
              activeuser: data.user.id,
            });
            const userToString = JSON.stringify(data.user);
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("user", userToString);
          });
      },

      resetPassword:(token, newPassword) => {
      const store = getStore();
      return fetch(backend + "api/reset-password", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({token: token, new_password: newPassword}),
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro ao resetar a senha.');
        }
      })
      .catch(error => {
        // Lógica para tratar erros
        console.error(error);
        throw error;
      });
    },

      // add book
      addbook: (name, author, category, quantity, image, year, user_id) => {
        const store = getStore();
        return fetch(backend + "api/addbook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            author: author,
            category: category,
            quantity: quantity,
            image: image,
            year: year,
            user_id: user_id,
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            allbooks.push(data.book);
            setStore({
              allbooks: addonebook,
            });
          });
      },

      //for all books
      allbooksdata: () => {
        fetch(backend + "api/allbooks")
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((data) => {
            const asc = [...data];
            const desc = [...data];
            const years = [...data];
            const reverse = [...data];
            setStore({
              allbooks: data,
              ascendingbooks: asc,
              descendingbooks: desc,
              years: years,
              reverseallbook: reverse,
            });
          });
      },

      loadAllUserInformation: () => {
        fetch(backend + "api/allusers")
          .then((resp) => {
            if (resp.ok) {
              return resp.json();
            }
          })
          .then((data) => {
            setStore({
              users: [...data],
            });
          });
      },

      //for single book
      singlebook: (j) => {
        const store = getStore();
        fetch(`${backend}api/book/${j}`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((data) => {
            setStore({ singlebook: data });
          });
      },
      singleUser: (j) => {
        fetch(`${backend}api/user/${j}`)
          .then((resp) => {
            if (resp.ok) {
              return resp.json();
            }
          })
          .then((data) => {
            setStore({ singleUser: data });
          });
      },

      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
