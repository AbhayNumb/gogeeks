import React, { useState } from "react";
import { useWebContext } from "../context/contextprovider";
import Select from "react-select";
import toast from "react-hot-toast";
import { MoonLoader } from "react-spinners";

const UserInfo = () => {
  const options = [
    { value: "user", label: "user" },
    { value: "admin", label: "admin" },
    { value: "manager", label: "manager" },
  ];
  const handleselectedrow = (e, idx) => {
    e.preventDefault();
    if (selecteduseridx !== -1) {
      alert("Please save the changes");
      return;
    }
    setselecteduseridx(idx);
    setselecteduser(users[idx]);
  };
  const saveChangesHandler = async (idx) => {
    const val = await UpdateUser(selecteduser);
    if (val) {
      setUsers((prevUsers) =>
        prevUsers.map((user, index) =>
          index === idx ? { ...user, ...selecteduser } : user
        )
      );
      toast.success("User updated successfully");
    } else {
      toast.error("Some error occured in updating user");
    }

    setselecteduseridx(-1);
    setselecteduser({});
  };
  const removeUserHandler = async (e, idx) => {
    e.preventDefault();
    const resp = await DeleteUser(users[idx]._id);
    if (resp) {
      toast.success("User removed successfully");
      const updatedUsers = users.filter((user, index) => index !== idx);
      setUsers(updatedUsers);
    } else {
      toast.error("Some error occured while removing user");
    }
  };
  const [selecteduser, setselecteduser] = useState({});
  const handleChange = (field, value) => {
    setselecteduser((prevVal) => ({
      ...prevVal,
      [field]: value,
    }));
  };
  const { users, setUsers, UpdateUser, me, DeleteUser } = useWebContext();
  const [selecteduseridx, setselecteduseridx] = useState(-1);
  return (
    <div>
      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            {users === "None" ? (
              <div
                className="flex items-center justify-center"
                style={{ width: "100%", height: "100vh" }}
              >
                <div>
                  <MoonLoader color="#1A56DB" />
                </div>
              </div>
            ) : (
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Age
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Occupation
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Address
                    </th>
                    <th scope="col" class="px-6 py-3">
                      State
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Country
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Role
                    </th>
                    {me.role === "admin" ? (
                      <th scope="col" class="px-6 py-3">
                        Action
                      </th>
                    ) : (
                      ""
                    )}
                  </tr>
                </thead>
                <tbody>
                  {users.map((item, idx) => (
                    <tr
                      key={idx}
                      className={`${
                        selecteduseridx === idx
                          ? "bg-gray-200 dark:bg-gray-700" // Apply gray background when selecteduser matches the current index
                          : "bg-white dark:bg-gray-800"
                      } border-b dark:border-gray-700 ${
                        selecteduseridx === idx
                          ? ""
                          : "hover:bg-gray-50 dark:hover:bg-gray-600"
                      }`}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {selecteduseridx === idx ? (
                          <div class="relative z-0 w-full mb-5 group">
                            <input
                              value={selecteduser.name}
                              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              onChange={(e) =>
                                handleChange("name", e.target.value)
                              }
                            />
                          </div>
                        ) : (
                          `${item.name}`
                        )}
                      </th>
                      <td className="px-6 py-4">
                        {selecteduseridx === idx ? (
                          <div class="relative z-0 w-full mb-5 group">
                            <input
                              value={selecteduser.email}
                              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              onChange={(e) =>
                                handleChange("email", e.target.value)
                              }
                            />
                          </div>
                        ) : (
                          `${item.email}`
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {selecteduseridx === idx ? (
                          <div class="relative z-0 w-full mb-5 group">
                            <input
                              value={selecteduser.age}
                              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              onChange={(e) =>
                                handleChange("age", e.target.value)
                              }
                            />
                          </div>
                        ) : (
                          `${item.age}`
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {selecteduseridx === idx ? (
                          <div class="relative z-0 w-full mb-5 group">
                            <input
                              value={selecteduser.occupation}
                              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              onChange={(e) =>
                                handleChange("occupation", e.target.value)
                              }
                            />
                          </div>
                        ) : (
                          `${item.occupation}`
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {selecteduseridx === idx ? (
                          <div class="relative z-0 w-full mb-5 group">
                            <input
                              value={selecteduser.address}
                              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              onChange={(e) =>
                                handleChange("address", e.target.value)
                              }
                            />
                          </div>
                        ) : (
                          `${item.address}`
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {selecteduseridx === idx ? (
                          <div class="relative z-0 w-full mb-5 group">
                            <input
                              value={selecteduser.state}
                              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              onChange={(e) =>
                                handleChange("state", e.target.value)
                              }
                            />
                          </div>
                        ) : (
                          `${item.state}`
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {selecteduseridx === idx ? (
                          <div class="relative z-0 w-full mb-5 group">
                            <input
                              value={selecteduser.country}
                              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                              onChange={(e) =>
                                handleChange("country", e.target.value)
                              }
                            />
                          </div>
                        ) : (
                          `${item.country}`
                        )}
                      </td>
                      <td style={{ width: "100px" }}>
                        {selecteduseridx === idx ? (
                          <Select
                            options={options}
                            onChange={(selectedOption) =>
                              handleChange("role", selectedOption.value)
                            }
                          />
                        ) : (
                          // </div>
                          `${item.role}`
                        )}
                      </td>
                      {me.role === "admin" ? (
                        me._id === item._id ? (
                          <div
                            style={{
                              display: "flex",
                              height: "5rem",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            Can't Edit Yourself
                          </div>
                        ) : (
                          <td className="flex items-center px-6 py-4">
                            {selecteduseridx === idx ? (
                              <a
                                href="#"
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                onClick={() => saveChangesHandler(idx)}
                              >
                                Save
                              </a>
                            ) : (
                              <a
                                href="#"
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                onClick={(e) => handleselectedrow(e, idx)}
                              >
                                Edit
                              </a>
                            )}

                            <a
                              href="#"
                              className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                              onClick={(e) => removeUserHandler(e, idx)}
                            >
                              Remove
                            </a>
                          </td>
                        )
                      ) : (
                        ""
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
