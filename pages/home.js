import {
  Box,
  Button,
  CardContent,
  Typography,
  Card,
  Dialog,
  DialogContent,
  Stack,
  TextField,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { firestore } from "../services/firebase";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);

  const [open, setOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  // Create New User
  function handleCreateUser(event) {
    event.preventDefault(); // prevent reload when submit data.
    const form = event.target;

    firestore
      .collection("users")
      .add({
        firstName: form.firstname.value,
        lastName: form.lastname.value,
        email: form.email.value,
        age: form.age.value,
        eduction: form.education.value,
      })
      // Success
      .then((res) => {
        console.log("Success sending data", res);
        event.target.reset(); // clear form after sending data.
        setOpen(false); //close popup
      })
      // Error
      .catch((err) => {
        console.log("Error sending data:", err);
      });
  }

  // Update Existed User
  async function handleExistedUser(event) {
    event.preventDefault(); // prevent reload when submit data.
    const form = event.target;

    try {
      const res = await firestore
        .collection("users")
        .doc(selectedUser.id)
        .update({
          firstName: form.firstname.value,
          lastName: form.lastname.value,
          email: form.email.value,
          age: form.age.value,
          eduction: form.education.value,
        });
      console.log("Success updating data", res);
      // clear selected user
      setSelectedUser(null);
      event.target.reset(); // clear form after sending data.
      setIsUpdateDialogOpen(false); //close popup
    } catch (err) {
      console.log("Error sending data:", err);
    }
  }

  async function handleDeleteUser(event) {
    event.preventDefault(); // prevent reload when submit data.

    // Get ID of selected card
    const id = selectedUser.id;
    try {
      const result = await firestore.collection("users").doc(id).delete();
      console.log("Success delete data", result);
      setSelectedUser(null)
    } catch (err) {
      console.log("Error sending data:", err);
    }
  }

  React.useEffect(() => {
    firestore.collection("users").onSnapshot((snapshot) => {
      let _users = snapshot.docs.map((item) => {
        return {
          id: item.id,
          ...item.data(),
        };
      });
      setUsers(_users);
      console.log(_users);
    });
  }, []);

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "lightblue",
          width: "100%",
          height: "15vh",
        }}
      ></Box>

      <Button onClick={() => setOpen(true)} variant="contained">
        Create User
      </Button>

      <Button
        variant="contained"
        style={{
          marginLeft: "20px",
          backgroundColor: "orange",
          color: "white",
        }}
        disabled={selectedUser ? false : true}
        onClick={() => setIsUpdateDialogOpen(true)}
      >
        Updated Existed User
      </Button>

      <Button disabled={selectedUser ? true : false} onClick={handleDeleteUser}>
        Delete User
      </Button>

      <Typography>Current User: {users.length}</Typography>

      {/* List of User Card */}

      <Box>
        <Stack spacing={2}>
          {users.map((user, index) => {
            return (
              <Card
                onClick={() => {
                  // Check if no user have been selected
                  if (user.id !== selectedUser?.id) {
                    console.log("selected user", user);
                    setSelectedUser(user);
                  } else {
                    // remove the selected card
                    setSelectedUser(null);
                  }
                }}
                sx={{
                  backgroundColor:
                    selectedUser?.id === user.id ? "yellow" : "white",
                }}
                key={index}
              >
                <CardContent>
                  <Typography>
                    User : {user.firstName}- {user.lastName}{" "}
                  </Typography>
                  <Typography>Email : {user.email} </Typography>
                  <Typography>Age : {user.age}</Typography>
                  <Typography>Educaiton : {user.eduction}</Typography>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      </Box>

      {/* Create User Dialog/Model */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleCreateUser}>
          <DialogContent>
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

              <Button type="submit" fullWidth variant="contained">
                Submit
              </Button>
            </Stack>
          </DialogContent>
        </form>
      </Dialog>

      {/* Update User Dialog/Model */}
      <Dialog
        open={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}
      >
        <form onSubmit={handleExistedUser}>
          <DialogContent>
            <Stack spacing={2}>
              <TextField
                required
                name="firstname"
                placeholder="first name"
                defaultValue={selectedUser?.firstName}
                fullWidth
              />
              <TextField
                required
                name="lastname"
                fullWidth
                defaultValue={selectedUser?.lastName}
                placeholder="last name"
              />
              <TextField
                required
                name="email"
                fullWidth
                type="email"
                defaultValue={selectedUser?.email}
                placeholder="email"
              />
              <TextField
                name="age"
                type="number"
                fullWidth
                placeholder="age"
                defaultValue={selectedUser?.age}
              />
              <TextField
                name="education"
                fullWidth
                placeholder="eduction"
                defaultValue={selectedUser?.eduction}
              />
              <Button type="submit" fullWidth variant="contained">
                Submit
              </Button>
            </Stack>
          </DialogContent>
        </form>
      </Dialog>
    </Box>
  );
}

// 1. Create a delete button
//    1.1 Disable button when card is not selected
// 2. Create a function for handle delete card
