import React, { useEffect, useState } from "react";
import { Container } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Admin = () => {
  const user = useSelector((state) => state.userData);
  return user ? (
    <div className="w-full my-3 p-2 flex items-center justify-center">
      <Container className="sm:w-[80vw] w-[90vw] overflow-hidden ">
        <div className="w-full flex justify-center mb-4 relative rounded-md p-4 ">
          <img
            src="/user.jpg"
            alt="user image"
            className="rounded-t-xl w-full h-full object-cover"
            title={`demo image for you ${user.name}😅`}
          />
        </div>
        <div className="w-full mb-6 py-2 px-4 rounded-xl bg-white/10 flex-col items-center sm:justify-between justify-center sm:flex flex-wrap gap-2">
          <h1 className="text-2xl text-center font-serif w-auto">Hey, {user.name}</h1>

          <Link
            className="text-center inline-block w-full sm:w-auto text-base font-medium text-gray-900 hover:text-gray-700"
            to="mailto:kkharoliya20@gmail.com"
            title="click me to mail"
          >
            Gmail <i className="ri-mail-send-line"></i> : {user.email}
          </Link>

        </div>
      </Container>
    </div>
  ): null
};

export default Admin;
