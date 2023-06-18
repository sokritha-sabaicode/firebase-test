import { firestore } from "../services/firebase";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

export default function Home() {
  function handleCreateUser(event) {
    event.preventDefault(); // prevent reload when submit data.
    const { firstname, lastname, email, age, education } =
      event.target.elements;

    firestore
      .collection("users")
      .add({
        firstName: firstname.value,
        lastName: lastname.value,
        email: email.value,
        age: age.value,
        eduction: education.value,
      })
      // Success
      .then((res) => {
        console.log("res", res);
        console.log("Success sending data", res);
      })
      // Error
      .catch((err) => {
        console.log("Error sending data:", err);
      });
  }
  return (
    <div>
      <Typography>Create User to Firestore</Typography>
      <Box width={450}>
        <form onSubmit={handleCreateUser}>
          <Stack spacing={2}>
            <TextField
              required
              name="firstname"
              placeholder="first name"
              fullWidth
            />
            <TextField
              required
              name="lastname"
              fullWidth
              placeholder="last name"
            />
            <TextField
              required
              name="email"
              fullWidth
              type="email"
              placeholder="email"
            />
            <TextField name="age" type="number" fullWidth placeholder="age" />
            <TextField name="education" fullWidth placeholder="eduction" />
            <Button type="submit" variant="outlined" fullWidth>
              {" "}
              Create User
            </Button>
          </Stack>
        </form>
      </Box>
    </div>
  );
}

/**
 *
 * Database ???
 * NoSQL : No +SQL
 *
 * SQL : Structure Query Language
 *
 * BOOK
 * {
 *  ID:1,
 *  name:"Math 01",
 *  createdAt: "01/02/2023"
 * }
 */

/**
 * Collection is array of document(object).
 *
 * Document : is Object.
 */

/**
 *
 * Document
 *
 * Computer
 * {
 *  id:1,
 *  model: "dell",
 *  price: 500
 * }
 */

[
  {
    id: 1,
    model: "dell",
    price: 700,
  },
  {
    id: 2,
    model: "mac",
    price: 1500,
  },
];
